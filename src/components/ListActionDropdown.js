import React from 'react'
import moment from 'moment'
import { Button, Dropdown } from 'semantic-ui-react'

const ListActionDropdown = (props) => {

	return (
		<Dropdown text='Actions'>
			<Dropdown.Menu>
				<Dropdown.Item disabled value={props.value} onClick={props.sendInvoice} text='Send Invoice' icon='send' />
				<Dropdown.Item disabled value={props.value} onClick={props.updateInvoice} text='Update' icon='edit' />
				<Dropdown.Item value={props.value} onClick={props.deleteList} text='Delete' icon='dont' />
			</Dropdown.Menu>
		</Dropdown>
	)
}


export default ListActionDropdown;
