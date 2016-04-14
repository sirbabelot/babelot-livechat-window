var io = require('socket.io-client');
var Fingerprint2 = require('fingerprintjs2');


/**
 * Messenger receives and dispatches messages from sockets
 * An event is emitted when a message is received.
 */
class Messenger {

  constructor() {
    this.businessId = babelotBusinessId;
    this.socket = io(`https://docker.default/${this.businessId}`,
        { path: '/babelot/socket.io' });

    this.EVENTS = {
      directMessage: 'direct message',
      client: {
        nowOnline: 'client.nowOnline',
        startConversation: 'client.startConversation'
      },
      business: { statusChanged: 'business.statusChanged' }
    }
  }

  init() {

    this.socket.on(this.EVENTS.directMessage, (data)=> {
      var event = new CustomEvent(this.EVENTS.directMessage, {
        detail: data
      });
      document.dispatchEvent(event);
    });

    this.socket.on(this.EVENTS.client.nowOnline, (msg) => {
      this.roomId = msg.roomId;
      this.nickname = msg.nickname;
      localStorage.setItem('babelot-nickname', this.nickname);
      var event = new CustomEvent(this.EVENTS.client.nowOnline, {
        detail: { nickname: msg.nickname }
      });
      document.dispatchEvent(event);
    });

    this.socket.on(this.EVENTS.business.statusChanged, (data)=> {
      var event = new CustomEvent(this.EVENTS.business.statusChanged, {
        detail: { status: data.status }
      });
      document.dispatchEvent(event);
    });
    var fingerprint = localStorage.getItem('babelot-fingerprint');
    if (!fingerprint) {
      new Fingerprint2().get((result)=> {
        this.fingerprint = result;
        localStorage.setItem('babelot-fingerprint', result);
        this.startConversation();
      });
    } else {
      this.fingerprint = fingerprint;
      this.startConversation();
    }

  }

  startConversation() {
    let nickname = localStorage.getItem('babelot-nickname');
    if (nickname) { this.nickname = nickname; }
    this.socket.emit(this.EVENTS.client.startConversation, {
      businessId: this.businessId,
      clientInfo: {
        fingerprint: this.fingerprint,
        nickname: this.nickname
      }
    });
  }

  sendMessage(message) {
    this.socket.emit(this.EVENTS.directMessage, {
      "nickname": this.nickname,
      "fingerprint": this.fingerprint,
      "roomId": this.roomId,
      message
    });
  }

  addReceiveMessageHandler(handler) {
     this.socket.on(this.EVENTS.directMessage, (data)=> handler(data));
  }

}

module.exports = new Messenger();
