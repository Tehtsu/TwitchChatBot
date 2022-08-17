require('dotenv').config()

const hallo = async function (player) {
    player.play('./sounds/leonHallo.mp3', function (err) {
        if (err) throw err
    })
}

const bud = async function (player) {
    player.play('./sounds/Bud.mp3', function (err) {
        if (err) throw err
    })
}

const heim = async function (player) {
    player.play('./sounds/hömaaufgehmaheim.mp3', function (err) {
        if (err) throw err
    })
}

const fanfare = async function (player) {
    player.play('./sounds/pups.mp3', function (err) {
        if (err) throw err
    })
}

module.exports = {
    hallo,
    bud,
    heim,
    fanfare
}