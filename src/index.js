var chindowHtml = require('raw!html-minify!./template.html');
var messenger = require('./Messenger.js');
var styles = require('css?minimize!./styles.css');

var div = document.createElement('div');
div.innerHTML = chindowHtml;
document.body.appendChild(div);

var styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.body.appendChild(styleTag);

messenger.init();
require('./eventHandler.js');
