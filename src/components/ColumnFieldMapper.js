import React from 'react'
import PropTypes from 'prop-types'
import ListActions from '../actions/ListActions'
import _ from 'lodash'
import { Form } from 'semantic-ui-react'

const ColumnFieldMapper = (props) => (
	<Form.Select
		label={_.startCase(props.field)}
		options={props.columns.map((column, index) => {
			return {
				key: index,
				text: column,
				value: column
			}
		})}
		placeholder={`Match ${_.lowerCase(props.field)} to a column ...`}
		onChange={(e, { value }) => { ListActions.mapFieldToColumn(props.field, value) }}
		search
	/>
)

export default ColumnFieldMapper

ColumnFieldMapper.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  field: PropTypes.string.isRequired
};
