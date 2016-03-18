var pg = require('pg');
var conString = process.env.DATABASE_URL;
//all the routes for our application
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    
    //app.get('/api', './routes/api.js');
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
        console.log(req.user);
    });
    app.get('/neworder', isLoggedIn, function(req, res) {
        res.render('neworder.ejs', {
            user : req.user // get the user out of session and pass to template
        });
        console.log(req.user);
    });
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


// =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/api/order', function(req, res) {
        
        if(req.hasOwnProperty('user')){
        
            var loginUser = req.user;
            var results = [];
            console.log(loginUser);
            // Get a Postgres client from the connection pool
            pg.connect(conString, function(err, client, done) {
                // Handle connection errors
                if(err) {
                  done();
                  console.log(err);
                  return res.status(500).json({ success: false, data: err});
                }
        
                // SQL Query > Select Data
                var query = client.query("SELECT * FROM salesforce.order INNER JOIN salesforce.orderitem ON salesforce.order.sfid = salesforce.orderitem.orderid INNER JOIN salesforce.pricebookentry ON salesforce.orderitem.pricebookentryid = salesforce.pricebookentry.sfid WHERE accountid ='"+loginUser.accountid+"';");
                // Stream results back one row at a time
                query.on('row', function(row) {
                    results.push(row);
                });
        
                // After all data is returned, close connection and return results
                query.on('end', function() {
                    done();
                    return res.json(results);
                });
        
            });
            
        }else{
            return res.status(500).json({ success: false});
        }
    });
    app.get('/api/pricebook', function(req, res) {
        
        if(req.hasOwnProperty('user')){
        
            var loginUser = req.user;
            var results = [];
            console.log(loginUser);
            // Get a Postgres client from the connection pool
            pg.connect(conString, function(err, client, done) {
                // Handle connection errors
                if(err) {
                  done();
                  console.log(err);
                  return res.status(500).json({ success: false, data: err});
                }
        
                // SQL Query > Select Data
                var query = client.query("SELECT * FROM salesforce.Pricebook2");
                // Stream results back one row at a time
                query.on('row', function(row) {
                    results.push(row);
                });
        
                // After all data is returned, close connection and return results
                query.on('end', function() {
                    done();
                    return res.json(results);
                });
        
            });
        }else{
            return res.status(500).json({ success: false});
        }
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log('isLoggedin');
        return next();
    }
    console.log('is not logged in');

    // if they aren't redirect them to the home page
    res.redirect('/');
}
