const tap = require('tap')
const test = tap.test
const fastify = require('fastify')
const fastify204 = require('..')

function build (fastify204Option) {
  const app = fastify()

  app.register(fastify204, fastify204Option)

  app.get('/data', async function (request, reply) {
    return { foo: 'bar' }
  })

  app.get('/undefined', async function (request, reply) {
    return undefined
  })

  app.get('/null', async function (request, reply) {
    return null
  })

  app.get('/empty-array', async function (request, reply) {
    return []
  })

  return app
}

async function inject (t, url, statusCode, body, text) {
  const response = await this.inject({
    method: 'GET',
    url
  })
  t.equal(response.statusCode, statusCode, text)
  t.equal(response.body, body, text)
}

async function injectAll (t, { onUndefined = true, onNull = false, onEmptyArray = false } = {}) {
  await inject.call(this, t, '/data', 200, '{"foo":"bar"}', 'on data')

  if (onUndefined) {
    await inject.call(this, t, '/undefined', 204, '', 'on undefined')
  } else {
    await inject.call(this, t, '/undefined', 200, '', 'on undefined')
  }

  if (onNull) {
    await inject.call(this, t, '/null', 204, '', 'on null')
  } else {
    await inject.call(this, t, '/null', 200, 'null', 'on null')
  }

  if (onEmptyArray) {
    await inject.call(this, t, '/empty-array', 204, '', 'on empty array')
  } else {
    await inject.call(this, t, '/empty-array', 200, '[]', 'on empty array')
  }
}

test('Should load the plugin', t => {
  t.plan(1)
  const app = build()
  app.ready(t.error)
})

test('Default parameters (only on undefined)', async t => {
  const app = build()
  await injectAll.call(app, t)
})

test('Only on undefined', async t => {
  const config = {
    onUndefined: true,
    onNull: false,
    onEmptyArray: false
  }
  const app = build(config)
  await injectAll.call(app, t, config)
})

test('Only on null', async t => {
  const config = {
    onUndefined: false,
    onNull: true,
    onEmptyArray: false
  }
  const app = build(config)
  await injectAll.call(app, t, config)
})

test('Only on empty-array', async t => {
  const config = {
    onUndefined: false,
    onNull: false,
    onEmptyArray: true
  }
  const app = build(config)
  await injectAll.call(app, t, config)
})

test('None', async t => {
  const config = {
    onUndefined: false,
    onNull: false,
    onEmptyArray: false
  }
  const app = build(config)
  await injectAll.call(app, t, config)
})
