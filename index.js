const express = require('express')
const app = express()
const base = require('./base58.js')
const bodyParser = require('body-parser')
const mysql = require('mysql')

var con = mysql.createConnection({
  host:'localhost',
  database:'urls',
  user:'',
  password:''
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req,res) => {
  res.sendFile('index')
})

app.post('/api/url', (req,res) => {
  var url = req.body.url
  var timestamp = Math.round(Date.now() / 1000)
  var sql = `INSERT INTO urls (url,timestamp) VALUES ("${url}", ${timestamp})`

  con.query(sql, (err,result) => {
    
  })
  res.status(200)
})

const port = process.env.PORT || 8080
app.listen(port)