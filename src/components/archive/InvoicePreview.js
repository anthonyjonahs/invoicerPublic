import React from 'react'
import PropTypes from 'prop-types';

const InvoicePreview = (props) => {
	let invoiceText = props.invoiceText
	let invoice = props.invoice
	let contents = invoiceText.concat(invoice)

	return (
		<div>
			<pre style={{whiteSpace:'pre-wrap'}}>
				{ contents }
			</pre>
		</div>
	)
}

export default InvoicePreview;

InvoicePreview.propTypes = {
  invoiceText: PropTypes.string,
  invoice: PropTypes.string
};
