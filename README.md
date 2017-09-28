# Nats Event EX

Extends nats event with enforced protocol.

## Features

- Protocol enforced
- Default error handler

## Protocol

[protocol](docs/protocol.md)

## Usage

Install package:

```
npm install nats-event-ex
```

Import an use:

```ecmascript 6
const eventEx = require('nats-event-ex')('nats://localhost:4222')
  .setQueueGroup(SERVICE_NAME)
```

Basic Usage:

```ecmascript 6
eventEx.listen('book.created', async (book) => {await readBook(book)})

eventEx.send('book.created', {name: 'Good Book'})
```

Default error handler:

```ecmascript 6
eventEx.listen('error', async () => {throw new Error('Wops!')})

eventEx.send('error')
// error will be logged by simple-json-error
```

## API

This module is based on [nats-event](https://github.com/zhaoyao91/nats-event),
and that module is based on [node-nats](https://github.com/nats-io/node-nats).
Please check their docs for more detailed apis.

#### module.exports

> func(options) => eventEx

- `options` could be:
  - an nats url string for single server, such as `nats://localhost:4222`
  - an nats url string for cluster servers, such as `nats://192.168.0.1:4222,nats://192.168.0.2:4222`
  - [nats connect options](https://github.com/nats-io/node-nats)
  
#### eventEx.listen

> `func(name, handler)`

- `handler`: async (data, input, subject)

#### eventEx.send

> `async func(name, data, options)`

- `options` is optional, which may contains:
  - eventId: optional