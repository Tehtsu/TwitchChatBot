const player = require('play-sound')(opts = {})

module.exports = {
    alias: ['hey', 'huhu'],
    async execute(client, channel, args, tags) {
        player.play('./sounds/leonHallo.mp3', (err) => {
            if (err) throw err
        })
        client.say(channel, `Hey @${tags['display-name']}, was geht ab?`);
    }
}