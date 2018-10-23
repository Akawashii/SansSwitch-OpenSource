const reqEvent = (event) => require(`../events/${event}`);
module.exports = (bot, guild, message) => {
    bot.on('ready', () => reqEvent('ready')(bot));
    bot.on('message', reqEvent('message'));
};