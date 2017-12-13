const mysql = require('mysql');
const config = require('./config.js')

var con = mysql.createConnection({
  host:config.host,
  user:config.user,
  password:config.password
})

var createDatabase = () => {
  var sql = 'CREATE DATABASE urls;'
  con.query(sql, (err,result) => {
    if (err) throw err;
    console.log(result);
  })
}

var createTable = () => {
  con.query('use urls', (err, result) => {
    if (err) throw err;
  })

  var sql = 'CREATE TABLE urls ( id int PRIMARY KEY AUTO_INCREMENT, url text, timestamp int );'
  con.query(sql, (err,result) => {
    if (err) throw err;
  })
}

var setAutoInc = () => {
  var setAutoInc = 'alter table urls AUTO_INCREMENT=100001;'
  con.query(setAutoInc, (err,result) => {
    if (err) throw err
  })
}

(function() {
  createDatabase();
  createTable();
  setAutoInc();
  console.log('SETUP IS COMPLETE!');
})();

