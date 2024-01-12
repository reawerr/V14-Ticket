const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const Discord = require("discord.js");
const db = require("croxydb");
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

// Kullanıcıların açtığı kanalları takip etmek için bir set oluştur
const openedChannels = new Map();
const openedChannels2 = new Map();

client.login(config.token || process.env.TOKEN);

client.on("ready", async () => {
  console.log("Bot aktif!");
  const channel = config.channel;
  const as = client.channels.cache.get(channel);
  const embed = new EmbedBuilder()
    .setColor("#FFA500")
    .setAuthor({ name: `Rive Roleplay | Ticket System`, iconURL: as.guild.iconURL({ dynamic: true }) })
    .setDescription("<:4408discordbot:1176122950575996968>Sunucumuzdaki destek taleplerinizi daha iyi yönetebilmemiz için lütfen aşağıdaki butona tıklayarak uygun bir kategori seçiniz.")
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: "<:isimetiketleri16:1173879253264257085>Mal&Varlık Birlik Yardımı", value: "Mal&Varlık Birlik yardımı için lütfen tıklayınız.", inline: true },
      { name: "<:isimetiketleri25:1173881247261528105>Oyuncu Şikayetleri", value: "Oyuncu Şikayetleriniz için lütfen tıklayınız.", inline: true },
      { name: "<:isimetiketleri26:1173881327167213568>Diğer İşlemler", value: "Diğer İşlemler için lütfen tıklayınız.", inline: true },
    )
    .setImage("https://cdn.discordapp.com/attachments/1193264619221950486/1193272348795740160/riveRP-reklampost.png?ex=65ac1c79&is=6599a779&hm=d6d7552e4e5c30a7b8244836bc973c95561a623e3db492cce0b525ffb87c69d7&")
    .setThumbnail("https://cdn.discordapp.com/attachments/1194545240946790410/1195085291380281405/dcresim.png?ex=65b2b4e9&is=65a03fe9&hm=6367c2aec7a8fc8a6bc15b5930453d1c7f4643c7215cba4d45e7ce372d1c9e93&")
    .setFooter({ text: "İnterior Başvurusu için lütfen 🏰┊interior-başvuru Kullanınız.", iconURL: "https://cdn.discordapp.com/attachments/1194545240946790410/1195085291380281405/dcresim.png?ex=65b2b4e9&is=65a03fe9&hm=6367c2aec7a8fc8a6bc15b5930453d1c7f4643c7215cba4d45e7ce372d1c9e93&" });

  const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setLabel("Talep Oluştur")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setCustomId("destek")
        .setEmoji("1173880858986418276")
    );

  as.send({ embeds: [embed], components: [row] });

  const channel22 = config.channel22;
  const as22 = client.channels.cache.get(channel22);
  const embed22 = new EmbedBuilder()
    .setColor("#FFA500")
    .setAuthor({ name: `Rive Roleplay | İnterior System`, iconURL: as.guild.iconURL({ dynamic: true }) })
    .setDescription("<:4408discordbot:1176122950575996968>Sunucumuzdaki başvuru taleplerinizi daha iyi yönetebilmemiz için lütfen aşağıdaki butona tıklayarak talep oluşturabilirsiniz.")
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: "<:isimetiketleri16:1173879253264257085>İnterior Başvuru", value: "İnterior Başvurmak İçin Tıklayınız.", inline: true },
    )
    .setImage("https://cdn.discordapp.com/attachments/1193264619221950486/1193272348795740160/riveRP-reklampost.png?ex=65ac1c79&is=6599a779&hm=d6d7552e4e5c30a7b8244836bc973c95561a623e3db492cce0b525ffb87c69d7&")
    .setThumbnail("https://cdn.discordapp.com/attachments/1194545240946790410/1195085291380281405/dcresim.png?ex=65b2b4e9&is=65a03fe9&hm=6367c2aec7a8fc8a6bc15b5930453d1c7f4643c7215cba4d45e7ce372d1c9e93&")
    .setFooter({ text: "Rive Roleplay", iconURL: "https://cdn.discordapp.com/attachments/1194545240946790410/1195085291380281405/dcresim.png?ex=65b2b4e9&is=65a03fe9&hm=6367c2aec7a8fc8a6bc15b5930453d1c7f4643c7215cba4d45e7ce372d1c9e93&" });

  const row22 = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setLabel("Başvuru Yap")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setCustomId("başvuru22")
        .setEmoji("1173880858986418276")
    );

  as22.send({ embeds: [embed22], components: [row22] });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "destek") {
    // Kullanıcının daha önce destek talebi açıp açmadığını kontrol et
    if (openedChannels.has(interaction.user.id)) {
      interaction.reply({ content: "Zaten bir destek talebiniz bulunmaktadır.", ephemeral: true });
      return;
    }

    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setEmoji("1173879253264257085")
          .setLabel("Mal&Varlık")
          .setStyle(Discord.ButtonStyle.Success)
          .setCustomId("Mal&Varlık"),
        new Discord.ButtonBuilder()
          .setEmoji("1173881247261528105")
          .setLabel("Oyuncu Şikayet")
          .setStyle(Discord.ButtonStyle.Primary)
          .setCustomId("OyuncuŞikayeti"),
        new Discord.ButtonBuilder()
          .setEmoji("1173881327167213568")
          .setLabel("Diğer İşlemler")
          .setStyle(Discord.ButtonStyle.Danger)
          .setCustomId("Diğerİşlemler"),
      );

    const embed = new EmbedBuilder()
      .setDescription("Hangi kategoriyi seçmek istiyorsun?")
      .setColor("127896");

    interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch(error => {});
  }
  //const ticketlog = config.tlogkanal;
  const butonlar = ["Mal&Varlık", "OyuncuŞikayeti", "Diğerİşlemler"];
  if (butonlar.includes(interaction.customId)) {
    await interaction.deferUpdate();

    const data = db.get(`ticket_${interaction.guild.id}`) || "1";

    // Kullanıcının açtığı kanalları takip etmek için Set'e eklenmesi
    openedChannels.set(interaction.user.id, data);

    interaction.guild.channels.create({
      name: `Rive-${data}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: config.staff,
          allow: [PermissionsBitField.Flags.ViewChannel]
        },
      ]
    }).then((c) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
        .setDescription("<:isimetiketleri6:1172648086099722290>Destek Talebiniz oluşturdum,lütfen bu sürede birini etiketleme ve sakince sorununu belirt.")
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
          { name: "Sebep:", value: `${interaction.customId}`, inline: true },
          { name: "Destek Sırası:", value: `${data}`, inline: true }
        )
        .setColor("127896");

      const row = new ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setEmoji("📑")
            .setLabel("Sonlandır")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("kapat"),
          new Discord.ButtonBuilder()
            .setEmoji("<:bilgi:1026204345060036691>")
            .setLabel("Mesajlar")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("mesaj"),
            new Discord.ButtonBuilder()
            .setEmoji("<:bilgi:1026204345060036691>")
            .setLabel("deneme")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("oda")
        );
      /*  const logembed = new EmbedBuilder()
        .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
        .setDescription("<:isimetiketleri6:1172648086099722290>Talep Oluşturdu.")
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
          { name: "Sebep:", value: `${interaction.customId}`, inline: true },
          { name: "Destek Sırası:", value: `${data}`, inline: true }
        )
        .setColor("127896");*/
      db.set(`kapat_${c.id}`, interaction.user.id);
      db.add(`ticket_${interaction.guild.id}`, +1);
      c.send(`<@${interaction.user.id}>,<@&${config.staff}>`)
      c.send({ embeds: [embed], components: [row] }).then(a => {
        a.pin();
      });
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "başvuru22") {
    // Kullanıcının daha önce destek talebi açıp açmadığını kontrol et
    if (openedChannels2.has(interaction.user.id)) {
      interaction.reply({ content: "Zaten bir destek başvurunuz bulunmaktadır.", ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
      .setDescription("Başvuru için odanız açılmıştır.")
      .setColor("127896");

    interaction.reply({ embeds: [embed], ephemeral: true }).catch(error => {});
  }
  //const ticketlog = config.tlogkanal;
  const butonlar = ["başvuru22"];
  if (butonlar.includes(interaction.customId)) {
    await interaction.deferUpdate();

    const data = db.get(`interior_${interaction.guild.id}`) || "1";

    // Kullanıcının açtığı kanalları takip etmek için Set'e eklenmesi
    openedChannels2.set(interaction.user.id, data);

    interaction.guild.channels.create({
      name: `İnterior-${data}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: config.staff,
          allow: [PermissionsBitField.Flags.ViewChannel]
        },
      ]
    }).then((c) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Rive Roleplay - İnterior System", iconURL: interaction.guild.iconURL() })
        .setDescription("<:isimetiketleri6:1172648086099722290>Başvuru Talebiniz oluşturdum,lütfen bu sürede birini etiketleme ve sakince isteklerini belirt.")
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
          { name: "Sebep:", value: `${interaction.customId}`, inline: true },
          { name: "Başvuru Sırası:", value: `${data}`, inline: true }
        )
        .setColor("127896");

      const row = new ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setEmoji("📑")
            .setLabel("Sonlandır")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("kapat22"),
          new Discord.ButtonBuilder()
            .setEmoji("<:bilgi:1026204345060036691>")
            .setLabel("Mesajlar")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("mesaj22"),
        );
      /*  const logembed = new EmbedBuilder()
        .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
        .setDescription("<:isimetiketleri6:1172648086099722290>Talep Oluşturdu.")
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
          { name: "Sebep:", value: `${interaction.customId}`, inline: true },
          { name: "Destek Sırası:", value: `${data}`, inline: true }
        )
        .setColor("127896");*/
      db.set(`kapat22_${c.id}`, interaction.user.id);
      db.add(`interior_${interaction.guild.id}`, +1);
      c.send(`<@${interaction.user.id}>,<@&${config.staff}>`)
      c.send({ embeds: [embed], components: [row] }).then(a => {
        a.pin();
      });
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.name.includes("ticket")) {
    if (message.author?.bot) return;
    db.push(`mesaj_${message.channel.id}`, `${message.author.username}: ${message.content}`);
  }
});
client.on("messageCreate", async (message) => {
  if (message.channel.name.includes("interior")) {
    if (message.author?.bot) return;
    db.push(`mesaj22_${message.channel.id}`, `${message.author.username}: ${message.content}`);
  }
});
client.on("interactionCreate", async (message) => {
  /* const logembed1 = new EmbedBuilder()
   .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
   .setDescription("<:isimetiketleri6:1172648086099722290>Talep Messaj Log Alındı.")
   .addFields(
     { name: '\u200B', value: '\u200B' },
     { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
     { name: "Sebep:", value: `${interaction.customId}`, inline: true },
     { name: "Destek Sırası:", value: `${data}`, inline: true }
   )*/
   if (message.customId === "mesaj22") {
     const fs = require("fs");
     const wait = require('node:timers/promises').setTimeout;
     const datas = db.fetch(`mesaj22_${message.channel.id}`);
     if (!datas) {
       fs.writeFileSync(`${message.channel.id}.json`, "Bu kanalda hiç bir mesaj bulunamadı!");
       message.reply({ files: [`./${message.channel.id}.json`] }).catch(error => {});
     //  dokumlog.send({ files: [`./${message.channel.id}.json`] })
      // ticketlog.send({ embeds: [logembed1] })
     }
     if (datas) {
    //   const dokumlog = config.dlogkanal;
       const data = db.fetch(`mesaj22_${message.channel.id}`).join("\n");
       fs.writeFileSync(`${message.channel.id}.json`, data);
       message.reply({ files: [`./${message.channel.id}.json`] }).catch(error => {});
       //dokumlog.send({ files: [`./${message.channel.id}.json`] })
      // ticketlog.send({ embeds: [logembed1] })
     }
   }
 });

