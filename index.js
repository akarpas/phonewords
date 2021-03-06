const express = require('express')
const path = require('path')
const keys = require('./helpers/keys')
const bodyParser = require('body-parser')
const _ = require('lodash')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(cors())

const reduceFunc = (a, b) => {
  return b.reduce((result, b) => result.concat(a.map(a => a + b)), [])
}



app.use(express.static(path.join(__dirname, 'client/dist')))
app.use(bodyParser.json({
  limit: '2000kb'
}))

app.post('/api/t9', (req, res, next) => {
  console.log('T9 Post Request for: ', req.body.number)
  const dictionaryOne = fs.readFileSync(`./helpers/1000mostCommonWords.txt`).toString('utf-8')
  const dictionaryTwo = fs.readFileSync(`./helpers/3_letter_words.txt`).toString('utf-8')
  const wordDictionary = dictionaryOne.concat(dictionaryTwo).split("\n")

  const isNumber = /^\d+$/.test(req.body.number)
  const number = isNumber ? Number(req.body.number) : req.body.number
  const isNumberClean = 
    String(number).indexOf('0') === -1
    && String(number).indexOf('1') === -1

    if (typeof number !== 'number') {
    res.status(400).send({
      error: "only numbers"
    })
  } else if (!isNumberClean) {
    res.status(400).send({
      error: "available only digits with text: 2, 3, 4, 5, 6, 7, 8"
    })
  } else if (String(number).length > 9) {
    res.status(400).send({
      error: "currently up to 9 digit numbers supported"
    })
  } else if (number <= 9) {
    res.status(200).send({
      combos: keys[number],
      words: keys[number]
    })
  } else {
    const combinations = _(String(number).split('')).map(digit => {
      return keys[digit]
    }).reduce(reduceFunc).sort()

    let realWords = []
    combinations.forEach((item, index) => {
      if (wordDictionary.indexOf(item) > -1) {
        realWords.push(item)
      }
    })

    res.status(200).send({
      combos: combinations,
      words: realWords
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})


const port = process.env.PORT || 5050
app.listen(port)

console.log(`Listening on Port: ${port}`)

module.exports = app