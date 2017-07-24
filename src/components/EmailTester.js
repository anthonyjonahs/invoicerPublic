import React from 'react'
// import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react'

const EmailTester = (props) => {
	return (
		<Input placeholder='Email' onChange={props.changeHandler} action>
      <input />
			<Button onClick={props.sendFunction} loading={props.sending}>Send Test</Button>
    </Input>
	)
}

export default EmailTester
