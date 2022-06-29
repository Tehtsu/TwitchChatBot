const tmi = require('tmi.js');
const axios = require('axios').default;
const player = require('play-sound')(opts = {})
require('dotenv').config()

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

let helpLoopInterval;
let socialLoopInterval;
let specialLoopInterval;
let tagIsSet = false;
const specials = true;
const substr = ' ';

let randomNumber = Math.floor(Math.random() * 20);
console.log(randomNumber);


client.connect().then(() => {



    client.on('message', async (channel, tags, message, self) => {
        if (self || !message.startsWith('!')) return;

        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        switch (command) {
            /**
             * LOOP COMMAND
             */
            case 'loop':
                if (tags['user-type'] !== 'mod' && tags.username !== 'tetsuyagames') return;

            console.log('start  help loop')
            helpLoopInterval = setInterval(() => {
                client.say(channel, 'Mit !help, !commands oder !cmd bekommt ihr eine Übersicht der Befehle.')
            }, 1800000) // 60000ms = 60s = 1 min

            console.log('start social loop')
            socialLoopInterval = setInterval(() => {
                client.say(channel, `Instagram: https://www.instagram.com/tetsuyagames/ \n 
                YouTube: https://www.youtube.com/user/TAirLP \n
                Website: https://nerd-zone.eu`)
            }, 900000)

            console.log('start special loop')
            specialLoopInterval = setInterval(() => {
                client.say(channel, 'Am 27.08.2022 gibt es ab 22 Uhr einen Birthday Stream.')
            }, 90000)
            break;

            /**
             * HELP COMMAND
             */
            case 'help': case 'command': case 'cmd': 
                client.say(channel, 'Folgende commands gibt es: !smily, !trinken, !trink, !prost, !github, !gh, !discord, !friends, !wetter, !echo, !hey, !hallo, !cmd, !bud, !heim, !fanfare, !lurk, !guess <zahl>, !dice und !würfeln. Bei einigen commands könnt ihr optional noch einen Wert wie eine Stadt oder eine Zahl eingeben.')
                break;

            /**
             * TEXT COMMAND
             */
            case 'hey':
                player.play('./sounds/leonHallo.mp3', function (err) {
                    if (err) throw err
                })
                client.say(channel, `Hey @${tags['display-name']}, was geht ab?`);
                break;
            case 'discord':
                client.say(channel, 'https://discord.gg/RkfYnQB')
                break;
            case 'echo' :
                client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
                break;
            case 'github': case 'gh' :
                client.say(channel, `@${tags['display-name']} hier gehts zu meinem Github -> https://github.com/TetsuyaGames?tab=repositories`)
                break;
            case 'trinken': case 'trink': case 'prost':
                client.say(channel, `${tags['display-name']} möchte das @TetsuyaGames etwas trinkt, prost!`)
                player.play('./sounds/lecker-bierchen.mp3', function (err) {
                    if (err) throw err
                })
                break; 
            case 'shedule': case 'zeitplan':
                client.say(channel, 'Mittwoch und Freitag 22 Uhr')
                if(specials){
                client.say(channel, 'Am 27.08 gibt es ab 22 Uhr ein Birthday Special')
                
                }
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
                
                let smilys = ['💩','❤','😎','🔥','🍕','🍨','👋','🥵','🥶','🎉'];
                let smilyNumber = Math.floor(Math.random() * smilys.length);
                console.log(smilys[smilyNumber]);
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
                break;
            case 'guess':
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
                break;

            /**
             * WEATHER COMMAND
             */
            case 'wetter':
                if (message.includes(substr)) {
                    const newMessage = message.split(' ');
                    newMessage.splice(0, 1);
                    const city = newMessage.toString().toLowerCase();
                    const uppercaseCity = city.charAt(0).toUpperCase() + city.slice(1);
                    if (city.includes('ö') || city.includes('ü') || city.includes('ä')) {
                        client.say(channel, `@${tags['display-name']}, bitte formuliere deine Anfrage nicht mit ö,ä oder ü sondern mit oe,ue oder ae.`)
                    }
                    else {
                        try {
                            const geoUrl = `${weatherApiBaseUrl}/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_KEY}`;
                            const responseWeatherUser = await axios.get(geoUrl);
                            for (const latLon in responseWeatherUser.data) {
                                if (responseWeatherUser.data[latLon] instanceof Object) {
                                    const userCityLat = responseWeatherUser.data[latLon].lat;
                                    const userCityLon = responseWeatherUser.data[latLon].lon;
                                    const latLonUserUrl = `${weatherApiBaseUrl}/data/2.5/weather?lat=${userCityLat}&lon=${userCityLon}&units=metric&lang=de&appid=${process.env.WEATHER_KEY}`;
                                    const repsonseWeatherUser = await axios.get(latLonUserUrl);
                                    client.say(channel, `@${tags['display-name']} in ${uppercaseCity} sind ${Math.round(repsonseWeatherUser.data.main.temp)} °C.`);
                                    // TODO: bei Städten wie Frankfurt(Oder) den ersten buchstaben in der Klammer großschreiben oder abschneiden :D
                                }
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } else {
                    try {
                        const url = `${weatherApiBaseUrl}/data/2.5/weather?lat=52.5170365&lon=13.3888599&units=metric&lang=de&appid=${process.env.WEATHER_KEY}`;
                        const responseWeatherTetsu = await axios.get(url);
                        client.say(channel, `Bei Tetsu in Berlin sind ${Math.round(responseWeatherTetsu.data.main.temp)} °C.`);
                    } catch (err) {
                        console.log(err);
                    }
                }
                break;

            /**
             * FRIENDS COMMAND
             */
            case 'friends':
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
                    console.log(err);
                };
                break;

            /**
             * SHOUTOUT COMMAND
             */
            case 'so':
                if (tags['user-type'] !== 'mod' && tags.username !== 'tetsuyagames') return;
                try {
                    const [username] = args;
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

                    const channelUrl = `${twitchApiBaseUrl}/channels?broadcaster_id=${userId}`;
                    const responseChannel = await axios.get(channelUrl, headers);
                    const game = responseChannel.data.data[0].game_name;

                    client.say(channel, `Werft doch mal einen Blick bei https://twitch.tv/${username} rein. Es wurde ${game} als letztes gestreamt.`);
                } catch (err) {
                    console.log(err);
                }
                break;
            
            default:
                client.say(channel, 'command not found')
                break;
        }

    })
});