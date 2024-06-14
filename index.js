const fs = require('fs')
const tmi = require('tmi.js');
require('dotenv').config()
const axios = require('axios').default;
const player = require('play-sound')(opts = {})
//const functions = require('./src/commands/shoutout.js')
const loops = require('./src/commands/loops.js')
// const textCommands = require('./src/commands/words.js')

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: process.env.BOT_NAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: ['tetzuttv']
});

let bearerToken = ""
const tokenUrl = "https://id.twitch.tv/oauth2/token"


/**
 * Get BEARER TOKEN for APP access
 */
axios.post(tokenUrl, null, {
    params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'client_credentials'
    },
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
}). then(response => {
    console.log('Token: ', response.data.access_token)
    bearerToken = response.data.access_token
}).catch(error => {
    console.error('Token konnt nicht geholt werden!', error.response ? error.response.data : error.message)
})

// global variables
const twitchApiBaseUrl = 'https://api.twitch.tv/helix';

let welcomeTed = true
let welcomeMama = true
const specials = false
// let tagIsSet = false
const substr = ' '
let lie = 0
let die = 0
let loopstart = true
let streamer = [/*'tetzuttv',*/
    'tedwigtv',
    'profi4mateur',
    'niluus_arcade',
    'mrs_doerte',
    'battlevbk',
    'gracelesssky',
    'imp_unicorn',
    'babyboo8212',
    'soestgamingDave',
    'huboch',
    'bergserkertv',
    'deleero',
    'cheesyp00se',
    'klixxter',
    '3rundenregenbogen',
    'aliaslucy',
    'angeloxos',
    'atommik',
    'battlequeen94',
    'ben_zockt1989',
    'blackdevil_4c3',
    'bocketv',
    'darktrouble_',
    'dasstreamcouple',
    'doktor_lion',
    'fluffywavez',
    'fresh97er',
    'ganonstadt93',
    'graf_tomatula',
    'greenbummel',
    'handgranatenjoe',
    'huboch',
    'i407250234i',
    'kanalrattentv',
    'karkas92',
    'kelocks',
    'kevowin',
    'kevroxtv',
    'koksyy',
    'lanyanlaveno',
    'littlenicky246',
    'lycian82',
    'majorkrabbi',
    'malle_381',
    'mighty_duck_95',
    'mr_absurd_xd',
    'nareas_cul',
    'nasplash92tv',
    'phin_21',
    'redeye_d_aze_gaming',
    'rian08tv',
    'sharuharts',
    'snakehunter_',
    'soestgaming',
    'soestgamingdave',
    'sun_set87',
    'sxarrr',
    'tasulp',
    'ttvdarkgirllp',
    'twicelights',
    'valencourth',
    'War_FreakS',
    'whatevertv',
    'witched_batty',
    'woolainy',
    'xxthemagics',
    'zydrakos',
    'choor_tv'
]
let viewer = []

let randomNumber = Math.floor(Math.random() * 20)
console.log(randomNumber);


const commandsMap = new Map()
const commandFiles = fs.readdirSync('./commands').filter((f) => f.endsWith('.js'))
const setFileCommands = async () => {
    commandFiles.forEach((file) => {
        const command = require(`./commands/${file}`)

        command.alias.forEach((alias) => {
            commandsMap.set(alias, command.execute)
        })
    })
}

const setCommands = async () => {
    commandsMap.clear()
    await setFileCommands()
}
setCommands()



client.connect().then(() => {

    client.on('message', async (channel, tags, message, self) => {

        if (loopstart === true) {
            loops.helpLoop(channel, client)
            //loops.socialLoop(channel, client)
            /* loops.specialLoop(channel, client) */

            /*loops.discordLoop(channel, client)*/
            if (specials) {
                loops.specialLoop(channel, client)
            }
            loopstart = false
        }

        /* setInterval(() => {
            if (self || tags.username === 'tetsuyagames' || tags.username === 'tetsesbot') {
                return;
            } else {
                loopstart = false
                console.log("Loops Paused!")
            }

        }, 5 * 60 * 1000) */


        if (message.includes('lüge')) {
            lie++
        } else if (message.includes('tot')) {
            die++
        }

        /**
         * for automatic shoutout
         */
        if (!viewer.includes(tags.username)) { // Nutzer schreibt zum ersten mal

            if (streamer.includes(tags.username)) { // Nutzer ist in der Streamerliste
                client.say(channel, `!so ${tags.username}`)
                client.say(channel, `Werft doch mal einen Blick bei https://twitch.tv/${tags.username} rein.`)
                //functions.shoutout(twitchApiBaseUrl, client, channel, tags.username, axios);
            }
            viewer.push(tags.username);
        }

        /**
         * automatic shoutout end
         */

        if (viewer.includes('tedwigtv') && streamer.includes('tedwigtv') && welcomeTed === true) {
            player.play('./sounds/halloteddy.mp3', function (err) {
                if (err) throw err
            })
            welcomeTed = false
        }

        if (viewer.includes('mrsjinni') && welcomeMama === true) {
            player.play('./sounds/halloMama.mp3', function (err) {
                if (err) throw err
            })
            welcomeMama = false
        }

        if (self || !message.startsWith('!')) return;


        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        if (commandsMap.has(command)) {
            const commandFunction = commandsMap.get(command)
            console.log(commandFunction)
            commandFunction(client, channel, args, tags, twitchApiBaseUrl, axios, substr, message, randomNumber, bearerToken)
        }


        switch (command) {
            // case 'birthday': textCommands.birthday(channel, client, tags, player)
            //     break;
        }

    })
});