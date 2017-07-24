import React from 'react'
import { Form } from 'semantic-ui-react'


const Uploader = (props) => (
	<Form>
			<Form.Input type='file' accept='.csv' onChange={props.changeHandler} />
	</Form>
)

export default Uploader;
