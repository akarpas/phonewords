const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api/t9', (req, res) => {
  console.log('T9 Get Request')
  // handle T9 response here
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5050
app.listen(port)

console.log(`Listening on Port: ${port}`)