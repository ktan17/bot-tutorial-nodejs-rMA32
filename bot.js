var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy/;  botRegexSalt = /^\/salt/; botRegexDB = /^\/dat boi/;   botRegexCalm = /^\/calmdown/;   botRegexGoogle = /^\/g\s/;
      botRegexRo = /^\/roll/;   botRegexFight = /^\/fight\s(\w+)\s(\w+)\b/;   botRegexThot = /^\/thot/;   botRegexShan = /^\/shaneli/;
      botRegexSh = /^\/shrug/;    botRegexDecide = /^\/decide/;   botRegexUSC = /^\/USC/;   botRegexNoot = /^\/noot/; botRegexSex = /^\/sex\s(\w+)\s(\w+)\b/;
      
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  } 
  
  else if(request.text && botRegexGoogle.test(request.text)){
    
    var message = "" + request.text;
    var query = message.substring(3);
    var RegexDummy = /\s/g;
    var google = "www.google.com/search?q=" + query.replace(RegexDummy,'+');
    
    this.res.writeHead(200);
    postMessage(google);
    this.res.end();
  }
  
  else if(request.text && botRegexNoot.test(request.text)){
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/350x263.gif.0b1d452b65ea4bb1b58253f36018e087");
    this.res.end();
  }
  
  else if(request.text && botRegexSex.test(request.text)){
    
    var sexdecider = Math.random();
    var sexmsg = "" + request.text;
    var sexer1 = sexmsg.replace(botRegexSex, "$1");
    var sexer2 = sexmsg.replace(botRegexSex, "$2");
    
    var sexmessage1 = "Top: " + sexer1 + ", Bottom: " + sexer2;
    var sexmessage2 = "Top: " + sexer2 + ", Bottom: " + sexer1;
    
    this.res.writeHead(200);
    
    if (sexdecider < 0.5) {
    
    postMessage(sexmessage1);
    
    }
    
    else {
    
    postMessage(sexmessage2);
    
    }
    
    this.res.end();
  }
  
  else if(request.text && botRegexNoot.test(request.text)){
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/350x263.gif.0b1d452b65ea4bb1b58253f36018e087");
    this.res.end();
  }
  
  else if(request.text && botRegexShan.test(request.text)){
    this.res.writeHead(200);
    postMessage("THAT'S MY WIFE BACK OFF");
    this.res.end();
  }
  
  else if(request.text && botRegexUSC.test(request.text)){
    this.res.writeHead(200);
    postMessage("FUCK SC");
    this.res.end();
  }
  
  else if(request.text && botRegexDecide.test(request.text)){
    
    var decider = Math.random();
    
    this.res.writeHead(200);
    
    if (decider < 0.5) {
    
    postMessage("Yes.");
    
    }
    
    else {
    
    postMessage("No.");
    
    }
    
    this.res.end();
    
  }
  
  else if(request.text && botRegexFight.test(request.text)){
    
    var msg = "" + request.text;
    var fighter1 = msg.replace(botRegexFight, "$1");
    var fighter2 = msg.replace(botRegexFight, "$2");
    
    this.res.writeHead(200);
    
    var fightDeterminant = Math.random();

    if (0 <= fightDeterminant < 0.1) {
      
      postMessage("Neither would win; they would tie");
      
    }
    
    else if (0.1 <= fightDeterminant < 0.325) {
      
      postMessage(fighter1 + " would barely win");
      
    }
    
    else if (0.325 <= fightDeterminant < 0.55) {
      
      postMessage(fighter1 + " would DESTROY " + fighter2);
      
    }
    
    else if (0.55 <= fightDeterminant < 0.775) {
      
      postMessage(fighter2 + " would barely win");
      
    }
    
    else if (0.775 <= fightDeterminant){
      
      postMessage(fighter2 + " would DESTROY " + fighter1);
      
    }
  
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
