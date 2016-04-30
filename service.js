var amqp = require('amqplib');
var scripter = require('./gulpfile');

const BROKER_URL = `amqp://${process.env.AMQ_PORT_5672_TCP_ADDR}:${process.env.AMQ_PORT_5672_TCP_PORT}`;


amqp.connect(BROKER_URL).then((connection)=> {
  return connection.createChannel().then((channel)=> {
    var q = 'rpc_queue';

    channel.assertQueue(q, {durable: false});
    channel.prefetch(1);

    channel.consume(q, (msg)=> {
      var msgContent = msg.content.toString();

      scripter(msgContent, (file)=> {
        channel.sendToQueue(msg.properties.replyTo, new Buffer(file), {
          correlationId: msg.properties.correlationId
        });
      });

      channel.ack(msg);

    });
  });
})
.then(null, console.warn);

