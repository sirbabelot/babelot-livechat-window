var amqp = require('amqplib/callback_api');
var scripter = require('./gulpfile');

amqp.connect(`amqp://${process.env.AMQ_PORT_5672_TCP_ADDR}:${process.env.AMQ_PORT_5672_TCP_PORT}`, function(err, conn) {
  conn.createChannel(function(err, ch) {
    if(err) { return console.log(err); }
    var q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);

    ch.consume(q, function reply(msg) {
      var msgContent = msg.content.toString();

      scripter(msgContent, (file)=>{
        ch.sendToQueue(msg.properties.replyTo, new Buffer(file), {
          correlationId: msg.properties.correlationId
        });
      });

      ch.ack(msg);
    });
  });
});
