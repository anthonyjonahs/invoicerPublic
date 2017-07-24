import Dispatcher from '../dispatcher';

const UserActions = {

	logout() {
		Dispatcher.dispatch({
      type: 'loggingOut'
    });
		fetch(`${location.origin}/logout`, {
			method: 'POST',
			credentials: 'include'
		})
			.then(res => {
				if(res.redirected) window.location = res.url
			})
			.catch(err => console.error(err))
  },

	async getUser() {
		console.log('Firing UserActions.getUser()');
		try {
			let request = `${location.origin}/api/user`
			let response = await fetch(request, { credentials:'include' })
			let user = await response.json()

			Dispatcher.dispatch({ type: 'GOT_USER', user });

		} catch (err) {
			console.error(err);

			Dispatcher.dispatch({
				type: 'ERROR',
				message: 'Cannot get your user information.'
			});
		}
	}

};

export default UserActions;
