import * as List from './list'
import _ from 'lodash'

// SendGrid API request assembler
const request = (recipient, contents, sg) => {
	return sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: {
	    personalizations: [
	      {
	        to: [
	          {
	            email: recipient
	          }
	        ],
	        subject: 'Your Invoice'
	      }
	    ],
	    from: {
	      email: 'test@example.com'
	    },
	    content: [
	      {
	        type: 'text/plain',
	        value: contents
	      }
	    ]
	  }
	});

}

export async function sendEmail(recipient, emailBody) {
	let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	let emailRequest = request(recipient, emailBody, sg)
	try {
		let response = await sg.API(emailRequest)
		return response
	} catch (e) {
		throw e
	}
}

export async function sendInvoice (list, schema, emailBody, recipient) {
	let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

	let requestArray = list.map(customer => {
		let contents = emailBody.concat(List.toTextBulletList(customer, schema))
		return request(recipient, contents, sg)
	})

	let promiseArray = Promise.all(requestArray.map(request => sg.API(request)))

	try {
		let sgResponseObjectArray = await promiseArray
		let sgResponseStatusCodeArray = sgResponseObjectArray.map(res => res.statusCode)
		let uniqueResponses = _.uniq(sgResponseStatusCodeArray)
		let responseCount = sgResponseObjectArray.length
		console.log(`Sent ${responseCount} emails with status: ${uniqueResponses}`);
		return 200

	} catch (e) {
		let err = e.response.body.errors
		throw err
	}
}
