
require('dotenv').config(); //Add environment variables

// const fetch = require('node-fetch'); //For fetch function to work
const Discord = require('discord.js');
const client = new Discord.Client();

const getGif = require('./functions/getGif.js');
const compare = require('./functions/compare.js');

var waitForResponse = false;
var sendGif = true;
var promptObj={responseNum: -1 ,promptNum: -1,waitForResponse: false};
var responseNum=promptObj.responseNum;
var promptNum=promptObj.promptNum;

var constants = require('./constants.js');
const triggerResponse=constants.TRIGGER_RESPONSE;
const replyDialogue=constants.REPLY_DIALOGUE;
const triggerGeneral=constants.TRIGGER_GENERAL;
const replyGeneral=constants.REPLY_GENERAL;
const alternative=constants.ALTERNATIVE;
// the trigger array triggers a response from the robot. The reply array is the resulting reply triggered. 
// each message from the client is edited to match the items in the trigger array.
// every sub-array at an index in the trigger array corresponds to the sub-array of possible replies in the reply array.

client.on('ready', () => {
  client.guilds.cache.forEach((guild) => {
    console.log(" - " + guild.name);

    // List all channels
    guild.channels.cache.forEach((channel) => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
    })
  })
  // MESSAGES ON START
  var generalChannel = client.channels.cache.get("812168245129773070") // Replace with known channel ID
  generalChannel.send("Dear user, we might have created the creepiest bot in the history of discord. Believe us, we are equally shocked. Enjoy!");
  generalChannel.send("Wondering who Dr. Lecter is?");
  generalChannel.send("Dr. Hannibal Lecter is a character created by novelist Thomas Harris. Lecter is a serial killer who eats his victims. Before his capture, he was a respected forensic psychiatrist; after his incarceration, he is consulted by FBI agents Clarice Starling and Will Graham to help them find other serial killers.");
  generalChannel.send("https://hannibal.fandom.com/wiki/Hannibal_Lecter");
  generalChannel.send("Today you have a chance to attend Dr. Lecter's therapy session.");
  generalChannel.send("!REMEMBER!\nThis bot is NOT a real psychiatrist. Do NOT follow his advice!");
  generalChannel.send("Start by typing Hello!");

  client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
      return;
    }
    var outputMessage = output(receivedMessage.content);
    receivedMessage.channel.send(outputMessage);
    if (!waitForResponse && sendGif) {
      getGif(receivedMessage, "hannibal");
    }
  })
});

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"


client.login(process.env.BOTTOKEN);

// Function to check if string contains any of the elements
function containsAny(str, substrings) {
  for (var i = 0; i != substrings.length; i++) {
    var substring = substrings[i];
    if (str.indexOf(substring) != - 1) {
      return true;
    }
  }
  return false;
}

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text                   // function-chaining to convert the text to match items in the "trigger" array
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  //compare arrays
  //then search keyword
  //then random alternative
  let temp = compare(triggerGeneral, replyGeneral,triggerResponse,replyDialogue,alternative, text,promptObj);
  responseNum = promptObj.responseNum;
  promptNum = promptObj.promptNum;
   waitForResponse=promptObj.waitForResponse;
  if (temp) {
    product = temp;
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  return product;
}


