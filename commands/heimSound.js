const player = require('play-sound')(opts = {})

module.exports = {
    alias: ['heim', 'aufhören'],
    async execute() {
        player.play('./sounds/hömaaufgehmaheim.mp3', (err) => {
            if (err) throw err
        })
    }
}