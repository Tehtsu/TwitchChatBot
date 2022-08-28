const player = require('play-sound')(opts = {})

module.exports = {
    alias: ['fanfare', 'pups'],
    async execute() {
        player.play('./sounds/pups.mp3', (err) => {
            if (err) throw err
        })
    }
}