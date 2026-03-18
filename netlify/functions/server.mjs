import server from '../../dist/server/server.js'

export const handler = async (event) => {
  const url = new URL(event.rawUrl, 'http://localhost')

  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: event.body
      ? event.isBase64Encoded
        ? Buffer.from(event.body, 'base64')
        : event.body
      : undefined,
  })

  const response = await server.fetch(request)
  const body = await response.text()

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body,
  }
}
