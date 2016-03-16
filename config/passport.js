//configuring the strategies for passport


// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;
var pg           = require('pg');

var conString = process.env.DATABASE_URL;

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
        console.log(user.u_id +" was seralized");
        done(null, user.u_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log(id + "is deserialized");
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : process.env.FB_clientID,
            clientSecret    : process.env.FB_clientSecret,
            callbackURL     : process.env.BASE_URL+'auth/facebook/callback',
            enableProof: true
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
                        
                    }

                });
            });
        }));

    };
