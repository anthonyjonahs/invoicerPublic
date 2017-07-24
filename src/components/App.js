import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Lists from './Lists.js'
import Home from './Home.js'
import Invoices from './Invoices.js'
import NewInvoice from './NewInvoice.js'
import NavBar from './NavBar.js'
import SuccessMessage from './SuccessMessage.js'
import ErrorMessage from './ErrorMessage.js'
import { Dropdown, Menu, Button, Icon } from 'semantic-ui-react'
import UserStore from '../stores/UserStore'
import StatusStore from '../stores/StatusStore'
import UserActions from '../actions/UserActions'



export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
				user: UserStore.getState(),
				status: StatusStore.getState()
		}
		this.logout = this.logout.bind(this)
	}

	componentWillMount() {
		UserStore.on('change', () => {
			this.setState({ user: UserStore.getState() })
		})
		StatusStore.on('change', () => {
			this.setState({ status: StatusStore.getState() })
		})
	}

	componentDidMount() {
		UserActions.getUser()
	}

	logout() {
		UserActions.logout()
	}

	render () {
		return (
			<div>
				<NavBar user={this.state.user} logoutFunc={this.logout} />
				<div class="ui container">
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route path="/lists" component={Lists} />
						<Route path="/invoices" component={Invoices} />
						<Route path="/invoices/new" component={NewInvoice} />
					</Switch>
					<SuccessMessage
						message={this.state.status.successMessage}
						visible={this.state.status.successMessage ? true : false} />
					<ErrorMessage
						message={this.state.status.errorMessage}
						visible={this.state.status.errorMessage ? true : false} />
				</div>
			</div>
		)
	}
}
