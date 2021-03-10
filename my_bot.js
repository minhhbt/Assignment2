const Discord = require('discord.js');
const client = new Discord.Client();
var waitForResponse = false;
var responseNum;
var promptNum = -1;

// the trigger array triggers a response from the robot. The reply array is the resulting reply triggered. 
// each message from the client is edited to match the items in the trigger array.
// every sub-array at an index in the trigger array corresponds to the sub-array of possible replies in the reply array.
/* For eg.: the first sub-array (index = 0) of trigger array would trigger/result in response 
   from the first (index = 0) sub-array from the reply array. */

const triggerResponse = [
  // 0 Yes
  ["ok", "yes", "sure", "fine"],
  // 1 No
  ["no", "not really"]

];
const replyDialogue = [
  //0
  ["https://www.helpguide.org/articles/anxiety/obssessive-compulsive-disorder-ocd.htm"],

  //1
  ["https://www.helpguide.org/articles/depression/coping-with-depression.htm"],

  //2
  ["https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm"],

  //3
  ["https://www.helpguide.org/articles/suicide-prevention/suicide-prevention.htm"],

  // SUMMARIES
  //4
  ["Symptoms of OCD are obsessive thoughts on order, symmetry and repeatedly checking or cleaning things. A method to deal with this is to identify your triggers and anticipate them before they arrive to ease them. You can also challenge these thoughts and see if the consequences are that bad at all even if you don't follow it."],
  //5
  ["Durings times of COVID, you can ease out the depression by sociazling every once in a while with family or friends via Facetime or chat. There are also online Discord servers or Slack groups with people who share a similar interest to keep you engaged with a community. Also make sure to do things that you enjoy doing like a sport or music hobby and sleep to stay fresh throughout the day."],
  //6
  ["It's normal to feel anxious during the pandemic and you might feel better by connecting with friends and family through Facetime or chat. Also, try to give relaxation techniques a go such as meditation or a 10 minutes of mindfulness at the end of the day. If you are experience a lot of physical anxiety, then we can help you set an appointment with a doctor, would you like to do that?"],
  //7
  ["I may not be able to understand exactly how you feel, but I care about you and our team really wants to help. You can reach out to us at 68-68-68."],
  
  //PROMPTS
  //8
  ["I am sorry you feel that way, would you like some resources to assist you?", "I am sorry you feel that way, would you like to talk about it?"],

];
const triggerGeneral = [
  //0 Greeting 
  ["hi", "hey", "hello", "good morning", "good evening", "good afternoon", "hey there"],
  //1 
  ["how are you", "how are things", "how's life"],
  //2
  ["what is going on", "what is up", "what's up"],
  //3
  ["happy", "good", "well", "fantastic", "cool", "haha", "awesome", "dope", "fine", "so so"],
  //4 Negative
  ["bad", "bored", "tired", "sad", "bad", "sucks", "terrible", "not well", "like shit", "disaster"],
  //5
  ["tell me story", "tell me joke",],
  //6
  ["thanks", "thank you", "appreciate it"],
  //7
  ["bye", "good bye", "goodbye"],

  //start of hannibal lecter theme
  //8
  ["who are you", "your name"],
  //9
  ["appointment"],
  //10
  ["tired", "feeling down", "paranoid"],
  //11
  ["bad", "sucks", "terrible", "not well", "like shit"],
  //12
  ["time"],
  //13
  ["kill", "murder"],
  //14
  ["rude", "mean"],

  // HELP triggers
  //15
  ["OCD"],

  //16
  ["depression", "depressed"],

  //17
  ["anxiety", "anxious"],

  //18
  ["suicide", "suicidal"],
];

const reply = [
  //0 
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  //1
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
    "Good, how about you?"
  ],
  //2
  [
    "Nothing much",
    "Exciting things!",
    "Wonderful things are coming...Wonderful!"
  ],
  //3
  ["Glad to hear it", "That's great to hear"],
  //4
  ["Why?", "What's the matter?", "Minor setbacks before a major comeback", "Sometimes, life gives you lemons..."],
  //5
  ["A pig without 3.14 is 9.8",
    "What did the ghost say to the other ghost?...Do you believe in people?",
    "Why did the nurse take a red pen to work?...In case she needed to draw blood",
    "What do you call a psychic little person who has escaped the prison?...A smalle medium at large"
  ],
  //6
  ["You're welcome", "No problem", "Don't mention it", "Glad I could help", "It's my pleasure"],

  //7
  ["Goodbye", "See you later", "See you around"],

  // Hannibal theme
  //8
  ["I am Dr.Hannibal Lecter. How can I help you today?"],
  //9
  ["I have some free time right now, what should we talk about?"],
  //10
  ["I am sorry you feel that way."],
  //11
  ["Would you like to provide some more detail so I can assist you?"],
  //12- quote
  ["I Do Wish We Could Chat Longer, But I'm Having An Old Friend For Dinner."],
  //13- quote
  ["Killing Must Feel Good To God, Too. He Does It All The Time."],
  //14- quote
  ["Whenever Feasible, One Should Always Try To Eat The Rude."],
];



// array used in case a match isn't found in the trigger array.
const alternative = [
  "Go on...",
  "Try again",
  "I'm listening...",
  "Type again"
];

client.on('ready', () => {
  client.guilds.cache.forEach((guild) => {
    console.log(" - " + guild.name);

    // List all channels
    guild.channels.cache.forEach((channel) => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
    })
  })
  //var generalChannel = client.channels.cache.get("812168245129773070") // Replace with known channel ID
  //generalChannel.send("I am a functioning bot!");

  client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
      return;
    }
    receivedMessage.channel.send(output(receivedMessage.content));
  })
});

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "ODEyMTY4NjAwNjg0MDY4OTQ0.YC808w.d6ub-4-tm98RqnNYIR1GFgSwSGI"


client.login(bot_secret_token);

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
      case 0:
        if (containsAny(text, triggerResponse[0])) { // If yes, send one of the links for the corresponding trigger word (OCD, anxiety, depression,etc.)
          items = replyDialogue[responseNum];
          item = items[0];
          waitForResponse = false;
          return item;
        } else { // If not, print the "Would you like to talk about it?" response
          items = replyDialogue[8];
          item = items[1];
          promptNum = 1
          return item;
        }
      case 1:
        if (containsAny(text, triggerResponse[0])) { // If yes, send the summary about the issue
          item = replyDialogue[responseNum+4][0];
          waitForResponse = false;
          return item;
        } else { // If not, print the "Would you like to set up an appointment" response
          // items = replyArray[14];
          //TODO Appointment setup
          item = "Would you like to set an appointment?";
          promptNum = 2;
          return item;
        }
      case 2:
        if (containsAny(text, triggerArray[19])) { // If yes, send prompt for setting up the appointment
          // items = replyArray[responseNum];
          //TODO Appointment time confirmation
          item = "Ok,what time?";
          waitForResponse = false;
          return item;
        } else { // If not, print the "Would you like to talk about it?" response
          //TODO Figure out further dialogue
          return item;
        }
    }
  }
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (text.includes(triggerArray[x][y])) {
        if (x >= 15 && x <= 18) { //Check if text has trigger words for OCD, anxiety,depression
          responseNum = x-15; // Record which of the trigger words it is
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
  let temp = compare(triggerGeneral, reply, text);
  if (temp) {
    product = temp;
  } else if (text.match(/robot/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  return product;
}

