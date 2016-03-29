(function(Babelot) {

  var input = document.querySelector('#babelot-input');
  var messageListElement = document.getElementById('babelot-messages-list');
  var messagePanel = document.getElementById('babelot-messages');

  Babelot.toggleMessages = function() {
    messagePanel.classList.toggle('babelot-messages-hidden');
  };

  Babelot.addMessage = function(event) {

    if (event.keyCode === 13) {

      var msgText = input.value;
      var chatBubbleTemplate = "<div class='babelot-chat-bubble'><div class='content'>" + msgText + "</div></div>"

      var div = document.createElement('div');
      div.innerHTML = chatBubbleTemplate;
      var elements = div.childNodes;

      messageListElement.appendChild(elements[0]);
    }
  };

})(window.Babelot = window.Babelot || {});