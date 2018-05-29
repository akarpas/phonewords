import fetch from 'node-fetch'

const baseUrl = process.env.NODE_ENV === 'development' ?
  'http://localhost:5050/api' :
  'http://phonewords.heroku.com/api'
  // TO DO: Check deployment URL

console.warn("base url: ", baseUrl)
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
