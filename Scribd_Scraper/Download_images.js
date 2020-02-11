const fs = require('fs');
const request = require('request');
const urls = require('./urls.js');

const r = /[0-9]+\-[0-9A-z]+/;

//console.log(urls);

let c = 0;

setInterval(function(){
    let url = urls[c]
    download(url, c+'.jpg', function(){
       console.log('done '+c);
    });
    c++;
}, 500);

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };