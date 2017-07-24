import React from 'react'
import { Message } from 'semantic-ui-react'

const SuccessMessage = (props) => (
	<Message
		success
		floating
		content={props.message}
		hidden={!props.visible} />
)


export default SuccessMessage;
