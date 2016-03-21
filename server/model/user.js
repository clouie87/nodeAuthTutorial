var db=require('../config/database.js') // load our db
function User(){
    this.sfid = 0;
    this.email = "";
    this.name= ""; 
    this.accountid= ""; 
}
User.findOne = function(email, callback){

	var isNotAvailable = false; //we are assuming the email is taking
	//var email = this.email;
	//var rowresult = false;
	console.log(email + ' is in the findOne function test');
	//check if there is a user available for this email;
	//client.connect(function(err) {
	////    //console.log(this.photo);
	//    console.log(email);
	//    if (err) {
	//        return console.error('could not connect to postgres', err);
	//    }
	db.query("SELECT * from salesforce.contact where email='"+email+"'", true)
	    .then(function (data) {
	        console.log("DATA:", data); // print data;
	        if (data.rows.length < 0){
		    isNotAvailable = true; // update the user for return in callback
		    ///email = email;
		    console.log(email + ' is am not available!');
		}
		else{
		    isNotAvailable = false;
		    //email = email;
		    console.log(email + ' is available');
		}
		return callback(null, isNotAvailable,data);
	    })
	    .catch(function (err) {
	        return callback(err, isNotAvailable,[]);
	    })
	    .finally(function () {
	        // If we do not close the connection pool when exiting the application,
	        // it may take 30 seconds (poolIdleTimeout) before the process terminates,
	        // waiting for the connection to expire in the pool.
	
	        // But if you normally just kill the process, then it doesn't matter.
	
	        pgp.end(); // for immediate app exit, closing the connection pool.
	
	        // See also:
	        // https://github.com/vitaly-t/pg-promise#library-de-initialization
	    });

};

User.findBysfid = function(sfid, callback){
	console.log("we are in findbyid");
	db.query("SELECT * from salesforce.contact where sfid='"+sfid+"'", true)
	    .then(function (data) {
	        console.log("DATA:", data); // print data;
	        if (data.rows.length > 0){
		    console.log(result.rows[0] + ' is found!');
		    var user = new User();
		    user.email= result.rows[0]['email'];
		    user.name = result.rows[0]['name'];
		    user.sfid = result.rows[0]['sfid'];
		    user.accountid =  result.rows[0]['accountid'];
		    console.log(user.email);
		    return callback(null, user);
		}
	    })
	    .catch(function (err) {
	        return callback(err,null);
	    })
	    .finally(function () {
	        // If we do not close the connection pool when exiting the application,
	        // it may take 30 seconds (poolIdleTimeout) before the process terminates,
	        // waiting for the connection to expire in the pool.
	
	        // But if you normally just kill the process, then it doesn't matter.
	
	        pgp.end(); // for immediate app exit, closing the connection pool.
	
	    });
};

module.exports = User;

