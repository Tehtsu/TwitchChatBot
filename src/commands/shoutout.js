// const axios = require('axios').default;
require('dotenv').config()

//async function shoutout(channel, username) {
const shoutout = async function (twitchApiBaseUrl, client, channel, username, axios) {
    client.say(channel, `!so ${username}`)
    try {
        let shoutout = "";
        const userUrl = `${twitchApiBaseUrl}/users?login=${username}`;
        const headers = {
            headers: {
                'Client-Id': process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.APP_TOKEN}`
            },
        };
        const repsonseUser = await axios.get(userUrl, headers);
        const userId = repsonseUser.data.data[0].id;
        if (!userId) return;

        shoutout = `Werft doch mal einen Blick bei https://twitch.tv/${repsonseUser.data.data[0].display_name} rein.`
        try {
            const channelUrl = `${twitchApiBaseUrl}/channels?broadcaster_id=${userId}`;
            const responseChannel = await axios.get(channelUrl, headers);
            const game = responseChannel.data.data[0].game_name;
            if (game.length > 0) {
                shoutout += ` Es wurde ${game} als letztes gestreamt.`
            }
        } catch (ex) { }
        client.say(channel, shoutout);
    } catch (err) {
        console.log(err);
    }

}
module.exports = {
    shoutout
}