import React from 'react'
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react'

const EmailPreview = (props) => {
	let invoiceText = props.invoiceText
	let invoice = props.invoice
	let contents = invoiceText.concat(invoice)

	return (
		<Card fluid>
			<Card.Content>
				<pre style={{whiteSpace:'pre-wrap'}}>
					{ contents }
				</pre>
			</Card.Content>
		</Card>
	)
}

export default EmailPreview
