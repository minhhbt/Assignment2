const translate = require('@iamtraction/google-translate');

// SAMPLE CODE
translate('You are terrible!', { to: 'fr' }).then(res => {
    console.log(res.text); // OUTPUT: You are amazing!
  }).catch(err => {
    console.error(err);
  });

// TRANSLATE USER INPUTS
translate(data.message, { to: 'en' }).then(res => {
  data.message = res.text; 
  console.log("Translated input: " + data.message);
  }).catch(err => {
  console.error(err);
  }); 

// TRANSLATE SERVER REPLIES
  translate(serverReply[i], { to: 'fr' }).then(res => {
    serverReply[i] = res.text; 
    serverSocket.emit('chat-message', serverReply[i]);
    console.log("Translated reply: " + serverReply[i]);
}).catch(err => {
    console.error(err);
   }); 


