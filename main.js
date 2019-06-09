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
            m.edit(`${message.author}`,embed)
        }
});

client.login(`${config.token}`)