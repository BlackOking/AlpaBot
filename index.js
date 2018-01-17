const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require("./config");

var prefix = ("!")

bot.on('ready', function(){
    console.log('Alpabot est connecté !')
    bot.user.setAvatar('avatar.png').catch(console.error)
    bot.channels.get("352918425540100096").send("Je me suis connecté ! :white_check_mark:")
    //bot.channels.get("357970279781236737").send("**Bonjour à tous !**\n\nMon nom est **AlpaBot**, je suis le tout nouveau et tout premier bot de l'histoire d'Alpagua.\nJ'ai **entièrement été codé maison**, c'est à dire que vous ne pourrez **jamais** me voir ailleurs ! :innocent:\nJ'ai déjà quelques fonctionalités à peu près disponible dans mon sac que vous pourrez découvir grace à la commande **!help**. \nBon, d'accord, la liste n'est pas très longue... mais ne vous inquiètez pas ! Je me développe au fil du temps et je deviendrais de plus en plus compétent, et de plus en plus intéressant !\nAlors restez bien à l'écoute, car à chaque nouvelles fonctionalités disponibles, je me dépècherais de vous le faire savoir dans le salon **#annonces** !\nEt si vous avez la moindre suggestions à mon propos, n'hésitez pas à en faire part dans le salon **#suggestions**.\n\nBon coding à tous ! :rainbow: \n\n**AlpaBot.**")
    //bot.channels.get("357970279781236737").send("PS : Si je ne suis pas connecté, ne cherches pas à faire la moindre commande, ça ne fonctionnera pas. J'ai encore beaucoup de mal à pouvoir rester connecté, mais cela se résoudra très vite. :innocent:")
})

bot.on('message', function (message) {

    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0].toLowerCase()){

    case 'ping':
        message.channel.send('pong')
    break

    case 'help' :
        message.channel.send("Alors, ce que je peux faire pour le moment c'est ça :\n- **!ping** : Bon elle-ci tout le monde la connait, plus besoin de la présenter.\n- **!doc** : Si tu as besoin de la documentation d'Unity.")
        console.log("Commande help demandée")
    break

    case 'info' :
        message.channel.send("Te poses pas trop de questions sur mes informations. Tout ce que tu as à savoir c'est que je suis un AlpaBot. \nLe premier de tous les AlpaBots ! :rainbow:")
    break

    case "ban" :
    let memberban = message.mentions.members.first();
        if(!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.reply("tu est interdit d'utiliser et de tenter d'utiliser cette commande. \nLes boss ont étés prévenus de ton comportement.:x:")
            bot.channels.get("352918425540100096").send(message.member + ", a tenté d'utiliser la commande de ban envers " + memberban + ":warning:")
        } else if (!memberban.bannable){
            message.reply("Cet utilisateur ne peut pas être bannis. :warning:")            
        } else if(memberban.bannable) {
            memberban.ban
        }
    break

    case 'call' :
        let callselected = message.mentions.members.first();
        if(callselected.voiceConnection){
        var voiceChannel = callselected.voiceChannel
        voiceChannel.join().then(connection =>
            {
               const dispatcher = connection.playFile('call.mp3');
               dispatcher.on("end", end => {
                 voiceChannel.leave();
                 });
                }).catch(err => console.log(err));
        message.channel.send("Votre appel a bien été effectué. :telephone: \nSi ton destinataire ne te réponds pas, celui-ci est peut-être occupé, ou tout simplement absent. :wink:")
        console.log(message.member + " a call " + callselected)
        callselected.send("Vous venez de reçevoir un appel de " + message.member)} else {
            message.reply("votre correspondant n'est connecté à aucun salon vocal. Je ne peux donc pas le joindre. :cold_sweat: ")
        }
    break

    case 'come' :
        let comeselected = message.mentions.members.first();
        var voiceChannel = comeselected.voiceChannel
        voiceChannel.join().then(connection =>
            {
               const dispatcher = connection.playFile('come.mp3');
               dispatcher.on("end", end => {
                 voiceChannel.leave();
                 });
                }).catch(err => console.log(err));
        message.channel.send("Votre réponse a été envoyée. :white_check_mark: ")
        console.log(message.member + " a accepté le call de " + comeselected)
    break

    case 'doc' :
        message.channel.send("Tu peux retrouver la documentation officielle d'Unity ici : https://docs.unity3d.com/Manual/index.html")
    break
    }
})

bot.login(process.env.TOKEN)
