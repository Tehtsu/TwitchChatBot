module.exports = {
    alias: ['lurk'],
    async execute(client, channel, args, tags) {
        client.say(channel, `Danke für deinen Lurk @${tags['display-name']}.`)
    }

}