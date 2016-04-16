var messenger = require('./Messenger.js');
var messagePanel = document.getElementById('babelot-messages');
var input = document.querySelector('#babelot-input');
var messageListElement = document.getElementById('babelot-messages-list');

document.getElementById('babelot-input-form').addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(input);
    var msgText = input.value;
    var chatBubbleTemplate = "<div class='babelot-chat-bubble sentByMe'><div class='content'>" + msgText + "</div></div>"
    input.value = "";
    var div = document.createElement('div');
    div.innerHTML = chatBubbleTemplate;
    var elements = div.childNodes;
    messageListElement.appendChild(elements[0]);

    messenger.sendMessage(msgText);
});

document.getElementById('minButton').addEventListener('click', function() {
    messagePanel.classList.toggle('babelot-messages-hidden');
});

document.addEventListener(messenger.EVENTS.client.nowOnline, function (e) {
  document.querySelector('#nickname').innerHTML = e.detail.nickname;
}, false);

document.addEventListener(messenger.EVENTS.business.statusChanged, function (e) {
  if (e.detail.status === 'online') {
    document.querySelector('#status').style.background = "green";
  } else {
    document.querySelector('#status').style.background = "red";
  }
}, false);

document.addEventListener(messenger.EVENTS.directMessage, function (e) {
  document.querySelector('#babelot-messages-list')
      .innerHTML +=`<div style="background:#B8D879">them: ${e.detail.message}</div>`
}, false);

