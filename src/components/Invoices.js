import React from 'react'
import ReactDOM from 'react-dom'
import ListActions from '../actions/ListActions'
import NewInvoice from './NewInvoice'
import { Link, Route, Switch } from 'react-router-dom'
import { Button } from 'semantic-ui-react'


export default class Invoices extends React.Component {
	constructor() {
		super()
		this.clearListStore = this.clearListStore.bind(this)
	}

	clearListStore() {
		console.log('clearing ListStore');
		ListActions.clearListStore()
	}

	render () {
		return (
			<div>
				{ location.pathname === '/invoices' &&
					<Link to='/invoices/new'>
						<Button color='green' onClick={this.clearListStore}>
							+ New Invoice Group
						</Button>
					</Link> }
					<Switch>
						<Route path="/invoices/new" component={NewInvoice} />
					</Switch>
			</div>
		)
	}
}
