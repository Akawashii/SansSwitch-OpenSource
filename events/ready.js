const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = async (bot, message, args) => {
    //Envoie un message dans la console pour dire que le bot est en ligne
    console.log(`${bot.user.username} est en ligne ! Serveur ${bot.guilds.size} pour ${bot.users.size} membres`);

    //Met une activité
    bot.user.setActivity(`!help | Bot by MeatReed`, {
        type: "PLAYING" //PLAYING, STREAMING, LISTENING, WATCHING
    });


}