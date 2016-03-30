'use strict';

(function (Babelot) {

  var messenger = new Messenger();
  messenger.init();
  var input = document.querySelector('#babelot-input');
  var messageListElement = document.getElementById('babelot-messages-list');
  var messagePanel = document.getElementById('babelot-messages');

  messenger.addReceiveMessageHandler(function (data) {
    var chatBubbleTemplate = '<div class=\'babelot-chat-bubble\'><div class=\'content\'> ' + data.message + ' </div></div>';
    console.log(chatBubbleTemplate);
    var div = document.createElement('div');
    div.innerHTML = chatBubbleTemplate;
    var elements = div.childNodes;
    messageListElement.appendChild(elements[0]);
  });

  Babelot.toggleMessages = function () {
    messagePanel.classList.toggle('babelot-messages-hidden');
  };
  Babelot.addMessage = function (event) {
    if (event.keyCode === 13) {

      var msgText = input.value;
      var chatBubbleTemplate = "<div class='babelot-chat-bubble sentByMe'><div class='content'>" + msgText + "</div></div>";
      input.value = "";
      var div = document.createElement('div');
      div.innerHTML = chatBubbleTemplate;
      var elements = div.childNodes;
      messageListElement.appendChild(elements[0]);

      messenger.sendMessage(msgText);
    }
  };
})(window.Babelot = window.Babelot || {});