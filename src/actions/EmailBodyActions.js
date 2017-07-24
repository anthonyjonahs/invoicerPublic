import Dispatcher from '../dispatcher';

const EmailBodyActions = {

	updateEmailBody(body) {
		Dispatcher.dispatch({
      type: 'UPDATE_EMAIL_BODY',
      body
    });
  }

};

export default EmailBodyActions;
