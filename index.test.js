const u= require('./index')
//const mongoose= require('mongoose')
//const expected= [expect.stringMatching('Greetings!'), expect.stringMatching('Hey there!')];
test('properly returns a message', async () => {
    await expect(u.replyMessage('hello')).resolves.toMatch(/(Greetings!|Hello there|Hello, how can I help you today?|Hey there!|Hey!)/i);
})
/*test('properly returns a message', async () => {
    await expect(u.replyMessage('hello')).resolves.toMatch('Greetings!')
})*/
/*afterAll(done => {
    u.server.close();
    done();
});*/
//trying to close the open handle so jest can exit
afterAll(async(done) => {
    // Closing the DB connection allows Jest to exit successfully.
    try {
        await u.handler();
        done()
    } catch (error) {
        console.log(error);
        done()
    }
    // done()
})

