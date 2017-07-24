import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react'

const CollectionPreview = (props) => {
	let sampleListEntry = props.list[0]

	let sampleCollectionEntry = props.schema.map((fieldColumnPair, index) =>
		<li key = {index}>
			<b>
				{`${fieldColumnPair.field}: `}
			</b>
			{`${sampleListEntry[fieldColumnPair.column]}`}
		</li>
	)

	return (
		<div>
			<ul>
				{sampleCollectionEntry}
			</ul>
		</div>
	);
}

export default CollectionPreview;