client.on("interactionCreate", async (message) => {
 /* const logembed1 = new EmbedBuilder()
  .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
  .setDescription("<:isimetiketleri6:1172648086099722290>Talep Messaj Log Alındı.")
  .addFields(
    { name: '\u200B', value: '\u200B' },
    { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
    { name: "Sebep:", value: `${interaction.customId}`, inline: true },
    { name: "Destek Sırası:", value: `${data}`, inline: true }
  )*/
  if (message.customId === "mesaj") {
    const fs = require("fs");
    const wait = require('node:timers/promises').setTimeout;
    const datas = db.fetch(`mesaj_${message.channel.id}`);
    if (!datas) {
      fs.writeFileSync(`${message.channel.id}.json`, "Bu kanalda hiç bir mesaj bulunamadı!");
      message.reply({ files: [`./${message.channel.id}.json`] }).catch(error => {});
    //  dokumlog.send({ files: [`./${message.channel.id}.json`] })
     // ticketlog.send({ embeds: [logembed1] })
    }
    if (datas) {
   //   const dokumlog = config.dlogkanal;
      const data = db.fetch(`mesaj_${message.channel.id}`).join("\n");
      fs.writeFileSync(`${message.channel.id}.json`, data);
      message.reply({ files: [`./${message.channel.id}.json`] }).catch(error => {});
      //dokumlog.send({ files: [`./${message.channel.id}.json`] })
     // ticketlog.send({ embeds: [logembed1] })
    }
  }
});

