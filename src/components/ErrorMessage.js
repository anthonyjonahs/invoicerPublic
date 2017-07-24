import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = (props) => (
	<Message
		error
		floating
		content={props.message}
		hidden={!props.visible} />
)


export default ErrorMessage;
