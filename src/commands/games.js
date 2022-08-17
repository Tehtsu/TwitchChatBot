
const dice = function (message, substr, client, channel, tags) {
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
const guess = function (message, substr, client, channel, tags, randomNumber) {
    /* 
                       guess-status = idle | ingame 
                       guess-letzteinteraktion = letzter timestamp, nach X minuten status reseten
                       guess-level = 1,2,3-stellig
                       guess-target = random(0, 10 * guess-level )
   
                       !guess => wenn idle => "bitte mit schwierigkeit angeben: z.B. !guess easy"
                       !guess level => wenn idle => random ausführen, letzteinterkation setzen
                       !guess level => wenn ingame => moderator darf guess neu starten?
                       !guess XYZ => zu groß, zu klein, richtig
   
                       wenn guess-letzteinteraktion abläuft, dann status = idle; guess-target = 0
                       
                   */
    if (message.includes(substr)) {
        const numberMessage = message.split(' ');
        numberMessage.splice(0, 1);
        const number = parseInt(numberMessage);
        if (number < randomNumber) {
            client.say(channel, `@${tags['display-name']} deine Zahl ${number} ist kleiner als die gesuchte.`)
        } else if (number > randomNumber) {
            client.say(channel, `@${tags['display-name']} deine Zahl ${number} ist größer als die gesuchte.`)
        } else {
            client.say(channel, `@${tags['display-name']}, du hast die richtige Zahl (${randomNumber}) gefunden.`);
            randomNumber = Math.floor(Math.random() * 25);
            console.log(randomNumber)
        }
    }
}

module.exports = {
    dice,
    guess
}