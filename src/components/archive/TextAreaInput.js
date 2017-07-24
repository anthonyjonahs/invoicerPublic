import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const EmailBodyInput = (props) => (
	<div>
		<Form onSubmit={e => e.preventDefault()}>
			<Form.TextArea
				onChange={props.changeHandler}
				value={props.value}
				placeholder='Try adding multiple lines'
				autoHeight
			/>
			<Form.Button onClick={props.handleSubmit}>Submit</Form.Button>
		</Form>
	</div>
)

export default EmailBodyInput;
