import fetch from 'node-fetch'

const test = process.env.NODE_ENV === 'test'
const dev = process.env.NODE_ENV === 'development'

const baseUrl = test || dev ? 'http://localhost:5050/api' :
  'https://t9phonewords.herokuapp.com/api'
  // TO DO: Check deployment URL

export default async (endpoint, number, method) => {
  let url
  const options = {
      method: method,
      body: JSON.stringify({ number: number }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

  url = `${baseUrl}${endpoint}`

  const response = await fetch(url, options)
  const body = await response.json()

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
}
