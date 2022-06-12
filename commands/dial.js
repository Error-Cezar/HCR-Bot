const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require("@discordjs/voice")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dial')
		.setDescription('Dial a number.')
		.addStringOption(option =>
			option.setName('string')
				.setDescription('Imput to dial.')
				.setRequired(true)),

	async execute(interaction) {
        const client = interaction.client
     // interaction.reply("This command has been disabled by the bot owner.")
      const Num = interaction.options.getString('string')
      const delay = ms => new Promise(res => setTimeout(res, ms));
      const guildConf = await client.getPhone(interaction.guild);
     // console.log(guildConf.Emergency)
     const emergency = guildConf.Dispatch
     const nodispatch = guildConf.Emergency
     console.log(emergency)
      if(guildConf.Emergency == "none" || guildConf.Dispatch == "none"){
          const embed = await interaction.client.Embed("⚠️Warning!⚠️", "Emergency and/or 911 channel haven't been set up\nPlease ask a Moderator+ to use the /setup command.")
        return interaction.reply({embeds: [embed]})
      }
      switch(Num) {
          case "911":
          let Dispatch = false
          if(!interaction.member.voice.channel) return interaction.reply("You aren't in a voice chat.")
          const channelname = interaction.member.voice.channel.name.toLowerCase();
          //console.log(channelname)
          if(!channelname.includes("civilian") && !channelname.includes("scenario")) return interaction.reply("You aren't in a whitelisted voice chat.")
          const embed = await interaction.client.Embed("☎️Dialing 911", "You have been moved to the 911 channel.\nA dispatcher will come to you soon.")
          interaction.reply({embeds: [embed]})
         await interaction.member.voice.setChannel(emergency)
          const channel = interaction.member.voice.channel;
          let connection
         await interaction.member.guild.channels.cache.get(emergency).members.forEach((tempMember) => {
            if (tempMember.roles.cache.some(role => role.name === 'dispatch')) {
               Dispatch = true
            }
        });
        const player = createAudioPlayer();

        function playSong() {
            /**
             * Here we are creating an audio resource using a sample song freely available online
             * (see https://www.soundhelix.com/audio-examples)
             *
             * We specify an arbitrary inputType. This means that we aren't too sure what the format of
             * the input is, and that we'd like to have this converted into a format we can use. If we
             * were using an Ogg or WebM source, then we could change this value. However, for now we
             * will leave this as arbitrary.
             */
             let resource = createAudioResource(require("fs").createReadStream(`${process.cwd()}/Tones/911.mp3`), {
                inlineVolume : true
            });
        
            /**
             * We will now play this to the audio player. By default, the audio player will not play until
             * at least one voice connection is subscribed to it, so it is fine to attach our resource to the
             * audio player this early.
             */
            player.play(resource);
        
            /**
             * Here we are using a helper function. It will resolve if the player enters the Playing
             * state within 5 seconds, otherwise it will reject with an error.
             */
            return entersState(player, AudioPlayerStatus.Playing, 5e3);
        }

        if(Dispatch == true) {
            connection = joinVoiceChannel({
                channelId: emergency,
                guildId: interaction.guild.id,
                selfDeaf: true,
                selfMute: false,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
        } else {
                connection = joinVoiceChannel({
                   channelId: nodispatch,
                   guildId: interaction.guild.id,
                   selfDeaf: true,
                   selfMute: false,
                   adapterCreator: channel.guild.voiceAdapterCreator,
              });
            }
        
            await playSong()

            connection.subscribe(player)
           await delay(1200)
            connection.destroy()
            break;
            default:
                interaction.reply("Invalid number.")
        }
	},
};
