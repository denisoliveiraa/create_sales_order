import fastify from "fastify";
import {createHeaderRoute} from './routes/createHeader'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(createHeaderRoute, {
  prefix:  'createHeaderRoute',
})

app.listen({port: 1298}).then(function() {console.log("server is running")})