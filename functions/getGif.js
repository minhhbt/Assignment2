const fetch = require('node-fetch');
module.exports=async function getGif(msg, keywords) {
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
  
    msg.channel.send(json.results[index].url);
}