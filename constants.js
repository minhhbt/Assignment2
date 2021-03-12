// the trigger array triggers a response from the robot. The reply array is the resulting reply triggered. 
// each message from the client is edited to match the items in the trigger array.
// every sub-array at an index in the trigger array corresponds to the sub-array of possible replies in the reply array.
const triggerResponse = [
    // 0 Yes
    ["ok", "yes", "sure", "fine"],
    // 1 No
    ["no", "not really", "i do not", "i dont", "i don't", "cancel"],
    // 2 Choose time 1
    ["3", "thursday", "first"],
    // 3 Choose time 2
    ["10", "friday", "second"]

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
    ["Durings times of COVID, you can ease out the depression by sociazling every once in a while with family or friends via Facetime or chat. There are also online Discord servers or Slack groups with people who share a similar interest to keep you engaged with a community. Also make sure to do things that you enjoy doing like a sport or music hobby and sleep to stay fresh throughout the day. We can help you set up an appointment. Would you like to do that?"],
    //6
    ["It's normal to feel anxious during the pandemic and you might feel better by connecting with friends and family through Facetime or chat. Also, try to give relaxation techniques a go such as meditation or a 10 minutes of mindfulness at the end of the day. If you are experience a lot of physical anxiety, then we can help you set an appointment with a doctor, would you like to do that?"],
    //7
    ["I may not be able to understand exactly how you feel, but I care about you and our team really wants to help. You can reach out to us at 68-68-68. You might also want to set up an appointment with me. Would you like to do that?"],

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
    ["happy", "good", "well", "fantastic", "cool", "haha", "awesome", "dope", "fine", "so so","fair enough"],
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
    ["tired", "feeling down", "paranoid", "scary"],
    //11
    ["bad", "sucks", "terrible", "not well", "like shit"],
    //12
    ["time"],
    //13
    ["kill", "murder"],
    //14
    ["rude", "mean"],

    //15
    ["what do you do"],

    //16
    ["contact", "reach you", "email"],

    // HELP triggers
    //17
    ["ocd"],

    //18
    ["depression", "depressed"],

    //19
    ["anxiety", "anxious"],

    //20
    ["suicide", "suicidal"],
];

const replyGeneral = [
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
    //15
    ["I used to be a full time psychiatrist before my time in prison. By no means am I a nice person but I can do my best to give you advice."],
    //16
    ["You can reach me using the email hannibalglobal@gmail.com. I am available on chat 24/7 and our team can also be contacted via 338-671-003."],
];
const alternative = [
    "Go on...",
    "Try again",
    "I'm listening...",
    "Type again"
];

module.exports = Object.freeze({
    TRIGGER_GENERAL: triggerGeneral,
    REPLY_GENERAL: replyGeneral,
    ALTERNATIVE: alternative,
    TRIGGER_RESPONSE: triggerResponse,
    REPLY_DIALOGUE: replyDialogue
});

