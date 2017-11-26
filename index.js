const express = require('express')
const app = express()
const base = require('./base58.js')

app.use(express.static('public'))

app.get('/', (req,res) => {
  res.sendFile('index')
})

const port = process.env.PORT || 8080
app.listen(port)