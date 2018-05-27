import fetch from 'node-fetch'

export default async (endpoint, number, method) => {
  let url
  const options = {
      method: method,
      body:    JSON.stringify({ number: number }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  // TODO: Set Dynamic Url for Dev and Production
  url = `http://localhost:5050/api${endpoint}`

  const response = await fetch(url, options)
  const body = await response.json()

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
}
