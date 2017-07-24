import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class UserStore extends EventEmitter {
  constructor() {
    super();

		this.user = {}
  }

  getState() {
		return this.user
  }

	updateUser(user) {
		this.user = user
		this.emit('change')
	}

  handleActions(action) {
    switch (action.type) {
      case 'GOT_USER':
				this.updateUser(action.user)
    }
  }
}

const userStore = new UserStore
dispatcher.register(userStore.handleActions.bind(userStore))
export default userStore;
