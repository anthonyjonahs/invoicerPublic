import React from 'react'
import PropTypes from 'prop-types';
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react'

const KeyMatcher = (props) => (
	<div>
		<Form id={props.id} onSubmit={e => e.preventDefault()}>
			<Form.Group >
				<Form.Input id={props.id} placeholder='Field' onChange={props.changeHandler} />
				<Form.Select
					id={props.id}
					options={props.columns.map((column, index) => {
						let x = {
							key: index,
							text: column,
							value: column
						}
						return x;
					})}
					placeholder='Corresponds to'
					onChange={props.changeHandler}
					search
				/>
				<Form.Button onClick={props.delete} id={props.id} color='red' icon='remove' basic />
			</Form.Group>
		</Form>
	</div>
)

export default KeyMatcher;

KeyMatcher.propTypes = {
  columnTitles: PropTypes.arrayOf(PropTypes.string),
};
