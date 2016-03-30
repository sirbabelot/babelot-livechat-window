class Messenger {

  constructor() {
    this.businessId = 'ExclusiveRentals.com';
    this.socket = io(`https://docker.default/${this.businessId}`,
        { path: '/babelot/socket.io' });
  }

  init() {
    this.socket.on('message from server', (msg)=> console.log(msg));

    this.socket.on('client.nowOnline', (msg) => {
      console.log(msg);
      this.roomId = msg.roomId;
      this.nickname = msg.nickname;
      localStorage.setItem('babelot-nickname', this.nickname);
      document.querySelector('#nickname').innerHTML = this.nickname;
    })

    this.socket.on('business.statusChanged', (data)=> {
      if (data.status === 'online') {
        document.querySelector('#status').style.background = "green";
      } else {
        document.querySelector('#status').style.background = "red";
      }
    });
    var fingerprint = localStorage.getItem('babelot-fingerprint');
    if (!fingerprint) {
      new Fingerprint2().get((result)=> {
        this.fingerprint = result;
        localStorage.setItem('babelot-fingerprint', result);
        console.log(this.fingerprint);
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
    this.socket.emit('client.startConversation', {
      businessId: this.businessId,
      clientInfo: {
        fingerprint: this.fingerprint,
        nickname: this.nickname
      }
    });
  }

  sendMessage(message) {
    this.socket.emit('direct message', {
      "nickname": this.nickname,
      "fingerprint": this.fingerprint,
      "roomId": this.roomId,
      message
    });
  }

  addReceiveMessageHandler(handler) {
     this.socket.on('direct message', (data)=> handler(data));
  }

}
