

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('get information about a user')
  .addUserOption(option => option.setName('user') .setDescription('the user to get information about') .setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    const nickname = member.nickname || user.username;

//userinfo embed 
    const uiEmbed = new EmbedBuilder()
    .setColor('Blurple')
    .setTitle(`${user.tag}`)
.setThumbnail(user.displayAvatarURL())
    .addFields ({ name: 'ID', value: `${user.id}`, inline: true })
    .addFields ({ name: 'Nickname', value: `${nickname}`, inline: true })
    .addFields ({ name: 'Created', value: `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`, inline: true })
    .addFields ({ name: `Joined`, value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`, inline: true })
    .addFields ({ name: `Highest Role`, value: `${member.roles.highest}`, inline: true })
    .setFooter({ text: `requested by ${user.tag}`, iconURL: user.displayAvatarURL() })

    await interaction.reply({ embeds: [uiEmbed] });
  },
};