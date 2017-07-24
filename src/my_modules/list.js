import _ from 'lodash'

export function toJson (listItem, schema) {
	let object = new Object();

	schema.map(fieldColumnPair => {
		object[fieldColumnPair.field] = listItem[fieldColumnPair.column]
	})

	return object;
}

export function toTextList(invoice) {
	let bulletList = '';

	_.mapKeys(invoice, (value, key) => {
		let bullet = `\t- ${_.startCase(key)}: ${value}\n`
		bulletList= bulletList.concat(bullet)
	})

	return bulletList;
}
