import _ from 'lodash'
import * as Parser from './parser'
import List from '../server/models/list'

export function toJson (listItem, schema) {
	let object = new Object();

	schema.map(fieldColumnPair => {
		object[fieldColumnPair.field] = listItem[fieldColumnPair.column]
	})

	return object;
}

export function toTextBulletList (listItem, schema) {
	let bulletList = '';

	schema.map(fieldColumnPair => {
		let bullet = `\t- ${fieldColumnPair.field}: ${listItem[fieldColumnPair.column]}\n`
		bulletList= bulletList.concat(bullet)
	})

	return bulletList;
}

export function toTextBulletListPrime (listItem, columnFieldMap) {
	let bulletList = '';

	_.mapKeys(columnFieldMap, (column, field) => {
		let bullet = `\t- ${_.startCase(field)}: ${listItem[column]}\n`
		bulletList= bulletList.concat(bullet)
	})
	console.log(bulletList);
	return bulletList;
}

export async function uploadCsvList(csvPath, name, userId) {
	// accepts a csv, converts it to json and creates a preliminary list document in MongoDB.
	try {
		let invoices = await Parser.csvToJson(csvPath)
		let doc = await List.create({ userId, name, invoices })
		return doc._id;
	} catch (e) {
		throw e
	}
}

// Converts raw invoice list into final form.
export async function transform(rawInvoices, columnFieldMap){
	try {
		let invoices = rawInvoices.map(rawInvoice => {
			let invoice = {}
			_.mapKeys(columnFieldMap, (value, key) => {
				invoice[key]=rawInvoice[value]
			})
			return invoice
		})
		return invoices
	} catch (e) {
		console.error(e)
		throw e
	}
}
