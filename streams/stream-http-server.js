import http from 'node:http'
import { Transform } from 'node:stream'

class inverseNumberStream extends Transform {
   _transform(chunk, encoding, callback) {
      const transformed = Number(chunk.toString()) * -1

      console.log(transformed)

      callback(null, Buffer.from(String(transformed)))
   }
}

const server = http.createServer(async (req, res) => {
   // return req.pipe(new inverseNumberStream()).pipe(res)

   const buffers = []

   for await (const chunk of req) {
      buffers.push(chunk)
   }

   const fullStreamContent = Buffer.concat(buffers).toString()

   return res.end(fullStreamContent)
})

server.listen(3334)