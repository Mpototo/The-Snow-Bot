const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const prefix = config.prefix;

client.on("ready", () => {
    console.log(`[Log] ${client.user.tag} iniciado com sucesso!`);

    client.user.setActivity('Prefix: s!', { type: 'WATCHING'})
});

client.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        const args = message.content.slice(config.prefix.lenght).trim().split(/ +/g);
        const comando = args.shift().toLowerCase();

        const block = '`'
        
        if(message.content.startsWith( prefix + `info`)) {
            const m = await message.channel.send(`Calculando a latencia!`);
            const embed = new Discord.RichEmbed()
            .setTitle(`**Infomações do bot**`)
            .setDescription(`Olá, eu sou o bot do servidor 🌟The Snow🌟, aqui esta as minhas principais informações`)
            .setColor(`#3179ed`)
            .setThumbnail(`https://cdn.discordapp.com/icons/578325838991196188/59984a6199ffa1bf27536ee5937918c8.png?size=2048`)
            .addField(`**Prefixo**`, `Meu prefixo é **${block}s!${block}**`, true)
            .addField(`**Latencia**`, `A Latencia é **${block}${m.createdTimestamp - message.createdTimestamp}${block}**ms\n E a latencia da API é **${block}${Math.round(client.ping)}${block}**ms`, true)
            .setFooter(`🌟The Snow Team🌟™`)
            m.edit(`${message.author}`,embed);
        }

        if (message.content.startsWith(prefix + "avatar")) {
            let aTaged = message.mentions.users.first();
            const embed = new Discord.RichEmbed()
            .setTitle(`**Avatar!**`)
            .setColor(`#3179ed`)
            .setDescription(`Clique [aqui](${aTaged.displayAvatarURL}) para abrir a imagem!`)
            .setImage(`${aTaged.displayAvatarURL}`)
            .setFooter(`🌟The Snow Team🌟™`)
            message.channel.send(`📸 Aqui esta o avatar`, {embed})
        }
        
        if (message.content.startsWith(prefix + `anuncio`)) {
            let text = args.join(" ")
            message.guild.members.forEach(member => {
              if (member.id != client.user.id && !member.user.bot) member.send(text);
            });
            message.channel.send(`Anuncio mandado para **${message.guild.memberCount}** membros, ${message.author}`)
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if(message.content.startsWith(prefix + "ban")) {
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`❌ Você não tem permissão para usar esse comando!`)
            if(args.length === 0) return message.reply("📃 Utilize s!ban <@usuário> <motivo>!");
            let banMember = message.mentions.users.first() || message.guild.users.get(args[0]);
            if(!banMember) return message.reply(`🔍 Não foi possível encontrar este usuário! ${message.author}`);
            let banReason = args.join(" ").slice(22) || args.slice(1).join(" ");
            if(!banReason){
                banReason = "A razão não foi informada!"
            }

            try {
                message.guild.member(banMember).ban(banReason);
                const embed = new Discord.RichEmbed()
                .setTitle(`**Banido!**`)
                .setColor(`#3179ed`)
                .setDescription(`O usuário ${banMember} foi **banido** com sucesso pelo **motivo**: ${banReason}`)
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/153/party-popper_1f389.png')
                .setFooter(`🌟The Snow Team🌟™`)
                message.channel.send(`**${banMember} banido!!**`, {embed});
            } catch (error) {
                message.reply(`${error}`);
            }
        }





    });

client.login(`${config.token}`)