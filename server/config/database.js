
var pgp = require('./pgpromise.js');
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
    host: 'ec2-54-225-151-64.compute-1.amazonaws.com', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'd24n3l2kj40397',
    user: 'lphzusjdgyphib',
    password: 'iIxxi0Ptg3_FWhPeHWkJ09n4tH'
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
