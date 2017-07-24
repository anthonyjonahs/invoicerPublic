import React from 'react'
import moment from 'moment'
import { Link, Route, Switch } from 'react-router-dom'
import { Dropdown, Menu, Button, Icon } from 'semantic-ui-react'

const ListSelector = (props) => {
	let selections = props.lists.map((list, index) => {
		return	{	text: list.name,
							key: index,
							description: moment(list.createdAt).format('DD MMM'),
							value: list._id,
						}
	})
	return (
		<Dropdown fluid selection placeholder='Select a list.' options={selections} onChange={props.listSelector}/>
	)
}

export default ListSelector
