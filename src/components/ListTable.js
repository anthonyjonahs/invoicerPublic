import React from 'react'
import moment from 'moment'
import ListActionDropdown from './ListActionDropdown'
import { Button, Table } from 'semantic-ui-react'

const ListTable = (props) => {
	let tableRows = props.lists.map((list, index) => {
		return(
			<Table.Row key={index}>
				<Table.Cell collapsing>{index+1}</Table.Cell>
				<Table.Cell collapsing>{list.name}</Table.Cell>
				<Table.Cell>{moment(list.createdAt).format('MMM D, YYYY (HH:mm)')}</Table.Cell>
				<Table.Cell>{list.invoiceCount}</Table.Cell>
				<Table.Cell collapsing>
					<ListActionDropdown
						value={list._id}
						sendInvoice={props.sendInvoice}
						deleteList={props.deleteList}/>
				</Table.Cell>
			</Table.Row>
		)
	})

	return (
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>{``}</Table.HeaderCell>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Created</Table.HeaderCell>
					<Table.HeaderCell># of Invoices</Table.HeaderCell>
					<Table.HeaderCell>Action</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{tableRows}
			</Table.Body>
		</Table>
	)
}


export default ListTable;
