require('dotenv').config()

const friend = async function (twitchApiBaseUrl,client, channel, tags, axios) {
    try {
        const userUrl = `${twitchApiBaseUrl}/users?login=tetsuyagames`;
        const headers = {
            headers: {
                'Client-Id': process.env.CLIENT_ID,
                Authorization: `Bearer ${process.env.APP_TOKEN}`
            },
        };
        const repsonseID = await axios.get(userUrl, headers);
        const userId = repsonseID.data.data[0].id;

        const getTagslUrl = `${twitchApiBaseUrl}/streams/tags?broadcaster_id=${userId}`;
        const responseTags = await axios.get(getTagslUrl, headers);
        let tagID = responseTags.data.data;
        tagID.filter((t) => {
            if (t.tag_id === 'ac763b17-7bea-4632-9eb4-d106689ff409') {
                tagIsSet = true;
            } else {
                tagIsSet = false;
            }
        })
        if (tagIsSet === true) {
            client.say(channel, 'Steam: 66922904 || Battle.net: TetsuyaGames#2176 || EPIC: TetsuyaGames || Discord: TetsuyaGames#5014');
        } else {
            client.say(channel, `@${tags['display-name']}, heute kannst du leider nicht mitspielen.`);
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    friend
}