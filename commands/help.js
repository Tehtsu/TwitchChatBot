module.exports = {
    alias: ['help', 'cmd', 'commands'],
    async execute(client, channel, args, tags) {
        client.say(channel, 'Folgende commands gibt es: !birthday, !socials, !smily, !trinken, !trink, !prost, !github, !gh, !discord, !friends, !wetter, !hey, !hallo, !cmd, !bud, !heim, !fanfare, !lurk, !guess <zahl>, !dice und !würfeln. Bei einigen commands könnt ihr optional noch einen Wert wie eine Stadt oder eine Zahl eingeben.')
    }
}