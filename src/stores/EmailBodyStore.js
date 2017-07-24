import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class EmailBodyStore extends EventEmitter {
  constructor() {
    super();

		this.emailBody = 'Cher client,\n\nCi-joint est votre facture:\n\n';
  }

  getState() {
		return this.emailBody
  }

	updateEmailBody(body) {
		console.log('updating body to:', body);
		this.emailBody = body
		this.emit('change')
	}

  handleActions(action) {
    switch (action.type) {
      case 'UPDATE_EMAIL_BODY':
				this.updateEmailBody(action.body)
    }
  }
}

const emailBodyStore = new EmailBodyStore
dispatcher.register(emailBodyStore.handleActions.bind(emailBodyStore))
export default emailBodyStore;
