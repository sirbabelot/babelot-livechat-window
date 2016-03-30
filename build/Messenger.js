'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Messenger = function () {
  function Messenger() {
    _classCallCheck(this, Messenger);

    this.businessId = 'ExclusiveRentals.com';
    this.socket = io('https://docker.default/' + this.businessId, { path: '/babelot/socket.io' });
  }

  _createClass(Messenger, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.socket.on('message from server', function (msg) {
        return console.log(msg);
      });

      this.socket.on('client.nowOnline', function (msg) {
        console.log(msg);
        _this.roomId = msg.roomId;
        _this.nickname = msg.nickname;
        localStorage.setItem('babelot-nickname', _this.nickname);
        document.querySelector('#nickname').innerHTML = _this.nickname;
      });

      this.socket.on('business.statusChanged', function (data) {
        if (data.status === 'online') {
          document.querySelector('#status').style.background = "green";
        } else {
          document.querySelector('#status').style.background = "red";
        }
      });
      var fingerprint = localStorage.getItem('babelot-fingerprint');
      if (!fingerprint) {
        new Fingerprint2().get(function (result) {
          _this.fingerprint = result;
          localStorage.setItem('babelot-fingerprint', result);
          console.log(_this.fingerprint);
          _this.startConversation();
        });
      } else {
        this.fingerprint = fingerprint;
        this.startConversation();
      }
    }
  }, {
    key: 'startConversation',
    value: function startConversation() {
      var nickname = localStorage.getItem('babelot-nickname');
      if (nickname) {
        this.nickname = nickname;
      }
      this.socket.emit('client.startConversation', {
        businessId: this.businessId,
        clientInfo: {
          fingerprint: this.fingerprint,
          nickname: this.nickname
        }
      });
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(message) {
      this.socket.emit('direct message', {
        "nickname": this.nickname,
        "fingerprint": this.fingerprint,
        "roomId": this.roomId,
        message: message
      });
    }
  }, {
    key: 'addReceiveMessageHandler',
    value: function addReceiveMessageHandler(handler) {
      this.socket.on('direct message', function (data) {
        return handler(data);
      });
    }
  }]);

  return Messenger;
}();