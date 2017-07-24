import fs from 'fs'
import _ from 'lodash'
import csvtojson from 'csvtojson'

const FILE_PATH = './server/uploads/'

let readFile = (file) => {
		return new Promise((resolve, reject) => {
			fs.readFile(file, 'utf8', (err, data) => {
				if(err) reject(err)
				resolve(data)
			})
		})
}

export async function csvToJson(csvPath) {
	return new Promise((resolve, reject) => {
		csvtojson({delimiter: 'auto'})
		.fromFile(csvPath)
		.on('end_parsed', json => {
			resolve(json)
		})
		.on('done', err => {
			if(err) reject(err);
		})
	})
}

export async function saveJsonList(jsonList, listId) {
	let json = JSON.stringify(jsonList)
	return new Promise((resolve, reject) => {
		fs.writeFile(FILE_PATH + listId, json, 'utf8', err => {
			if(err) reject(err);
			resolve(listId)
		})
	})
}

export async function getKeys (listId) {
	let list = await readFile(FILE_PATH + listId)
	list = JSON.parse(list)
	return _.keys(list[0]);
}

export async function getList (listId) {
	let list = await readFile(FILE_PATH + listId)
	list = JSON.parse(list)
	return list;
}

export async function parseCSV (file, schema) {
	let csv = await readFile(file)
	let keys;
	let result = _
		.chain(csv) // Load data
		.split('\r') // Array of lines
		.map(x => [x]) // Array of arrays containing one string
		.map(x => _.split(x,';')) // Split each array into array of strings
		.tap(x => keys = x.shift())
		.value()

}
