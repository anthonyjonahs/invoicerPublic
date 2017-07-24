import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ListStore extends EventEmitter {
  constructor() {
    super();

		this.list = null;
		this.lists = null;
  }

  getState() {
		return this.list
  }

	getLists() {
		return this.lists
	}

	updateList(list) {
		this.list = list
		this.emit('change')
	}

	updateLists(lists) {
		this.lists = lists
		console.log('updated lists and they are: ', this.lists);
		this.emit('updated lists')
	}

	clearList() {
		this.list = null
		this.emit('change')
	}

  handleActions(action) {
    switch (action.type) {
      case 'UPLOADING_LIST':
				break
			case 'LIST_UPLOADED':
				break
			case 'GOT LIST':
				this.updateList(action.list)
				break
			case 'CLEAR_LIST_STORE':
				this.clearList()
				break
			case 'GOT_ALL_LISTS':
				this.updateLists(action.lists)
				break
    }
  }
}

const listStore = new ListStore
dispatcher.register(listStore.handleActions.bind(listStore))
export default listStore;
