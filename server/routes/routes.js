import * as parser from '../../my_modules/parser.js'
import * as emailer from '../../my_modules/emailer.js'
import * as list from '../../my_modules/list.js'
import multer from 'multer'
import fs from 'fs'
import _ from 'lodash'
const express = require('express')
const path = require('path');
const router = express.Router()
const upload = multer({ dest: path.resolve(__dirname, '../uploads') })
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const List = require('../models/list')
const pdf = require('html-pdf')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
	res.redirect('/login')
})

router.get('/invoice', (req, res) => {
	let html = fs.readFileSync(path.resolve(__dirname, '../../src/views/invoice.html'), 'utf8')
	let options = {
		format: 'Letter',
		orientation: 'portrait'
	}
	pdf.create(html, options).toFile('./invoice.pdf', function(err, res) {
	  if (err) return console.log(err);
	  console.log(res); // { filename: '/app/businesscard.pdf' }
	});

	res.render('invoice')

})

router.get('/print-pdf', (req, res) => {
	console.log('prind-pdf is called');
	// pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
	//   if (err) return console.log(err);
	//   console.log(res); // { filename: '/app/businesscard.pdf' }
	// });
})

router.post('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return res.status(500).send(err)
		req.logOut()
		res.redirect('/login')
	})
})

router.route('/login')
	.get((req, res) => {
		if(req.user) return res.redirect('/home')
		res.render('login')
	})
	.post((req, res, next) => {
		passport.authenticate('local', {
			successRedirect: '/home',
			failureRedirect: '/login',
			failureFlash: true
		})(req, res, next)
	})

router.route('/register')
	.get((req, res) => res.render('register'))
	.post(async (req, res) => {
		let username = req.body.username
		let password = req.body.password
		let confirmPassword = req.body.confirmPassword

		if(!username) {
			req.flash('error', 'Username required')
			res.redirect('/register')
			return
		}

		if(password !== confirmPassword) {
			req.flash('error', 'Passwords do not match')
			res.redirect('/register')
			return
		}

		try {
			let salt = await bcrypt.genSalt(10)
			let hash = await bcrypt.hash(password, salt)
			let newUser = new User({ username, password: hash })
			newUser.save()
			req.flash('success', 'You are registered and may now login.')
			res.redirect('/login')
		} catch (e) {
			console.error(e)
			req.flash('error', 'Server error. Please come back later.')
			res.redirect('/register')
		}

	})

router.get('/home', isUserLoggedIn, (req, res) => {
	console.log('Serving the page.');
	console.log(req.user.id);
	res.render('home')
})


router.post('/api/list', isUserLoggedIn, upload.single('listCsv'), async (req, res) => {
	let userId = req.user.id
	let csvPath = req.file.path
	let listName = req.body.listName

	try {
		let listId = await list.uploadCsvList(csvPath, listName, userId)
		res.status(200).json(listId)
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

router.get('/api/list', isUserLoggedIn, async (req, res) => {
	let query = List.aggregate([
								{ $match: {
										// rawUpload: false,
										userId: mongoose.Types.ObjectId(req.user.id)
									}
								},
								{ $project: {
										name: 1,
										userId: 1,
										createdAt: 1,
										updatedAt: 1,
										invoiceCount: { $size:'$invoices'}
									}
								}
							])
	try {
		let list = await query
		res.status(200).json(list)

	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})
router.delete('/api/list', isUserLoggedIn, async (req, res) => {
	console.log('Request received with body ', req.body);
	let listId = req.body.listId
	console.log(listId);
	let query = List.find()
							.where('_id').equals(listId)
							.where('userId').equals(req.user.id)
							.remove()
	try {
		let response = await query
		res.sendStatus(200)
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

router.get('/api/list/:id', isUserLoggedIn, async (req, res) => {
	let query = List.find()
							.where('_id').equals(req.params.id)
							.where('userId').equals(req.user.id)
							.where('invoices').slice(10)
	try {
		let list = await query
		if(!list.length) return res.sendStatus(404)
		res.status(200).send(list[0])

	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

router.put('/api/list/:id', isUserLoggedIn, async (req, res) => {
	//Transforms list from raw to final
	let listId = req.params.id
	let fieldColumnMap = req.body
	let hasEmail = x => x.email.indexOf('@')==-1 ? false : true
	let removeNoEmail = x => x.filter(hasEmail)

	try {
		let listObject = await List.findById(listId)
		//TO DO: check if list is raw.
		let rawInvoices = listObject.invoices
		let invoices = 	await list.transform(rawInvoices, fieldColumnMap)
										.then(removeNoEmail)
		let updateResponse = 	await List
										.where({_id: listId})
										.update({ invoices, rawUpload: false })

		if(updateResponse.nModified == 1) res.sendStatus(200)
		if(updateResponse.nModified == 0) res.sendStatus(404)
	} catch (e) {
		console.error(e)
		res.sendStatus(500)
	}
})

router.post('/api/email/test', isUserLoggedIn, async (req, res) => {
	let firstListItem = [req.body.list[0]]
	let schema = req.body.schema
	let emailBody = req.body.emailBody
	let recipient = req.body.recipient
	let emailTestPromise = emailer.sendInvoice(firstListItem, schema, emailBody, recipient)

	try {
		let response = await emailTestPromise
		res.sendStatus(response)

	} catch(e) {
		res.sendStatus(e)
	}
})

router.post('/api/email', isUserLoggedIn, async (req, res) => {
	let emailBody = req.body.emailBody
	let recipient = req.body.recipient

	try {
		let response = await emailer.sendEmail(recipient, emailBody)
		res.sendStatus(response.statusCode)

	} catch(e) {
		res.sendStatus(e.response.statusCode)
	}
})

router.get('/api/user', isUserLoggedIn, async (req, res) => {
	let user = req.user
	res.status(200).json(user)
})

// Auth middleware
function isUserLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	// if user not authenticated:
	req.flash('error', 'You must login.')
	res.redirect("/login");
}

module.exports = router
