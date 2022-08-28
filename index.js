const fs = require('fs')
const tmi = require('tmi.js');
require('dotenv').config()
const axios = require('axios').default;
const player = require('play-sound')(opts = {})
const functions = require('./src/commands/shoutout.js')
const weatherFunction = require('./src/commands/weather.js')
const games = require('./src/commands/games.js')
const friends = require('./src/commands/friends.js')
const loops = require('./src/commands/loops.js')
const textCommands = require('./src/commands/words.js')

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
const weatherApiBaseUrl = 'https://api.openweathermap.org';

let welcomeTed = true
let welcomeMama = true
const specials = true
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
    'bergserkertv'
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
            commandFunction(client, channel, args, tags, twitchApiBaseUrl, axios, lie, die)
        }


        switch (command) {


            case 'birthday': textCommands.birthday(channel, client, tags, player)
                break;

            /**
             * GAME COMMANDS
             */
            case 'dice': case 'würfeln':
                games.dice(message, substr, client, channel, tags)
                break;
            case 'guess':
                games.guess(message, substr, client, channel, tags, randomNumber)
                break;

            /**
             * WEATHER COMMAND
             */
            case 'wetter':
                weatherFunction.weather(weatherApiBaseUrl, message, substr, client, channel, tags, axios)
                break;



            /**
             * FRIENDS COMMAND
             */
            case 'friends':
                friends.friend(twitchApiBaseUrl, client, channel, tags, axios, tagIsSet)
                break;
        }

    })
});