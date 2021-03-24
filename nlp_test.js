
    const { NlpManager } = require('node-nlp');
    const manager = new NlpManager({ languages: ['en'] });

    // Adds the utterances and intents for the NLP
    manager.addDocument('en', 'goodbye for now', 'greetings.bye');
    manager.addDocument('en', 'bye bye take care', 'greetings.bye');

    // Train also the NLG
    manager.addAnswer('en', 'greetings.bye', 'Till next time');
    manager.addAnswer('en', 'greetings.bye', 'see you soon!');

    // Train and save the model.
    (async () => {
        await manager.train();
        manager.save();
        const response = await manager.process('en', 'I should go now');
        console.log(response);
    })();