process.on("unhandledRejection", async (error) => {
  console.log("Bir hata oluştu: " + error);
});

client.on("interactionCreate", async (interaction) => {
  //const uygunRol = message.guild.roles.cache.find(config.staff);
//if (message.member.roles.cache.has(uygunRol)) {
  if (interaction.customId === "kapat") {
    const id = db.fetch(`kapat_${interaction.channel.id}`);
    const channel = interaction.channel;
   /* const logembed2 = new EmbedBuilder()
    .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
    .setDescription("<:isimetiketleri6:1172648086099722290>Talep Kapatıldı.")
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
      { name: "Sebep:", value: `${interaction.customId}`, inline: true },
      { name: "Destek Sırası:", value: `${data}`, inline: true }
    )*/
    const embed = new EmbedBuilder()
      .setDescription("Destek talebiniz sonlandırılmıştır oda 10 saniye içersinde silinicektir.")
      .setColor("127896");

    await interaction.reply({ embeds: [embed] });
    //ticketlog.send({ embeds: [logembed2] })
    // 5 saniye sonra kanalı sil
    setTimeout(async () => {
      // Silme işlemi burada gerçekleşir
      await channel.delete();

      // Kullanıcının açtığı kanalın Set'ten kaldırılması
      openedChannels.delete(interaction.user.id);

      // Diğer işlemler
    }, 10000); // 5000 milisaniye = 5 saniye
  }
/*} else {
    // Eğer kullanıcı uygun role sahip değilse
    message.reply('Bu butonu sadece yetkililer kullanabilir.');
}*/
});

