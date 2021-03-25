// A class to process client message
module.exports = class PatientMessage {
    response;
    constructor(text) {
        this.text = text;
    }

    // Generates a reply based on the created corpus file
    // Uses nlpjs api
    async defaultResponse() {
        const { dockStart, ConsoleConnector } = require('@nlpjs/basic');

        const dock = await dockStart();
        const nlp = dock.get('nlp');
        await nlp.train();

        var response = await nlp.process('en', this.text);

        // console.log(response);
        this.response = response;
        return response;
    }

    // Function that identifies named entities in the text and returns them as a json object
    // Using ner-promise API
    async getNER() {
        const ner = require('ner-promise');

        const nerPromise = new ner({
            install_path: 'stanford-ner-2018-10-16'
        });


        async function test(text) {
            const entities = await nerPromise.process(text);
            console.log(entities);
            return entities;
        }

        return test(this.text);
    }
    // Function gets intent from existing response OR g
    async getIntent() {
        if (this.response == null) {
            this.response = await this.defaultResponse(this.text)
            // console.log(this.response)
        }
        if (this.response != null) {
            return this.response['intent'];

        } else {
            return null
        }
    }
    async getServerReply() {
        if (this.response == null) {
            this.response = await this.defaultResponse(this.text)
            console.log(this.response)
        }
        if (this.response != null) {
            return this.response['answer'];

        } else {
            return null
        }
    }


}