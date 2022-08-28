const player = require('play-sound')(opts = {})

module.exports = {
    alias: ['bud', 'wäschetrockner'],
    async execute() {
        player.play('./sounds/Bud.mp3', (err) => {
            if (err) throw err
        })
    }
}