client.on("interactionCreate", async (interaction) => {
  //const uygunRol = message.guild.roles.cache.find(config.staff);
//if (message.member.roles.cache.has(uygunRol)) {
  if (interaction.customId === "kapat22") {
    const id = db.fetch(`kapat22_${interaction.channel.id}`);
    const channel = interaction.channel;
   /* const logembed2 = new EmbedBuilder()
    .setAuthor({ name: "Rive Roleplay - Ticket", iconURL: interaction.guild.iconURL() })
    .setDescription("<:isimetiketleri6:1172648086099722290>Talep Kapatıldı.")
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true },
      { name: "Sebep:", value: `${interaction.customId}`, inline: true },
      { name: "Destek Sırası:", value: `${data}`, inline: true }
    )*/
    const embed = new EmbedBuilder()
      .setDescription("Başvuru talebiniz sonlandırılmıştır oda 10 saniye içersinde silinicektir.")
      .setColor("127896");

    await interaction.reply({ embeds: [embed] });
    //ticketlog.send({ embeds: [logembed2] })
    // 5 saniye sonra kanalı sil
    setTimeout(async () => {
      // Silme işlemi burada gerçekleşir
      await channel.delete();

      // Kullanıcının açtığı kanalın Set'ten kaldırılması
      openedChannels2.delete(interaction.user.id);

      // Diğer işlemler
    }, 10000); // 5000 milisaniye = 5 saniye
  }
/*} else {
    // Eğer kullanıcı uygun role sahip değilse
    message.reply('Bu butonu sadece yetkililer kullanabilir.');
}*/
});
