// Function to check if string contains any of the elements
const containsAny = require('./containsAny.js');
module.exports = function compare(triggerArray, replyArray, triggerResponse, replyDialogue, alternative, text, promptObj) {
    let item = "";
    var responseNum = promptObj.responseNum;
    var promptNum = promptObj.promptNum;
    var waitForResponse = promptObj.waitForResponse;
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
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                } else { // If not, print the "Would you like to talk about it?" response
                    items = replyDialogue[8];
                    item = items[1];
                    promptNum = 1
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                }
            case 1:// WOULD YOU LIKE TO TALK ABOUT IT
                if (containsAny(text, triggerResponse[0])) { // If yes, send the summary about the issue
                    item = replyDialogue[responseNum + 4][0];
                    promptNum = 2;
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                } else if (containsAny(text, triggerResponse[1])) { // If not, print the "Would you like to set up an appointment" response
                    item = "Would you like to set an appointment?";
                    promptNum = 2;
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                } else {
                    waitForResponse = false;
                    promptNum = -1;
                    item = alternative[Math.floor(Math.random() * alternative.length)]; // returns random responce
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                }
            case 2: // ASKING ABOUT APPOINTMENT
                if (containsAny(text, triggerResponse[0])) { // If yes, send prompt choosing time slot for the appointment
                    item = "We have 2 time slots abvailable for this week:\n3:00 pm on Thursday or 10:00 am on Friday\nWhich one would suit you?";
                    promptNum = 3;
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                } else if (containsAny(text, triggerResponse[1])) {
                    item = "Ok, how else can I help you?"
                    waitForResponse = false;
                    promptNum = -1;
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                } else {
                    waitForResponse = false;
                    promptNum = -1;
                    item = alternative[Math.floor(Math.random() * alternative.length)]; // returns random responce
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
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
                    promptObj.responseNum = responseNum;
                    promptObj.promptNum = promptNum;
                    promptObj.waitForResponse = waitForResponse;
                    return item;
                } else {
                    item = alternative[Math.floor(Math.random() * alternative.length)]; // returns random responce
                    return item;
                }
                item = "Ok, I will see you on " + s;
                waitForResponse = false;
                promptNum = -1;
                promptObj.responseNum = responseNum;
                promptObj.promptNum = promptNum;
                promptObj.waitForResponse = waitForResponse;
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
    promptObj.responseNum = responseNum;
    promptObj.promptNum = promptNum;
    promptObj.waitForResponse = waitForResponse;
    return item;
}