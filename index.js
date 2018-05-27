const express = require('express')
const path = require('path')
const keys = require('./helpers/keys')
const bodyParser = require('body-parser')


const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json({
  limit: '1000kb'
}))

app.post('/api/t9', (req, res) => {
  console.log('T9 Get Request', req.body)
  // handle T9 response here
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5050
app.listen(port)

console.log(`Listening on Port: ${port}`)