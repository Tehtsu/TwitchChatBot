const helpLoop = function (channel, client) {
    console.log('start help loop')
    setInterval(() => {
        client.say(channel, 'Mit !help, !commands oder !cmd bekommt ihr eine Übersicht der Befehle.')
    }, 1800000) // 60000ms = 60s = 1 min
}

const socialLoop = function (channel, client) {
    console.log('start social loop')
    setInterval(() => {
        client.say(channel, 'Meine Socials findet ihr hier: https://linktr.ee/tetsuuyagames')
    }, 900000)
}

/*
const specialLoop = function (channel, client) {

    console.log('start special loop')
    setInterval(() => {
        client.say(channel, 'Gilde gesucht? Kein Problem komm zu Kame auf Blackmoore')
    }, 900000)
}
*/
/*
const discordLoop = function (channel, client) {
    console.log('start discord loop')
    setInterval(() => {
        client.say(channel, '🤓 Schaut auch gern auf meinem Disocrd vorbei: https://discord.gg/RkfYnQB')
    }, 600000)
}
*/

module.exports = {
    helpLoop,
    socialLoop
    /* specialLoop, */
    /*discordLoop*/
}