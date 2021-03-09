const Discord = require('discord.js');
const client = new Discord.Client();

// the trigger array triggers a response from the robot. The reply array is the resulting reply triggered. 
// each message from the client is edited to match the items in the trigger array.
// every sub-array at an index in the trigger array corresponds to the sub-array of possible replies in the reply array.
/* For eg.: the first sub-array (index = 0) of trigger array would trigger/result in response 
   from the first (index = 0) sub-array from the reply array. */

const trigger = [
    //0 Greeting 
    ["hi", "hey", "hello","good morning","good evening", "good afternoon","hey there"],
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

    //8
    ["OCD"],

    //9
    ["depression"],

    //10
    ["anxiety"],

    //11
    ["suicide"],
    
    //start of hannibal lecter theme
    //h1
    ["hi", "hello"],
    //h2
    ["appointment"],
    //h3
    ["OCD", "depression", "anxiety", "suicide", "tired", "feeling down", "paranoid"]
    //h4
    ["bad", "sucks", "terrible", "not well", "like shit"]
    //h5
    ["time"],
    //h6 - is this too dark?
    ["kill", "murder"]
    //h7
    ["rude", "mean"]
    
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
    ["Why?", "Cheer up buddy", "What's the matter?", "Minor setbacks before a major comeback", "Sometimes, life gives you lemons..."],
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

    //8
    ["https://www.helpguide.org/articles/anxiety/obssessive-compulsive-disorder-ocd.htm"],

    //9
    ["https://www.helpguide.org/articles/depression/coping-with-depression.htm"],

    //10
    ["https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm"],

    //11
    ["https://www.helpguide.org/articles/suicide-prevention/suicide-prevention.htm"],
    
    //h1
    ["Hi there, I am Dr.Hannibal Lecter. How can I help you today?"],
    //h2
    ["I have some free time right now, what should we talk about?"],
    //h3
    ["I am sorry you feel that way, would you like some resources to assist you?", "I am sorry you feel that way, would you like to talk about it?"],
    //h4
    ["Would you like to provide some more detail so I can assist you?"]
    //h5- quote
    ["I Do Wish We Could Chat Longer, But I'm Having An Old Friend For Dinner."],
     //h6- quote
     ["Killing Must Feel Good To God, Too. He Does It All The Time."],
     //h7- quote
     ["Whenever Feasible, One Should Always Try To Eat The Rude."]
     
    
      
];

// array used in case a match isn't found in the trigger array.
const alternative = [
      "Same",
      "Go on...",
      "Try again",
      "I'm listening...",
      "Type again",
      "Come again, would ya?"
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
bot_secret_token = "ODEyMTY4NjAwNjg0MDY4OTQ0.YC808w.zgRv4uEZdrEXWQDwvw3DJ8zABhs";

client.login(bot_secret_token);


function compare(triggerArray, replyArray, text) {
    let item = "";
    for (let x = 0; x < triggerArray.length; x++) {
      for (let y = 0; y < replyArray.length; y++) {
        if (text.includes(triggerArray[x][y])) {
          items = replyArray[x];                  // returns an array of possible replies
          item = item + " " + items[Math.floor(Math.random() * items.length)];   // generates a random reply from the array
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
  
    if (compare(trigger, reply, text)) {
      product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
      product = robot[Math.floor(Math.random() * robot.length)];
    } else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    return product;
  }
