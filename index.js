const connectEvent = require('nats-event')
const uuid = require('uuid').v4
const logger = require('simple-json-logger')

function buildNatsEventEx (...args) {
  const event = connectEvent(...args)
  const {send: originalSend, listen: originalListen} = event

  event.send = (name, data, options = {}) => {
    const {eventId} = options
    let input = {
      eventId: eventId || uuid(),
      data
    }
    input = JSON.stringify(input)
    originalSend(name, input)
  }

  // handler: async (data, input, subject)
  event.listen = (name, handler) => {
    const wrapperHandler = async (msg, subject) => {
      let input
      try {
        input = JSON.parse(msg)
      }
      catch (err) {
        logger.error(err, 'input must be a JSON string', {input: msg})
        return
      }

      if (!(typeof input === 'object' && input !== null && !Array.isArray(input))) {
        logger.error('input must be parsed as an object', {input: msg})
        return
      }

      try {
        await handler(input.data, input, subject)
      }
      catch (err) {
        logger.error(err, 'internal-event-error', {subject, input})
      }
    }
    originalListen(name, wrapperHandler)
  }

  return event
}

module.exports = buildNatsEventEx