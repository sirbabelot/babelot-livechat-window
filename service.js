var amqp = require('amqplib/callback_api');

console.log(process.env.AMQ_PORT_5672_TCP_ADDR);
console.log(process.env.AMQ_PORT_5672_TCP_PORT);
amqp.connect(`amqp://${process.env.AMQ_PORT_5672_TCP_ADDR}:${process.env.AMQ_PORT_5672_TCP_PORT}`, function(err, conn) {
  conn.createChannel(function(err, ch) {
    if(err) {
     return console.log(err);
    }
    var q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);

    ch.consume(q, function reply(msg) {
      var msgContent = msg.content.toString();
      console.log(" [.] recieve - -- - ((((((((((((((((((((((((((((((((((((((((((((((((((((((((((", msgContent);

      ch.sendToQueue(msg.properties.replyTo, new Buffer(msgContent), {
        correlationId: msg.properties.correlationId
      });

      ch.ack(msg);
    });
  });
});
