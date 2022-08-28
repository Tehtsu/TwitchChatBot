const player = require('play-sound')(opts = {})

module.exports = {
    alias: ['hallo'],
    async execute() {
        player.play('./sounds/leonHallo.mp3', (err) => {
            if (err) throw err
        })
    }
}