var pg           = require('pg');

var conString = process.env.DATABASE_URL;

var client = new pg.Client(conString);



function User(){
    this.sfid = 0;
    this.email = "";
    this.name= ""; 
}

User.findOne = function(email, callback){
    var client = new pg.Client(conString);

    var isNotAvailable = false; //we are assuming the email is taking
    //var email = this.email;
    //var rowresult = false;
    console.log(email + ' is in the findOne function test');
    //check if there is a user available for this email;
    client.connect();
    //client.connect(function(err) {
    ////    //console.log(this.photo);
    //    console.log(email);
    //    if (err) {
    //        return console.error('could not connect to postgres', err);
    //    }

    client.query("SELECT * from salesforce.contact where email=$1", [email], function(err, result){
        if(err){
            return callback(err, isNotAvailable, result);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length < 0){
            isNotAvailable = true; // update the user for return in callback
            ///email = email;
            //password = result.rows[0].password;
            console.log(email + ' is am not available!');
        }
        else{
            isNotAvailable = false;
            //email = email;
            console.log(email + ' is available');
        }
        //the callback has 3 parameters:
        // parameter err: false if there is no error
        //parameter isNotAvailable: whether the email is available or not
        // parameter this: the User object;

        client.end();
        return callback(false, isNotAvailable, result);


    });
//});
};

User.findBysfid = function(sfid, callback){
    console.log("we are in findbyid");
    var client = new pg.Client(conString);

    client.connect();
    client.query("SELECT * from salesforce.contact where sfid=$1", [sfid], function(err, result){

        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            console.log(result.rows[0] + ' is found!');
            var user = new User();
            user.email= result.rows[0]['email'];
            user.name = result.rows[0]['name'];
            user.sfid = result.rows[0]['sfid'];
            console.log(user.email);
            return callback(null, user);
        }
    });
};

//User.connect = function(callback){
//    return callback (false);
//};

//User.save = function(callback){
//    return callback (false);
//};

module.exports = User;

