/*
  __  __            _   ____               _ 
 |  \/  | ___  __ _| |_|  _ \ ___  ___  __| |
 | |\/| |/ _ \/ _` | __| |_) / _ \/ _ \/ _` |
 | |  | |  __/ (_| | |_|  _ <  __/  __/ (_| |
 |_|  |_|\___|\__,_|\__|_| \_\___|\___|\__,_|
*/
const snekfetch = require("snekfetch")
var parseString = require('xml2js').parseString;
const sm = require("string-similarity");
let gametype = {
    1: 'Cartouche',
    2: 'Demo',
    3: 'Software',
    4: 'eShop'
}
let region = {
    WLD: "<:WLD:503119624422948896>",
    JPN: ":flag_jp:",
    USA: ":flag_us:",
    EUR: ":flag_eu:"
}

module.exports.run = async (bot, message, args) => { //

    let search = args.join(" ")

    const xmldata = await snekfetch.get("http://3dsdb.com/xml.php");

    parseString(xmldata.text, function(err, result) {
        var games = [];

        result.releases.release.forEach((game, index) => {
            games.push(String(game.name))
        })
      
        let sw = sm.findBestMatch(args.join(" "), games);
        let jeu = sw.bestMatch.target
        
        result.releases.release.forEach((game, index) => {

            if (jeu === String(game.name)) {
                // Afiiche le jue par le bot
                console.log(game)
                message.channel.send({
                    "embed": {
                        "title": game.name,
                        "timestamp": new Date(),
                        "color": 3553598,
                        "footer": {
                            "icon_url": message.author.avatarURL,
                            "text": message.author.tag
                        },
                        "fields": [{
                                "name": "Titre:",
                                "value": game.name
                            },
                            {
                                "name": "Title ID:",
                                "value": game.titleid,
                                "inline": true
                            },
                            {
                                "name": "Région:",
                                "value": region[game.region],
                                "inline": true
                            },
                            {
                                "name": "Développeur:",
                                "value": game.publisher,
                                "inline": true
                            },
                            {
                                "name": "Serial:",
                                "value": game.serial,
                                "inline": true
                            },
                            {
                                "name": "Langage:",
                                "value": game.languages,
                                "inline": true
                            },
                            {
                                "name": "Firmware:",
                                "value": game.firmware,
                                "inline": true
                            }
                        ]
                    }
                })
            }
        })
    });

}

exports.conf = {
    aliases: [""],
};

exports.help = {
    name: "3dsdb",
    description: "",
    usage: "3dsdb"
};
