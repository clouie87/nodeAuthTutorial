var pg           = require('pg');

var conString = "postgres://carolinelouie@localhost/auth";

var pgclient = new pg.Client(conString);



function User(){
    this.u_id = 0;
    this.name ='';
    this.photo ='';
    this.email = '';
    this.password=''; //need to declare the things that i want to be remembered for each user in the database

    this.save = function(client) {
        console.log(this.photo);
        //console.log(client);
        client.connect();
        //client.connect(function(err) {
            console.log(this.photo);
            console.log(this.email);
            //if (err) {
            //    return console.error('could not connect to postgres', err);
            //}

            client.query('INSERT INTO users(name, photo, email, password) VALUES($1, $2, $3, $4)', [this.name, this.photo, this.email, this.password], function (err, result) {
                console.log(err);
                client.end();
            });
            //whenever we call 'save function' to object USER we call the insert query which will save it into the database.
        //});
    };
        //User.connect

    this.findById = function(callback){
        return callback (false);
    };

    //return this.hasOne(email);

}

User.findOne = function(callback){
    var email = this.email;
    var rowresult = false;
    console.log(email);
    pgclient.connect();
    pgclient.query("SELECT * from users where email=$1", [email], function(err, result){
        if (result != undefined && result.rows.length > 0){
            rowresult = true;
            console.log('it am not available!');
        }
        else{
            rowresult = false;
            console.log('i am available');
        }
        console.log(err);
        pgclient.end();

    });
    return callback(rowresult, this);
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

