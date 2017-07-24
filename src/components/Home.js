import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react'

export default class Home extends React.Component {

	render () {
		return (
			<Grid>
				<Grid.Column width={4}>
				</Grid.Column>
				<Grid.Column width={12}>
					<Header as='h2'>
						<Header.Content>
							Welcome to Invoicer. Right now, the Invoicer can:
						</Header.Content>
					</Header>
					<Segment>
						<h3>Upload a List</h3>
						<hr/>
						<ul>
							<li>You can upload a CSV by clicking "Invoices" above and creating a new list.</li>
							<li>After uploading, you map your CSV columns to the required fields and Invoicer restructures the CSV with those fields.</li>
							<li>During this restructing, Invoicer removes all rows where there is no email address. They are deleted permanently.</li>
							<li>At the moment, Invoice does not deduplicate the data, so you need to be careful that the CSVs you upload do not contain duplicate rows, in order to avoid your customers receiving two of the same email.</li>
						</ul>
						<h3>Keep a List Stored</h3>
						<hr/>
						<ul>
							<li>Once a list is uploaded, I keep it in a database so that you can use it again in the future.</li>
							<li>You can see all your lists in a table by clicking "Lists" up on top. This table also allows you to delete lists.</li>
						</ul>
						<h3>Send an Invoice by Email ... almost.</h3>
						<hr/>
						<ul>
							<li>Invoicer is full functional, but sending an invoice will only take you to the point of sending a test email. I want you to try this first before we open up the ability to send a lot of emails.</li>
							<li>Once we <em>do</em> open up that functinality, you will be able to send up as many emails as you want.</li>
							<li>Invoicer uses SendGrid in order to send emails. The free tier allows for 100 emails/day. If you want more, you need to pay. It is not as expensive as MailChimp, and once you pay you will only be limited by how many emails you send.</li>
							<li>This system can handle ALOT of email addresses, and since you can upload and delete lists on the fly, you will never hit a limit on how many names and invoices we can store.</li>
						</ul>
					</Segment>
				</Grid.Column>
			</Grid>
		)
	}
}
