require('dotenv').config()

const smily = (client, channel, tags) => {
    let smilys = ['💩', '❤', '😎', '🔥', '🍕', '🍨', '👋', '🥵', '🥶', '🎉'];
    let smilyNumber = Math.floor(Math.random() * smilys.length);
    client.say(channel, `${tags['display-name']} schickt einen ${smilys[smilyNumber]} Smily in die Runde`)
}

module.exports = {
    smily
}