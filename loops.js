const helpLoop = function (channel, client) {
    console.log('start  help loop')
    setInterval(() => {
        client.say(channel, 'Mit !help, !commands oder !cmd bekommt ihr eine Übersicht der Befehle.')
    }, 1800000) // 60000ms = 60s = 1 min
}

const socialLoop = function (channel, client) {
    console.log('start social loop')
    setInterval(() => {
        client.say(channel, `Instagram: https://www.instagram.com/tetsuyagames/ \n 
    YouTube: https://www.youtube.com/user/TAirLP \n
    Website: https://nerd-zone.eu`)
    }, 900000)
}

const specialLoop = function (channel, client) {
    console.log('start special loop')
    setInterval(() => {
        client.say(channel, 'Am 27.08.2022 gibt es ab 22 Uhr einen Birthday Stream.')
    }, 900000)
}

module.exports = {
    helpLoop,
    socialLoop,
    specialLoop
}