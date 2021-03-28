// A class to process client message
const PatientMessage = require('./PatientMessage.js');
module.exports = class Doctor {

    patientMessage;
    messageSummary;
    messageNER;
    issue;
    appointment;

    inProgress = false;
    awaitReplyResources=false;
    awaitReplyAppointment=false;
    awaitReview=false;




    mentalIssues = ["user.depression", "user.anxiety", "user.cannotsleep"];
    constructor() {
    }

    async setMessage(patientMessage) {
        this.patientMessage = patientMessage;
        await this.setMessageAttributes();
    }

    async setMessageAttributes() {
        this.messageSummary = await this.patientMessage.getSummary();
        this.messageNER = await this.patientMessage.getNER();
    }

    //Function checks if the user is asking for help with mental issues

    getIssue() {
        let intent = this.getIntent();
        if (this.mentalIssues.includes(intent)) {

            var mentalIssuesData = require('./mentalIssuesData.json').data;
            var issue = mentalIssuesData.find(el => el.name === intent)
            console.log(issue);
            return issue;
        } else {
            return null
        }
    }



    // Function gets reply based on the corpus file from existing response
    getReply() {
        var serverReply = new Array();
        console.log(this.messageSummary);
        console.log(this.messageNER);

        if (!this.inProgress) { //If no meaningful conversation has been started
            if (this.messageSummary != null) {
                this.issue = this.getIssue();
                if (this.issue != null) {
                    this.inProgress = true;
                    serverReply.push(this.issue.summary);
                    serverReply.push("Would you like some more resources to help you cope?");

                } else {
                    serverReply.push(this.messageSummary['answer']);
                }

            } else {
            }
        } else if(!this.awaitReview){
            if(this.getIntent()=="user.yes"){
                if(this.awaitReplyAppointment()){
                    
                }else{
                    serverReply.push(this.issue.link);
                }
                this.inProgress=false;
            }else if (this.getIntent()=="user.no"){
                serverReply.push("Would you like to set up an appointment then?");
            }else{
                serverReply.push(this.messageSummary['answer']);
                this.inProgress=false;
            }

        }
        return serverReply;
    }



    // Function gets intent from existing response

    getIntent() {
        if (this.messageSummary != null) {
            return this.messageSummary['intent'];
        } else {
            return null
        }
    }

    // Function gets intent from existing response

    getMessageNER() {
        if (this.messageNER != null) {
            return this.messageNER;
        } else {
            return null
        }
    }

}