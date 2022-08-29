

const words = (channel, client, lie, die) => {
    client.say(channel, `Es wurde  'lüge' ${lie} mal und 'tot' ${die} mal gesagt.`)
}

/* const hey = (channel, client, tags) => {
    player.play('./sounds/leonHallo.mp3', (err) => {
        if (err) throw err
    })
    client.say(channel, `Hey @${tags['display-name']}, was geht ab?`);
} */



/* const github = (channel, client, tags) => {
    client.say(channel, `@${tags['display-name']} hier gehts zu meinem Github -> https://github.com/TetsuyaGames?tab=repositories`)
} */

/* const drink = (channel, client, tags, player) => {
    client.say(channel, `${tags['display-name']} möchte das @TetsuyaGames etwas trinkt, prost!`)
    player.play('./sounds/lecker-bierchen.mp3', (err) => {
        if (err) throw err
    })
} */

const birthday = (channel, client, tags, player) => {
    client.say(channel, `${tags['display-name']} gratuliert @TetsuyaGames zum Geburtstag.`)
    player.play('./sounds/birthday.mp3', (err) => {
        if (err) throw err
    })
}

/* const schedule = (channel, client, specials) => {
    if (specials) {
        client.say(channel, 'Mittwoch und Freitag 22 Uhr. Am 27.08 gibt es ab 22 Uhr ein Birthday Special')
    } else {
        client.say(channel, 'Mittwoch und Freitag 22 Uhr')
    }
} */

const socials = (channel, client) => {
    client.say(channel, 'Meine Socials: https://linktr.ee/tetsuuyagames')
}

const lurk = (channel, client, tags) => {
    client.say(channel, `Danke für deinen Lurk @${tags['display-name']}.`)
}

module.exports = {
    // words,
    // hey,
    /* discord, */
    /* github, */
    // drink,
    // schedule,
    // socials,
    // lurk,
    birthday
}