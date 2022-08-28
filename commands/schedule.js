module.exports = {
    alias: ['schedule', 'zeitplan', 'streamzeiten'],
    async execute(client, channel) {
        client.say(channel, 'Mittwoch und Samstags ab 22 Uhr')
    }
}