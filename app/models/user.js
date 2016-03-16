var pg           = require('pg');

var conString = process.env.DATABASE_URL;

var client = new pg.Client(conString);



function User(){
    this.u_id = 0;
    //this.name ='';
    //this.photo ='';
    this.email = "";
    this.password= ""; //need to declare the things that i want to be remembered for each user in the database

    this.save = function(callback) {

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
            });
            client.query('SELECT * FROM users ORDER BY u_id desc limit 1', null, function(err, result){

                if(err){
                    return callback(null);
                }
                //if no rows were returned from query, then new user
                if (result.rows.length > 0){
                    console.log(result.rows[0] + ' is found!');
                    var user = new User();
                    user.email= result.rows[0]['email'];
                    user.password = result.rows[0]['password'];
                    user.u_id = result.rows[0]['u_id'];
                    console.log(user.email);
                    client.end();
                    return callback(user);
                }
            });



            //whenever we call 'save function' to object USER we call the insert query which will save it into the database.
        //});
    };
        //User.connect

    //this.findById = function(u_id, callback){
    //    console.log("we are in findbyid");
    //    var user = new User();
    //    user.email= 'carol';
    //    user.password='gah';
    //    console.log(user);
    //
    //    return callback(null, user);
    //
    //};


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

    client.query("SELECT * from Contact where email=$1", [email], function(err, result){
        
        console.log(err);
        console.log(result);
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
    console.log("we are in findbyid");
    var client = new pg.Client(conString);

    client.connect();
    client.query("SELECT * from users where u_id=$1", [id], function(err, result){

        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            console.log(result.rows[0] + ' is found!');
            var user = new User();
            user.email= result.rows[0]['email'];
            user.password = result.rows[0]['password'];
            user.u_id = result.rows[0]['u_id'];
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

