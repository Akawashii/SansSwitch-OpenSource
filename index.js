/*
  __  __            _   ____               _ 
 |  \/  | ___  __ _| |_|  _ \ ___  ___  __| |
 | |\/| |/ _ \/ _` | __| |_) / _ \/ _ \/ _` |
 | |  | |  __/ (_| | |_|  _ <  __/  __/ (_| |
 |_|  |_|\___|\__,_|\__|_| \_\___|\___|\__,_|
*/

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let guildArray = bot.guilds.array();
require('./util/eventLoader')(bot);


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.on("message", (message) => {
    if (message.content.startsWith(".avocat")) {
        message.delete().catch();
        let nouveau = message.guild.roles.find("name", "Nouveaux");
        let membres = message.guild.roles.find("name", "Membres");
        if (message.member.roles.has(membres.id)) {
            message.channel.send(`Vous ne pouvez plus utiliser cette commande !`);
        } else {
            message.member.addRole(membres).catch(console.error);
            message.member.removeRole(nouveau).catch(console.error);
        }
    }
})

bot.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            bot.commands.delete(command);
            bot.aliases.forEach((cmd, alias) => {
                if (cmd === command) bot.aliases.delete(alias);
            });
            bot.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


bot.on('warn', e => {
    console.log(e);
});

bot.on('error', e => {
    console.log(e);
});

bot.login(process.env.TOKEN);