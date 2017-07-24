import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Dropdown, Menu, Button, Icon } from 'semantic-ui-react'

const NavBar = (props) => {
	return (
		<Menu size='large' pointing>
			<Menu.Item header as={Link} to='/home'>
				<img src='http://www.free-icons-download.net/images/basketball-icon-32456.png' />
				INVOICER
			</Menu.Item>
			<Menu.Item name='Home' as={Link} to='/home'>Home</Menu.Item>
			<Menu.Item name='Lists' as={Link} to='/lists' active={false}/>
			<Menu.Item name='Invoices' as={Link} to='/invoices' active={false}/>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Icon name='user outline' />
					<Dropdown text={props.user.username} >
						<Dropdown.Menu >
							<Dropdown.Item text='Settings' disabled/>
							<Dropdown.Divider />
							<Dropdown.Item text='Logout' onClick={props.logoutFunc} />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	)
}

export default NavBar
