const express = require('express')
const path = require('path')
const keys = require('./helpers/keys')
const bodyParser = require('body-parser')
const _ = require('lodash')
const fs = require('fs')

const app = express()
const reduceFunc = (a, b) => {
  return b.reduce((result, b) => result.concat(a.map(a => a + b)), [])
}

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json({
  limit: '1000kb'
}))

app.post('/api/t9', (req, res) => {
  console.log('T9 Post Request for: ', req.body.number)
  const dictionaryOne = fs.readFileSync(`./helpers/1000mostCommonWords.txt`).toString('utf-8')
  const dictionaryTwo = fs.readFileSync(`./helpers/3_letter_words.txt`).toString('utf-8')
  const wordDictionary = dictionaryOne.concat(dictionaryTwo).split("\n")

  const number = req.body.number
  if (number <= 9) {
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
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


const port = process.env.PORT || 5050
app.listen(port)

console.log(`Listening on Port: ${port}`)