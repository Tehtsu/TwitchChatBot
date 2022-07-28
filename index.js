const tmi = require('tmi.js');
const axios = require('axios').default;
const player = require('play-sound')(opts = {})
require('dotenv').config()
const functions = require('./shoutout.js')
const weatherFunction = require('./weather.js')
const games = require('./games.js')
const friends = require('./friends.js')
const loops = require('./loops.js')
const textCommands = require('./words.js')
const overlay = require('./app.js')

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

let tagIsSet = false
const specials = true
const substr = ' '
let lie = 0
let die = 0
let loopstart = true
let streamer = ['tetsuyagames',
    'tedwigtv',
    'profi4mateur',
    'niluus_arcade',
    'mrs_doerte',
    'battlevbk',
    'aimgel0oz',
    'gracelesssky'
]
let viewer = []

let randomNumber = Math.floor(Math.random() * 20)
console.log(randomNumber);


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
            lie += 1
        } else if (message.includes('tot')) {
            die += 1
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

        if(viewer.includes('tedwigtv') && streamer.includes('tedwigtv')){
            player.play('./sounds/halloteddy.mp3', function (err) {
                if (err) throw err
            })
        }
        /**
         * automatic shoutout end
         */

        if (self || !message.startsWith('!')) return;


        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();


        switch (command) {



            /**
             * HELP COMMAND
             */
            case 'help': case 'command': case 'cmd':
                client.say(channel, 'Folgende commands gibt es: !smily, !trinken, !trink, !prost, !github, !gh, !discord, !friends, !wetter, !hey, !hallo, !cmd, !bud, !heim, !fanfare, !lurk, !guess <zahl>, !dice und !würfeln. Bei einigen commands könnt ihr optional noch einen Wert wie eine Stadt oder eine Zahl eingeben.')
                break;

            /**
             * TEXT COMMAND
             */
            case 'words':
                textCommands.words(channel, client, lie, die)
                break;
            case 'hey':
                textCommands.hey(channel, client, tags)
                break;
            case 'discord':
                textCommands.discord(channel, client)
                break;
            case 'github': case 'gh':
                textCommands.github(channel, client, tags)
                break;
            case 'trinken': case 'trink': case 'prost':
                textCommands.drink(channel, client, tags)
                break;
            case 'schedule': case 'zeitplan':
                textCommands.schedule(channel, client, specials)
                break;

            /**
            * LURK COMMAND
            */
            case 'lurk':
                client.say(channel, `Danke für deinen Lurk @${tags['display-name']}.`)
                break;

            /**
             * SMILY COMMAND
             */
            case 'smily':

                let smilys = ['💩', '❤', '😎', '🔥', '🍕', '🍨', '👋', '🥵', '🥶', '🎉'];
                let smilyNumber = Math.floor(Math.random() * smilys.length);
                client.say(channel, `${tags['display-name']} schickt einen ${smilys[smilyNumber]} Smily in die Runde`)
                break;

            /**
             * SOUND COMMANDS
             */
            case 'hallo':
                player.play('./sounds/leonHallo.mp3', function (err) {
                    if (err) throw err
                })
                break;
            case 'bud':
                player.play('./sounds/Bud.mp3', function (err) {
                    if (err) throw err
                })
                break;
            case 'heim':
                player.play('./sounds/hömaaufgehmaheim.mp3', function (err) {
                    if (err) throw err
                })
                break;
            case 'fanfare':
                player.play('./sounds/pups.mp3', function (err) {
                    if (err) throw err
                })
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
                friends.friend(twitchApiBaseUrl, client, channel, tags)
                break;

            /**
             * SHOUTOUT COMMAND
             * for manual shoutout
             */
            case 'so':
                if (tags['user-type'] !== 'mod' && tags.username !== 'tetsuyagames') return;
                try {
                    const [username] = args
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
                break;
        }

    })
});