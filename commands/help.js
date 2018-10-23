/*
  __  __            _   ____               _ 
 |  \/  | ___  __ _| |_|  _ \ ___  ___  __| |
 | |\/| |/ _ \/ _` | __| |_) / _ \/ _ \/ _` |
 | |  | |  __/ (_| | |_|  _ <  __/  __/ (_| |
 |_|  |_|\___|\__,_|\__|_| \_\___|\___|\__,_|
*/
module.exports.run = async (bot, message, args) => { //

    message.channel.send({
        "embed": {
            "title": "Help Bot SansSwitch",
            "description": "Bot complètement développé par MeatReed pour le serveur Modding Switch French\nCréateur du bot [TaMer](https://discordbots.org/bot/450352584302002186)",
            "color": 3553598,
            "footer": {
                "icon_url": "https://cdn.discordapp.com/avatars/484404333073530910/81ea936ff101c055fec0bb94804629b8.png?size=2048",
                "text": "By MeatReed"
            },
            "thumbnail": {
                "url": bot.user.avatarURL
            },
            "fields": [{
                    "name": "!nswdb [Nom du jeu]",
                    "value": "Cette commande permet d'afficher des informations d'un jeu Switch."
                },
                {
                    "name": "!3dsdb [Nom du jeu]",
                    "value": "Cette commande permet d'afficher des informations d'un jeu 3DS."
                }
            ]
        }
    })

}

exports.conf = {
    aliases: [""],
};

exports.help = {
    name: "help",
    description: "",
    usage: "help"
};