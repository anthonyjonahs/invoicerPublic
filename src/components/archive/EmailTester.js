import React from 'react'
import ReactDOM from 'react-dom'
import TextAreaInput from './TextAreaInput'
import EmailBodyActions from '../actions/EmailBodyActions'
import SgActions from '../actions/SendGridActions'
import { Link } from 'react-router-dom'
import { Button, Grid, Form } from 'semantic-ui-react'
import * as List from '../my_modules/list'
import KeyMatcher from './KeyMatcher'


export default class EmailComposer extends React.Component {
	constructor(){
		super()

		this.state = {
			testEmailRecipient: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.changeHandler = this.changeHandler.bind(this)
	}

	handleSubmit() {
		let list = this.props.data.list
		let schema = this.props.data.collection.schema
		let emailBody = this.props.data.emailBody
		let recipient = this.state.testEmailRecipient

		// Validate
		if(!list) 	return alert('Please upload a list.')
		if(!schema) 		return alert('Please select data to send.')
		if(!emailBody) 	return alert('Please compose your email.')

		// Send test email.
		SgActions.sendTestInvoice(list, schema, emailBody, recipient)

	}

	changeHandler(e, { value }) {
		this.setState({ testEmailRecipient: value })
	}

	render () {
		console.log('from emailTester: ', this.props.data.emailBody);
		let collection = this.props.data.collection
		let customer = this.props.data.list[0]
		let emailBody = this.props.data.emailBody
		let schema = collection.schema ? collection.schema : null
		let invoice = ''
		if (schema) invoice = List.toTextBulletList(customer, schema);

		return (
			<Grid columns={1}>
				<Grid.Row>
					<Grid.Column>
						<pre style={{whiteSpace:'pre-wrap'}}>
							{emailBody.concat(invoice)}
						</pre>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Form onSubmit={e => e.preventDefault()}>
							<Form.Group>
								<Form.Input type='email' onChange={this.changeHandler} placeholder='Send test email to ...' />
								<Form.Button type='submit' onClick={this.handleSubmit} content='Send' />
							</Form.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}
