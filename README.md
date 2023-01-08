# fastify-204

[![CI](https://github.com/Shiva127/fastify-204/actions/workflows/ci.yml/badge.svg)](https://github.com/Shiva127/fastify-204/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/fastify-204)](https://www.npmjs.com/package/fastify-204)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Automatically return 204 status code on empty response.

## Install

### Yarn

```
yarn add fastify-204
```

### NPM

```
npm install fastify-204
```

## Usage

```JavaScript
import Fastify from 'fastify'

const fastify = Fastify()

await fastify.register(import('fastify-204'), {
  onUndefined: true,
  onNull: false,
  onEmptyArray: false
})

// This route will reply with a 204 status code
fastify.get('/foo', (req, reply) => {
  reply.send()
})

await fastify.listen({ port: 3000 })
```

### Options

| Option         | Default | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| `onUndefined`  | `true`  | Return 204 when response is `undefined`          |
| `onNull`       | `false` | Return 204 when response is `null`               |
| `onEmptyArray` | `false` | Return 204 when response is a empty array (`[]`) |

## License

Copyright [Gilles Marchand](https://github.com/Shiva127), Licensed under [MIT](./LICENSE).
