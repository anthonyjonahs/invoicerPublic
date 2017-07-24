// const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs');

module.exports =  function(passport) {

	passport.use(new LocalStrategy(
	  (username, password, done) => {
	    User.findOne({ username }, (err, user) => {
	      if (err) return done(err)

	      if (!user) return done(null, false, {message: 'Wrong username.'})

	      bcrypt.compare(password, user.password)
					.then(isMatch => isMatch ? done(null, user) : done(null, false, {message: 'Wrong password'}))
					.catch(err => done(err))
	    });
	  }
	));

	passport.serializeUser((user, done) => {
	  done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
	    done(err, user);
	  });
	});
}
