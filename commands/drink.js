const player = require('play-sound')(opts = {})

module.exports = {
    alias: ['drink', 'trink', 'prost', 'trinken'],
    async execute(client, channel, args, tags) {
        client.say(channel, `${tags['display-name']} möchte das @TetsuyaGames etwas trinkt, prost!`)
        player.play('./sounds/lecker-bierchen.mp3', (err) => {
            if (err) throw err
        })
    }
}