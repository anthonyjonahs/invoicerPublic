import Dispatcher from '../dispatcher';

const CollectionActions = {

	updateCollectionSchema(schema) {
		Dispatcher.dispatch({
      type: 'updateCollectionSchema',
      schema
    });
  }

};

export default CollectionActions;
