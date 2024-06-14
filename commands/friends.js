module.exports = {
    alias: ['tags', 'gamertags', 'gt', 'friends'],
    async execute(client, channel, args, tags, twitchApiBaseUrl, axios, substr, message, randomNumber, bearerToken) {
        let tagIsSet = 'tot' // mögliche Tags sind, TOT für outlast und mp für alle anderen Multiplayer spiele
        const tammel = true
        try {
            const userUrl = `${twitchApiBaseUrl}/streams?user_login=tetzuttv`;
            const headers = {
                headers: {
                    'Client-Id': process.env.CLIENT_ID,
                    Authorization: `Bearer ${bearerToken}`
                },
            };
            const repsonse = await axios.get(userUrl, headers);

            const gameName = repsonse.data.data[0].game_name;
            const gameId = repsonse.data.data[0].game_id


            if (gameName === 'The Outlast Trials' && gameId === '518144' && tagIsSet === 'tot') {
                const say = client.say(channel, 'Steam: 66922904 || TOT: 123456 || Discord: tetzuttv');
                if (tammel === true) {
                    client.say(channel, 'Du findest uns heute auf diesem Discord: https://discord.gg/hAP6zrhzGu')
                    return say
                }
                return say
            } else if (tagIsSet === 'mp') {
                client.say(channel, 'Steam: 66922904 || Battle\.net: TetsuyaGames#2176 || EPIC: TetsuyaGames || Discord: TetzuTTV');
            } else {
                client.say(channel, `@${tags['display-name']}, heute kannst du leider nicht mitspielen.`);
            }
        } catch (e) {
            console.error(e)
        }
    }
}