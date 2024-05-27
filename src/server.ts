import fastify from "fastify";
import {createHeaderRoute} from './routes/createHeader'

const app = fastify()

app.register(createHeaderRoute, {
  prefix:  'createHeaderRoute',
})

app.listen({port: 1298}).then(function() {console.log("server is running")})