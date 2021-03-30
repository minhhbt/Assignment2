// A class to process client message
const PatientMessage = require('./PatientMessage.js');


module.exports = class Doctor {

    patientMessage;
    messageSummary;
    messageNER;
    issue;
    appointment;
    serverReply;
    recipeInfo;
    wineInfo;

    //DATA FLOW VARIABLES
    inProgress = false;
    awaitReplyResources = false;
    awaitReplyAppointment = false;
    awaitReview = false;
    awaitReplyRecipe = false;
    awaitReplyWine = false;



    mentalIssues = ["user.depression", "user.anxiety", "user.cannotsleep"];
    constructor() {
    }

    async setMessage(patientMessage) {
        this.patientMessage = patientMessage;
        await this.setMessageAttributes();
    }

    setRecipeInfo(recipeInfo) {
        this.recipeInfo = recipeInfo.recipes[0];
    }
    setWineInfo(wineInfo) {
        this.wineInfo = wineInfo;
        console.log(this.wineInfo);
    }


    async setMessageAttributes() {
        this.messageSummary = await this.patientMessage.getSummary();
        this.messageNER = await this.patientMessage.getNER();
    }

    //Function checks if the user is asking for help with mental issues

    getIssue() {
        let intent = this.getIntent();
        if (this.mentalIssues.includes(intent)) {

            var mentalIssuesData = require('./data/mentalIssuesData.json').data;
            var issue = mentalIssuesData.find(el => el.name === intent)
            console.log(issue);

            return issue;
        } else {
            return null
        }
    }



    // Function gets reply based on the corpus file from existing response
    getReply() {
        this.serverReply = new Array();

        //DEBUGGGING
        console.log(this.messageSummary);
        console.log(this.messageNER);

        if (!this.inProgress) { //If no meaningful conversation has been started
            if (this.messageSummary != null) {
                this.issue = this.getIssue();
                if (this.issue != null) {
                    this.inProgress = true;
                    this.awaitReplyResources = true;
                    this.serverReply.push(this.issue.summary);
                    this.serverReply.push("Would you like some more resources to help you cope?");

                } else if (this.getIntent() == "user.food") {
                    this.inProgress = true;
                    this.awaitReplyRecipe = true;
                    this.serverReply.push("Are you hungry?");
                } else if (this.getIntent() == "user.wine") {
                    this.serverReply.push(this.messageSummary['answer']);
                    this.inProgress = true;
                    this.awaitReplyWine = true;
                } else {
                    this.serverReply.push(this.messageSummary['answer']);
                }

            } else {
                console.lot("Message attributes have not been set up");
            }
        } else if (this.awaitReplyResources) { // dialogue on topic started
            if (this.getIntent() == "user.yes") {
                this.serverReply.push(this.issue.link);
            } else if (this.getIntent() == "user.no") {
                this.serverReply.push("Ok");
            } else {
                this.serverReply.push(this.messageSummary['answer']);
                this.inProgress = false; // continue conversation, terminate dialogue on topic
            }
            this.serverReply.push("Would you like to set up an appointment?");
            this.awaitReplyAppointment = true;
            this.awaitReplyResources = false;

        } else if (this.awaitReplyAppointment) {
            if (this.getIntent() == "user.yes") {
                //TODO: SETTING UP APPOINTMENT WITH NER
                this.serverReply.push("Appointment set up!");
            } else if (this.getIntent() == "user.no") {
                this.serverReply.push("Ok");
            } else {
                this.serverReply.push(this.messageSummary['answer']); // continue conversation, terminate dialogue on topic
            }
            this.awaitReplyAppointment = false;
            this.awaitReview=true;
            this.serverReply.push("How did you like this interaction?");
        } else if (this.awaitReplyRecipe) {
            if (this.getIntent() == "user.yes") {
                this.serverReply.push("Before we begin, I must warn you...nothing here is vegetarian");
                if (this.getRecipeSummary() != null)
                    this.serverReply.push(this.getRecipeSummary());
                if (this.getRecipeLink() != null)
                    this.serverReply.push(this.getRecipeLink());
            } else if (this.getIntent() == "user.no") {
                this.serverReply.push("Ok");
            } else {
                this.serverReply.push(this.messageSummary['answer']); // continue conversation, terminate dialogue on topic
                this.inProgress = false;
            }
            this.serverReply.push("Would you like some wine recommendations from me?");
            this.awaitReplyRecipe = false;
            this.awaitReplyWine = true;
        } else if (this.awaitReplyWine) {
            if (this.getIntent() == "user.yes") {
                this.serverReply.push(this.getWineSummary());
                this.serverReply.push(this.getWineProduct());
                this.serverReply.push(this.getWineProductUrl());
            } else if (this.getIntent() == "user.no") {
                this.serverReply.push("Ok");
            } else {
                this.serverReply.push(this.messageSummary['answer']);
                this.inProgress=false;
            }
            this.awaitReplyWine = false;
            this.awaitReview=true;
            this.serverReply.push("How did you like this interaction?");
        }else if(this.awaitReview){
            this.analyzeSentiment();
        }
        return this.serverReply;
    }



    // Function gets intent from existing response

    getIntent() {
        if (this.messageSummary != null) {
            return this.messageSummary['intent'];
        } else {
            return null
        }
    }

    // Get sentiment from response
    analyzeSentiment() {
        var r;
        var reply;
        var sentiment = this.patientMessage.getSentiment();
        if (sentiment.compound >= 0.5) {
            r=1;
            reply="I'm glad I could help";
        }else if (sentiment.appointment<=-0.5){
            r=-1;
            reply="Sorry. I will try to improve in the future";
        }else{
            r=0;
            reply="Ok, thank you";
        }

        if (this.awaitReview && this.inProgress) {
            this.serverReply.push(reply);
            this.serverReply.push("What else can I help you with?")
            this.awaitReview=false;
            this.inProgress=false;
        }
        return r;
    }

    getMessageNER() {
        if (this.messageNER != null) {
            return this.messageNER;
        } else {
            return null
        }
    }

    getAppointment() {
        return this.appointment;
    }

    getRecipeSummary() {
        return this.recipeInfo.summary;
    }
    getRecipeLink() {
        return this.recipeInfo.sourceUrl;
    }
    getRecipeImage() {
        return this.recipeInfo.image;
    }
    getWineSummary() {
        return this.wineInfo.pairingText;
    }
    getWineProduct() {
        return this.wineInfo.productMatches[0].description;
    }
    getWineProductUrl() {
        return this.wineInfo.productMatches[0].link;
    }


}