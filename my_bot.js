const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "ODEyMTY4NjAwNjg0MDY4OTQ0.YC808w.QpD_QuLyElZBGR1NcFKU-BFDzYw"

client.login(bot_secret_token)