/* const { default: axios } = require("axios"); */

module.exports = {
    alias: ['shoutout', 'so'],
    async execute(client, channel, args, tags, twitchApiBaseUrl, axios, substr, message, randomNumber, bearerToken) {
        if (tags['user-type'] !== 'mod' && tags.username !== 'tetzuttv') return;
        console.log('SO.JS: ',bearerToken)
        try {
            const [username] = args;

            const userUrl = `${twitchApiBaseUrl}/users?login=${username}`
            const headers = {
                headers: {
                    'Client-Id': process.env.CLIENT_ID,
                    Authorization: `Bearer ${bearerToken}`
                },
            }

            const repsonseUser = await axios.get(userUrl, headers)
            const userId = repsonseUser.data.data[0]?.id
            if (!userId) return

            const channelUrl = `${twitchApiBaseUrl}/channels?broadcaster_id=${userId}`
            const responseChannel = await axios.get(channelUrl, headers)
            //const title = responseChannel.data.data[0]?.title
            const game = responseChannel.data.data[0]?.game_name
            if (!game) {
                client.say(channel, `Werft doch mal einen Blick bei https://twitch.tv/${repsonseUser.data.data[0].display_name} rein.`)
            } else {
                client.say(channel, `Werft doch mal einen Blick bei https://twitch.tv/${repsonseUser.data.data[0].display_name} rein. Als letztes wurde ${game} gestreamt.`)
            }
        } catch (err) {
            console.error(err.message)
        }
    }
}