var amqp = require('amqplib');
var scripter = require('./gulpfile.js');

const BROKER_URL = `amqp://rabbitmq:5672`;
var isConnected = false;

// Continuously tries to connect to the rabbitMQ broker
function rabbitConnect() {
  return amqp.connect(BROKER_URL)
    .catch((err)=> {
      return rabbitConnect();
    });
}

rabbitConnect().then((connection)=> {
  return connection.createChannel().then((channel)=> {
    var q = 'rpc_queue';
    console.log('Connected');
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

