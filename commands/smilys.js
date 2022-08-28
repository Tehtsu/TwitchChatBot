module.exports = {
    alias: ['smily'],
    async execute(client, channel, args, tags) {
        let smilys = ['💩', '❤', '😎', '🔥', '🍕', '🍨', '👋', '🥵', '🥶', '🎉'];
        let smilyNumber = Math.floor(Math.random() * smilys.length);
        client.say(channel, `${tags['display-name']} schickt einen ${smilys[smilyNumber]} Smily in die Runde`)
    }
}
