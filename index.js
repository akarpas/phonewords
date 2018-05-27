const express = require('express')
const path = require('path')
const keys = require('./helpers/keys')
const bodyParser = require('body-parser')
const _ = require('lodash')

const app = express()
const reduceFunc = (a, b) => b.reduce((result, b) => result.concat(a.map(a => a + b)), []);

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json({
  limit: '1000kb'
}))

app.post('/api/t9', (req, res) => {
  console.log('T9 Post Request for: ', req.body.number)
  const number = req.body.number
  if (number <= 9) {
    res.status(200).send({ data: keys[number] })
  } else {
    const combinations = _(String(number).split('')).map(digit => {
      return keys[digit]
    }).reduce(reduceFunc).sort()

    res.status(200).send({ data: combinations })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


const port = process.env.PORT || 5050
app.listen(port)

console.log(`Listening on Port: ${port}`)