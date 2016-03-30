window.messenger = new Messenger();
messenger.init();

function sendGibberish() {
  let message = 'gibbrish';
  document.querySelector('#messages').innerHTML += `<div style="background:#AEBAE6; display:block">me: ${message} </div>`
  messenger.sendMessage(message);
}


function wipeCreds() {
  localStorage.removeItem('babelot-nickname');
  console.log(localStorage.getItem('babelot-nickname'));
}

messenger.addReceiveMessageHandler((data)=> {
  console.log(data);
  document.querySelector('#messages').innerHTML +=`<div style="background:#B8D879">them: ${data.message}</div>`
})
