import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import ListStore from '../stores/ListStore'
import ListActions from '../actions/ListActions'
import ListTable from './ListTable'
import { Link, Redirect } from 'react-router-dom'
import { Button, Message, Table } from 'semantic-ui-react'


export default class Lists extends React.Component {
	constructor() {
		super()

		this.state = {
			lists: ListStore.getLists(),
			redirect: false
		}

		this.sendInvoice = this.sendInvoice.bind(this)
		this.deleteList = this.deleteList.bind(this)
		this.setStateRedirect = this.setStateRedirect.bind(this)
		this.updateStateLists = this.updateStateLists.bind(this)
	}

	componentWillMount() {
		ListActions.getAllLists()
		ListStore.on('updated lists', this.updateStateLists)
		ListStore.on('change', this.setStateRedirect)
	}

	componentWillUnmount() {
		ListStore.removeListener('updated lists', this.updateStateLists)
		ListStore.removeListener('change', this.setStateRedirect)
	}

	setStateRedirect(){
		this.setState({redirect: true});
	}

	updateStateLists() {
		this.setState({ lists: ListStore.getLists() })
	}

	sendInvoice(e, { value }) {
		console.log('Sending invoice to ', value);
		// let listId = e.target.value
		// ListActions.getList(listId)
	}

	deleteList(e, { value }) {
		let deletePermission = window.confirm('Are you sure you want to delete this list?')
		let listId = value

		if(deletePermission) ListActions.deleteList(listId)
	}

	sortByCreatedAt(lists, order) {
		return _.orderBy(lists, ['createdAt'], [order])
	}

	render () {
		if (this.state.redirect) return <Redirect push to="/invoices/new" />

		return (
			<div>
				{	this.state.lists &&
					<ListTable
						lists={this.sortByCreatedAt(this.state.lists, 'desc')}
						sendInvoice={this.sendInvoice}
						deleteList={this.deleteList} />
				}
			</div>
		)
	}
}
