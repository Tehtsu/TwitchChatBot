module.exports = {
    alias: ['dice', 'würfeln'],
    async execute(client, channel, args, tags, twitchApiBaseUrl, axios, substr, message) {
        if (message.includes(substr)) {
            const newMessage = message.split(' ');
            newMessage.splice(0, 1);
            const sides = parseInt(newMessage);
            const diceSides = Math.floor(Math.random() * sides) + 1;
            client.say(channel, `@${tags['display-name']} du hast eine ${diceSides} gewürfelt.`);
        } else {
            const dice = Math.floor(Math.random() * 6) + 1;
            client.say(channel, `@${tags['display-name']} du hast eine ${dice} gewürfelt.`);
        }
    }
}