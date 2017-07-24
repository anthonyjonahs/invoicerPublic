import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class StatusStore extends EventEmitter {
  constructor() {
    super();

		this.status = {
			emailSending: false,
			errorMessage: null,
			successMessage: null
		}
  }

  getState() {
		return this.status
  }

	isEmailSending(bool) {
		this.status.emailSending = bool
		this.emit('change')
	}
	showSuccessMessage(message) {
		this.status.successMessage = message
		this.emit('change')
		setTimeout(() => {
			this.status.successMessage = null
			this.emit('change')
		}, 3000)
	}

	showErrorMessage(message) {
		this.status.errorMessage = message
		this.emit('change')
		setTimeout(() => {
			this.status.errorMessage = null
			this.emit('change')
		}, 3000)
	}

  handleActions(action) {
    switch (action.type) {
      case 'SENDING_INVOICE':
				this.isEmailSending(true)
				break
			case 'SENDING_INVOICE_ERROR':
				this.isEmailSending(false)
				this.showErrorMessage('Error: email not sent.')
				break
			case 'SENDING_INVOICE_SUCCESS':
				this.isEmailSending(false)
				this.showSuccessMessage('Email sent successfully')
				break
			case 'DELETING_LIST_ERROR':
				this.showErrorMessage('Error deleting your list.')
				break
    }
  }
}

const statusStore = new StatusStore
dispatcher.register(statusStore.handleActions.bind(statusStore))
export default statusStore;
