
require('dotenv').config(); //Add environment variables

// const fetch = require('node-fetch'); //For fetch function to work
const Discord = require('discord.js');
const client = new Discord.Client();

const getGif = require('./functions/getGif.js');

var waitForResponse = false;
var sendGif = true;
var responseNum;
var promptNum = -1;

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
function compare(triggerArray, replyArray, text) {
  let item = "";
  // Check if we are waiting for a response
  if (waitForResponse) {
    switch (promptNum) {
      case 0: // WOULD YOU LIKE HELP RESOURCES
        if (containsAny(text, triggerResponse[0])) { // If yes, send one of the links for the corresponding trigger word (OCD, anxiety, depression,etc.)
          items = replyDialogue[responseNum];
          item = items[0];
          waitForResponse = false;
          sendGif = false;
          promptNum = -1;
          return item;
        } else { // If not, print the "Would you like to talk about it?" response
          items = replyDialogue[8];
          item = items[1];
          promptNum = 1
          return item;
        }
      case 1:// WOULD YOU LIKE TO TALK ABOUT IT
        if (containsAny(text, triggerResponse[0])) { // If yes, send the summary about the issue
          item = replyDialogue[responseNum + 4][0];
          promptNum = 2;
          return item;
        } else if (containsAny(text, triggerResponse[1])) { // If not, print the "Would you like to set up an appointment" response
          item = "Would you like to set an appointment?";
          promptNum = 2;
          return item;
        } else {
          waitForResponse = false;
          promptNum = -1;
          item = alternative[Math.floor(Math.random() * alternative.length)]; // returns random responce
          return item;
        }
      case 2: // ASKING ABOUT APPOINTMENT
        if (containsAny(text, triggerResponse[0])) { // If yes, send prompt choosing time slot for the appointment
          item = "We have 2 time slots abvailable for this week:\n3:00 pm on Thursday or 10:00 am on Friday\nWhich one would suit you?";
          promptNum = 3;
          return item;
        } else if (containsAny(text, triggerResponse[1])) {
          item = "Ok, how else can I help you?"
          waitForResponse = false;
          promptNum = -1;
          return item;
        } else {
          waitForResponse = false;
          promptNum = -1;
          item = alternative[Math.floor(Math.random() * alternative.length)]; // returns random responce
          return item;
        }
      case 3:
        let s = "";
        if (containsAny(text, triggerResponse[2])) {
          s = "Thursday, 3:00 pm";
        } else if (containsAny(text, triggerResponse[3])) {
          s = "Friday, 10:00 am";
        } else if (containsAny(text, triggerResponse[1])) {
          waitForResponse = false;
          promptNum = -1;
          item = "Ok, how else can I help you?";
          return item;
        } else {
          item = alternative[Math.floor(Math.random() * alternative.length)]; // returns random responce
          return item;
        }
        item = "Ok, I will see you on " + s;
        waitForResponse = false;
        promptNum = -1;
        return item;
    }
  }

  sendGif = true;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (text.includes(triggerArray[x][y])) {
        if (x >= 17 && x <= 20) { //Check if text has trigger words for OCD, anxiety,depression
          responseNum = x - 17; // Record which of the trigger words it is
          items = replyDialogue[8];
          item = item + " " + items[0]; // Send the prompt ("Would you like more resources?")
          waitForResponse = true; // Wait for response
          promptNum = 0;
        } else {
          items = replyArray[x];                  // returns an array of possible replies
          item = item + " " + items[Math.floor(Math.random() * items.length)];   // generates a random reply from the array
        }
      }
    }
  }
  return item;
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
  let temp = compare(triggerGeneral, replyGeneral, text);
  if (temp) {
    product = temp;
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  return product;
}


