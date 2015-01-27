var pg           = require('pg');

var conString = "postgres://carolinelouie@localhost/auth";

var client = new pg.Client(conString);



function User(){
    this.u_id = 0;
    //this.name ='';
    //this.photo ='';
    this.email = "";
    this.password= ""; //need to declare the things that i want to be remembered for each user in the database

    this.save = function() {
        var conString = "postgres://carolinelouie@localhost/auth";

        var client = new pg.Client(conString);
        client.connect();

        console.log(this.email +' will be saved');

            client.query('INSERT INTO users(email, password) VALUES($1, $2)', [this.email, this.password], function (err, result) {
                if(err){
                    console.log(err);
                    return console.error('error running query', err);
                }
                console.log(result.rows);
                //console.log(this.email);
                client.end();
            });

            //whenever we call 'save function' to object USER we call the insert query which will save it into the database.
        //});
    };
        //User.connect

    this.findById = function(callback){
        return callback (false);

    };


}

User.findOne = function(email, callback){
    var conString = "postgres://carolinelouie@localhost/auth";
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

    client.query("SELECT * from users where email=$1", [email], function(err, result){
        if(err){
            return callback(err, isNotAvailable, this);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
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
        return callback(false, isNotAvailable, this);


    });
//});
};

User.findById = function(id, callback){
    return callback (false, null);
};

User.query = function(callback){

};

//User.connect = function(callback){
//    return callback (false);
//};

//User.save = function(callback){
//    return callback (false);
//};

module.exports = User;

