//configuring the strategies for passport


// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var pg           = require('pg');

var conString = "postgres://carolinelouie@localhost/auth";

var client = new pg.Client(conString);

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);

    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function(callback) {


                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne(email, function(err, isNotAvailable, user) {
                    //console.log('userfound: ' + isNotAvailable);
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    //if (){
                    //
                    //}

                    // check to see if theres already a user with that email
                    if (isNotAvailable == true) {
                        //console.log(user.email +' is not available');
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        console.log('new local user');

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();



                        // set the user's local credentials
                        //newUser.name = req.body.name;
                        //console.log(req.body);
                        newUser.email    = req.body.email;
                        newUser.password = req.body.password;
                        //newUser.photo = 'http://www.flippersmack.com/wp-content/uploads/2011/08/Scuba-diving.jpg';
                        newUser.save();
                        //client.end();
                        return done(null, newUser);
                        //newUser.password = newUser.generateHash(password);
                    }

                });

            });

        }));



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : '295897893929835',
            clientSecret    : '016c48478907f77a428e2dfb5724edf7',
            callbackURL     : 'http://localhost:8080/auth/facebook/callback'

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

    };
