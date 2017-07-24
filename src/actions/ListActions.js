import Dispatcher from '../dispatcher'
import _ from 'lodash'

const ListActions = {

	async uploadCsvList(csv, listName) {
		//Store data as Form{} for http POST
		let body = new FormData()
		body.append('listCsv', csv)
		body.append('listName', listName)
		let request = { method:'POST',
										credentials: 'include',
										body
									}
		Dispatcher.dispatch({ type: 'UPLOADING_LIST' });

		try {
			let res = await fetch(`${location.origin}/api/list`, request)
			let listId = await res.json()

			Dispatcher.dispatch({ type: 'LIST_UPLOADED', listId })

			this.getList(listId)

		} catch (err) {
			console.error(err)
			Dispatcher.dispatch({ type: 'ERROR', message: 'Failed to upload CSV.' })
		}
  },

	async getList(listId) {
		let request = `${location.origin}/api/list/${listId}`

		fetch(request, { credentials: 'include' })
		.then(res => res.json())
		.then(list => {
			console.log('truncated list object is: ', list);
			Dispatcher.dispatch({
				type: 'GOT LIST',
				list
			})
		})

	},

	mapFieldToColumn(field, column) {
		Dispatcher.dispatch({
      type: 'MAP_FIELD_TO_COLUMN',
			field,
			column
    });
	},

	async transformList(listId, columnFieldMap){
		Dispatcher.dispatch({ type: 'TRANSFORMING_LIST' })
		let body = JSON.stringify(columnFieldMap)
		let request = {
			method:'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body
		}

		try {
			let res = await fetch(`${location.origin}/api/list/${listId}`, request)
			if(res.status == 200) {
				Dispatcher.dispatch({ type: 'DONE_TRANSFORMING_LIST' })
				this.getList(listId)
			} else {
				Dispatcher.dispatch({ type: 'ERROR', message: 'Oops. Something went wrong. Email Anthony and tell him he sucks! '})
			}
		}
		catch (e) { console.error(e) }
	},

	async getAllLists() {
		console.log('getting all lists.');
		let apiEndPoint = `${location.origin}/api/list`
		let request = { credentials:'include' }
		try {
			let lists = await fetch(apiEndPoint, request)
												.then(x => x.json())
			console.log('got all lists, sending to store');
			Dispatcher.dispatch({ type: 'GOT_ALL_LISTS', lists })
		} catch (e) {
			console.error(e)
		}
	},

	async deleteList(listId) {
		let apiEndPoint = `${location.origin}/api/list`
		let body = JSON.stringify({ listId })
		let request = {	method: 'DELETE',
										credentials: 'include',
										headers: { 'Content-Type': 'application/json' },
										body
									}
		try {
			Dispatcher.dispatch({ type: 'DELETING_LIST' })
			let response = await fetch(apiEndPoint, request)
			if(response.status == 200) {
				Dispatcher.dispatch({ type: 'DELETING_LIST_SUCCESS' })
				this.getAllLists()
			} else {
				Dispatcher.dispatch({ type: 'DELETING_LIST_ERROR' })
			}
		} catch (e) {
			Dispatcher.dispatch({ type: 'DELETING_LIST_ERROR' })
		}
	},

	clearListStore() {
		Dispatcher.dispatch({ type: 'CLEAR_LIST_STORE' })
	}

};

export default ListActions;
