import React from 'react'
import ReactDOM from 'react-dom'
import TextAreaInput from './TextAreaInput'
import EmailBodyActions from '../actions/EmailBodyActions'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'

import KeyMatcher from './KeyMatcher'


export default class EmailComposer extends React.Component {
	constructor(){
		super()

		this.state = {
			draftEmailBody: '',
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.changeHandler = this.changeHandler.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault()
		EmailBodyActions.updateEmailBody(this.state.draftEmailBody)

	}

	changeHandler(e, { value }) {
		this.setState({ draftEmailBody: value})
	}

	render () {
		return (
			<Grid columns={2} divided>
				<Grid.Row>
					<Grid.Column>
						<TextAreaInput
							handleSubmit={this.handleSubmit}
							changeHandler={this.changeHandler}
							value={this.state.draftEmailBody}
						/>
					</Grid.Column>
					<Grid.Column>
						<pre style={{whiteSpace: 'pre-wrap'}}>{`${this.props.emailBody}`}</pre>
					</Grid.Column>
				</Grid.Row>

			</Grid>
		)
	}
}
