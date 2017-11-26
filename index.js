const express = require('express')
const app = express()
const base = require('./base58.js')
const bodyParser = require('body-parser')
const mysql = require('mysql')

var con = mysql.createConnection({
  host:'localhost',
  database:'urls',
  user:'root',
  password:'qwerty'
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req,res) => {
  res.sendFile('index')
})

app.post('/api/url', (req,res) => {
  var currentUrl = req.body.currentUrl
  var url = req.body.url
  var timestamp = Math.round(Date.now() / 1000)
  var id;
  var insertSQL = `INSERT INTO urls (url,timestamp) VALUES ("${url}", ${timestamp})`

  con.query(insertSQL, (err,result) => {
    if (err) throw err
    id = result.insertId
    encodeData(id, currentUrl)
  })

  function encodeData(id, currentUrl) {
    var path = base.encode(id)
    var encodedUrl = currentUrl + path
    res.json({
      url:encodedUrl
    })
  }

  res.status(200)
})

app.get('/:id', (req,res) => {
  var decodedID = base.decode(req.params.id)
  
  var searchIdSQL = `SELECT url FROM urls WHERE id = ${decodedID}`
  con.query(searchIdSQL, (err,result) => {
    if (err) throw err

    var redirectUrl = result[0].url
    var regPattern = "^(http|https)://"
    var reg = new RegExp(regPattern)

    if (reg.test(redirectUrl)) {
      res.redirect(redirectUrl)
    } else {
      redirectUrl = "http://" + redirectUrl;
      res.redirect(redirectUrl)
    }
  })
})

const port = process.env.PORT || 8080
app.listen(port)

