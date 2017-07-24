import React from 'react'
import PropTypes from 'prop-types'
import ColumnFieldMapper from './ColumnFieldMapper'
import { Form } from 'semantic-ui-react'

// To Do:
// Props: columns, fields, changeHandler
const ColumnFieldMapperGroup = (props) => (
	<Form>
		{
			props.fields.map((field, index) => {
				return (
					<ColumnFieldMapper
						key={index}
						field={field}
						columns={props.columns}
						changeHandler={props.changeHandler} />
				)
			})
		}
	</Form>
)

export default ColumnFieldMapperGroup

ColumnFieldMapperGroup.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired
};
