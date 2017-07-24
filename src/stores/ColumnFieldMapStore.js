import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ColumnFieldMapStore extends EventEmitter {
  constructor() {
    super();

		this.columnFieldMap = {
			email: null,
			childName: null,
			parentFirstName: null,
			parentLastName: null,
			ageGroup: null,
			startTime: null,
			endTime: null,
			startDate: null,
			endDate: null,
			registrationDate: null,
			amount: null
		}
  }

  getState() {
		return this.columnFieldMap
  }

	updateColumnFieldMap(field, column) {
		this.columnFieldMap[field] = column
		this.emit('change')
	}

  handleActions(action) {
    switch (action.type) {
      case 'MAP_FIELD_TO_COLUMN':
				this.updateColumnFieldMap(action.field, action.column)
    }
  }
}

const columnFieldMapStore = new ColumnFieldMapStore
dispatcher.register(columnFieldMapStore.handleActions.bind(columnFieldMapStore))
export default columnFieldMapStore;
