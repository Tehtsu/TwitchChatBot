const fs = require('fs')
const tmi = require('tmi.js');
require('dotenv').config()
const axios = require('axios').default;
const player = require('play-sound')(opts = {})
const functions = require('./src/commands/shoutout.js')
const loops = require('./src/commands/loops.js')
// const textCommands = require('./src/commands/words.js')

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: process.env.BOT_NAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: ['tetsuyagames']
});

// global variables
const twitchApiBaseUrl = 'https://api.twitch.tv/helix';

let welcomeTed = true
let welcomeMama = true
const specials = false
let tagIsSet = false
const substr = ' '
let lie = 0
let die = 0
let loopstart = true
let streamer = [/* 'tetsuyagames', */
    'tedwigtv',
    'profi4mateur',
    'niluus_arcade',
    'mrs_doerte',
    'battlevbk',
    'aimgel0oz',
    'gracelesssky',
    'imp_unicorn',
    'babyboo8212',
    'soestgamingDave',
    'huboch',
    'bergserkertv',
    'deleero',
    'cheesyp00se',
    'klixxter'
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
            loops.socialLoop(channel, client)
            loops.discordLoop(channel, client)
            if (specials) {
                loops.specialLoop(channel, client)
            }
            loopstart = false
        }


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
                functions.shoutout(twitchApiBaseUrl, client, channel, tags.username, axios);
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
            commandFunction(client, channel, args, tags, twitchApiBaseUrl, axios, substr, message, randomNumber)
        }


        switch (command) {
            // case 'birthday': textCommands.birthday(channel, client, tags, player)
            //     break;
        }

    })
});