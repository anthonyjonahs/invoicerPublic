import React from 'react'
import CollectionActions from '../actions/CollectionActions'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

import KeyMatcher from './KeyMatcher'


export default class KeyMatchGroup extends React.Component {
	constructor() {
		super();

		this.state = {
			schema: [],
			keyMatchers: []
		}

		this.changeHandler = this.changeHandler.bind(this);
		this.addKeyMatcher = this.addKeyMatcher.bind(this);
		this.deleteKeyMatcher = this.deleteKeyMatcher.bind(this);
		this.submitCollectionSchema = this.submitCollectionSchema.bind(this);
	}

	changeHandler(e, input) {
		let index = this.state.schema.findIndex(x => x.id == input.id)
		let changedFieldColumnPairs = _.cloneDeep(this.state.schema)
		e.target.tagName == 'INPUT'
			? changedFieldColumnPairs[index].field = input.value
			: changedFieldColumnPairs[index].column = input.value
		this.setState({
			schema: changedFieldColumnPairs
		})
	}

	deleteKeyMatcher(e, target) {
		let toKeep = x => x.id != target.id
		this.setState({
			keyMatchers: this.state.keyMatchers.filter(toKeep),
			schema: this.state.schema.filter(toKeep)
		})
	}

	addKeyMatcher() {
		let timestamp = new Date().getTime()
		this.setState({
			keyMatchers: this.state.keyMatchers.concat(
				{
					id: timestamp,
					component:<KeyMatcher key={timestamp} id={timestamp} changeHandler={this.changeHandler} delete={this.deleteKeyMatcher} columns={this.props.columns}/>
				}
			),
			schema: this.state.schema.concat(
				{
					id: timestamp,
					field: null,
					column: null
				}
			)
		})
	}

	submitCollectionSchema() {
		CollectionActions.updateCollectionSchema(this.state.schema)
	}

	render () {
		// Utility Functions
		let getComponent = x => x.component

		return (
			<div>
				{ this.state.keyMatchers.map(getComponent) }
				<br />
				<Button onClick={this.addKeyMatcher} icon='plus' content='add field' primary />
				<Button onClick={this.submitCollectionSchema} color='blue' content='Preview' basic />
			</div>
		)
	}
}
