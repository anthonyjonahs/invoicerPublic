import Dispatcher from '../dispatcher';

const SendGridActions = {

	async sendInvoice(recipient, emailBody) {
		Dispatcher.dispatch({ type: 'SENDING_INVOICE' });

		let request = {
			method:'POST',
			credentials: 'include',
			headers: 	{	'Accept': 'application/json',
									'Content-Type': 'application/json'},
			body: JSON.stringify({ recipient, emailBody })
		}

		try {
			let response = await fetch(`${location.origin}/api/email/`, request)

			if(response.status < 300) {
				Dispatcher.dispatch({ type: 'SENDING_INVOICE_SUCCESS', response });
			} else {
				Dispatcher.dispatch({ type: 'SENDING_INVOICE_ERROR', response });
			}
		} catch (e) {
			console.error(e)
			Dispatcher.dispatch({ type: 'SENDING_INVOICE_ERROR' });
		}
  }

};

export default SendGridActions;
