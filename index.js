const fp = require('fastify-plugin')

function fastify204 (fastify, options, done) {
  options = Object.assign({
    onUndefined: true,
    onNull: false,
    onEmptyArray: false
  }, options)

  fastify.addHook('preSerialization', async (request, reply, payload) => {
    if (options.onNull && payload === null) {
      reply.code(204)
      return
    }

    if (options.onEmptyArray && Array.isArray(payload) && payload.length === 0) {
      reply.code(204)
      return
    }

    return payload
  })

  fastify.addHook('onSend', async (request, reply, payload) => {
    if ((options.onUndefined && payload === undefined) || reply.statusCode === 204) {
      reply.code(204)
      return null
    }

    return payload
  })

  done()
}

module.exports = fp(fastify204, {
  fastify: '4.x',
  name: 'fastify-auto-204'
})
