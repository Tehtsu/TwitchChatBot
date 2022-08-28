module.exports = {
    alias: ['gh', 'github'],
    async execute(client, channel, args, tags) {
        client.say(channel, `@${tags['display-name']} hier gehts zu meinem Github -> https://github.com/TetsuyaGames?tab=repositories`)
    }
}