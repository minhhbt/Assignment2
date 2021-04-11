const PatientMessage = require('./PatientMessage.js');
const Doctor = require('./Doctor.js');
const unirest = require('unirest');
var API_KEY = "aad4d9f345mshbfe74e4d541f881p148a51jsn8535d35fade1";

var replyFunction = replyMessage;


var doctor = new Doctor();



var express = require('express');
var socket = require('socket.io'); // a socket brings in message from the client.
const { ConsoleConnector } = require('@nlpjs/console-connector');

// App setup
var app = express();
var server = app.listen(4000, function () {          // listens to a given port number
    console.log('listening to port # 4000');
});

// Static files: files/content provided by the Server to its Clients
// static files are usually stored within the public folder
app.use(express.static('public'));

// creating Server Socket
var serverSocket = socket(server);
var serverReply = null;
// setup event listener after connection to ther Server has been made
// the "on" method is like the "addEventListener" function for sockets.
serverSocket.on('connection', async function (socket) {

    console.log('Connection established...');
    // only one possible response for wines

    // let wineInfo=await findWineRecommendations();
    // doctor.setWineInfo(wineInfo);
    
    // respond to Client's message. We've named this event as "chat-message".
    socket.on('chat-message', onMessage);
});

function onMessage(data) {
    const setReply = async () => {

        let patientMessage = new PatientMessage(data.message);
        await doctor.setMessage(patientMessage);
        if (doctor.getIntent() == "user.food") {
            let recipeInfo = await findRecipe();
            doctor.setRecipeInfo(recipeInfo);

            let wineInfo=await findWineRecommendations();
            doctor.setWineInfo(wineInfo);

        }

        await replyFunction(doctor, serverSocket); //  get a reply message to send to the client
        // serverSocket.emit('chat-message', serverReply);
        console.log('Client message: ', data.message);
        console.log('Server reply: ', serverReply);
    }
    setReply();
}

// simple function to reply to Client's message
async function replyMessage(doctor, serverSocket) {

    serverReply = doctor.getReply();

    //TESTING NER
    var entities = doctor.messageNER;

    if (entities["LOCATION"] != null) {
        var location=entities["LOCATION"][0];
        serverReply.push("I have never been to " + location + ", have you?");
    }
    if (entities["PERSON"]!=null){
        var person=entities["PERSON"][0];
        serverReply.push("Ah, "+person+" is an interesting character... You know them?");
    }
    
    // if (serverReply.length==0 || serverReply[0]==""){
    //     serverReply.push(":)");
    // }

    const translate = require('@iamtraction/google-translate');

    for (var i = 0; i < serverReply.length; i++) {
        translate(serverReply[i], { to: 'fr' }).then(res => {
            serverReply[i] = res.text; 
            serverSocket.emit('chat-message', serverReply[i]);
        }).catch(err => {
            console.error(err);
           });
        console.log(serverReply[i]);
    }
    return serverReply;
}


//used for testing
exports.replyMessage = replyMessage;
//exports.server= server;
function handler() {
    server.close();
}
exports.handler = handler;


function findRecipe() {
    var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random");

    req.query({
        "number": "1",
        "tags": "meat"
    });

    req.headers({
        "x-rapidapi-key": "aad4d9f345mshbfe74e4d541f881p148a51jsn8535d35fade1",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });


    return new Promise((resolve, reject) => {
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            return resolve(res.body);

        });
    });
}

function findWineRecommendations() {
    var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing");


    req.query({
        "food": "steak",
        "maxPrice": "50"
    });

    req.headers({
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });


    return new Promise((resolve, reject) => {
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            return resolve(res.body);
        });
    });
}

