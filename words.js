const player = require('play-sound')(opts = {})

const words = function (channel, client, lie, die) {
    client.say(channel, `Es wurde  'lüge' ${lie} mal und 'tot' ${die} mal gesagt.`)
}

const hey = function (channel, client, tags) {
    player.play('./sounds/leonHallo.mp3', function (err) {
        if (err) throw err
    })
    client.say(channel, `Hey @${tags['display-name']}, was geht ab?`);
}

const discord = function (channel, client) {
    client.say(channel, 'https://discord.gg/RkfYnQB')
}

const github = function (channel, client, tags) {
    client.say(channel, `@${tags['display-name']} hier gehts zu meinem Github -> https://github.com/TetsuyaGames?tab=repositories`)
}

const drink = function (channel, client, tags) {
    client.say(channel, `${tags['display-name']} möchte das @TetsuyaGames etwas trinkt, prost!`)
    player.play('./sounds/lecker-bierchen.mp3', function (err) {
        if (err) throw err
    })
}

const schedule = function (channel, client, specials) {
    if (specials) {
        client.say(channel, 'Mittwoch und Freitag 22 Uhr. Am 27.08 gibt es ab 22 Uhr ein Birthday Special')
    } else {
        client.say(channel, 'Mittwoch und Freitag 22 Uhr')
    }
}

module.exports = {
    words,
    hey,
    discord,
    github,
    drink,
    schedule
}