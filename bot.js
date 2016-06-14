var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy/;  botRegexSalt = /^\/salt/; botRegexDB = /^\/dat boi/;
      botRegexRo = /^\/roll/;   botRegexFight = /^\/fight (\w+)\s(\w+)/;
      botRegexSh = /^\/shrug/; 
      
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  } 
  
  else if(request.text && botRegexFight.test(request.text)){
    
    var fighter1 = request.replace(botRegexFight, "$1");
    var fighter2 = request.replace(botRegexFight, "$2");
    
    this.res.writeHead(200);
    postMessage(fighter1);
    this.res.end();
    
  }
  
  else if(request.text && botRegexDB.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/960x472.jpeg.383d81fbfe004052bb0dbc9bc9d76e00");
    this.res.end();
  } 
  
  else if(request.text && botRegexSalt.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.imgur.com/B5BSVqH.png");
    this.res.end();
  } 
  
  else if(request.text && botRegexRo.test(request.text)) {
    this.res.writeHead(200);
    var Randint = Math.floor(Math.random() * 100) + 1;
    var strRandint = "" + Randint + " percent";
    postMessage(strRandint);
    this.res.end();
  }

  else if(request.text && botRegexSh.test(request.text)) {
    this.res.writeHead(200);
    postMessage("¯\\_(ツ)_/¯");
    this.res.end();
  } 
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
