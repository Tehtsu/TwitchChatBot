const weatherApiBaseUrl = 'https://api.openweathermap.org';

module.exports = {
    alias: ['wetter', 'weather'],
    async execute(client, channel, args, tags, twitchApiBaseUrl, axios, substr, message) {
        const replaceUmlauts = (str) => {
            return str.replace(/ö/g, 'oe')
                .replace(/ü/g, 'ue')
                .replace(/ä/g, 'ae')
                .replace(/Ö/g, 'Oe')
                .replace(/Ü/g, 'Ue')
                .replace(/Ä/g, 'Ae');
        };

        const restoreUmlauts = (str) => {
            return str.replace(/oe/g, 'ö')
                .replace(/ue/g, 'ü')
                .replace(/ae/g, 'ä')
                .replace(/Oe/g, 'Ö')
                .replace(/Ue/g, 'Ü')
                .replace(/Ae/g, 'Ä');
        };

        const capitalizeAfterParenthesis = (str) => {
            return str.replace(/\((.)/, (_, c) => `(${c.toUpperCase()}`);
        };

        if (message.includes(substr)) {
            const newMessage = message.split(' ');
            newMessage.splice(0, 1);
            let city = newMessage.toString().toLowerCase();
            city = replaceUmlauts(city)
            let uppercaseCity = city.charAt(0).toUpperCase() + city.slice(1);
            uppercaseCity = restoreUmlauts(uppercaseCity)
            uppercaseCity = capitalizeAfterParenthesis(uppercaseCity)
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
        } else {
            try {
                const url = `${weatherApiBaseUrl}/data/2.5/weather?lat=52.5170365&lon=13.3888599&units=metric&lang=de&appid=${process.env.WEATHER_KEY}`;
                const responseWeatherTetsu = await axios.get(url);
                client.say(channel, `Bei Tetsu in Berlin sind ${Math.round(responseWeatherTetsu.data.main.temp)} °C.`);
            } catch (err) {
                console.log(err);
            }
        }
    }
}