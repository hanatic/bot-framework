#!/usr/bin/env node

const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { prefix, token } = require('./config.json');
const chalk = require('chalk');
const winston = require('winston');
const fetch = require('node-fetch');
const packageJson = require('./package.json');

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => (`[${log.level.toUpperCase()}]- ${log.message}`)),
});

const client = new Discord.Client();

client.once('ready', () => {
	logger.log('info', 'Bot online.');
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const guild = message.guild;
	const color = 'f5383c';

	if (command === "viewuser") {

		const victim = message.mentions.members.first().user;

		if (victim.bot.valueOf(true)) {
			message.react('🚫')
		} else {

		const viewUserEmbed = new Discord.MessageEmbed()
			.setColor(color)
			.setTitle('Here\'s what I found.')
			.setDescription('You requested a user\'s information, and here\'s what I found.')
			.addFields(
				{ name: 'Discord Tag', value: `${victim.tag}`, inline: true },
				{ name: 'Avatar Link', value: `${victim.displayAvatarURL({ dynamic: true })}`, inline: true },
				{ name: 'User ID', value: `${victim.id}`  }
			);

			if (message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
				message.channel.send(viewUserEmbed);
			} else {
				message.react('🚫')
			}

		}

	}

	else if (command === "warn") {
		const victim = message.mentions.members.first().user;
		let reason = String;

		if (args[3] === undefined && args[2] === undefined && args[1] === undefined) { reason = "an undefined reason" }
		else if (args[3] === undefined && args[2] === undefined) { reason = args[1] }
		else if (args[3] === undefined) { reason = args[1] + " " + args[2] }
		else { reason = args[1] + " " + args[2] + " " + args[3] }

		const warnEmbed = new Discord.MessageEmbed()
			.setColor(color)
			.setTitle('You recieved a warning')
			.setDescription(`${message.author.username} has warned you for ${reason}. Three warnings result in a ban.`);

		 if (message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
			victim.send(warnEmbed);
			message.react('👊');
		} else {
			message.react('🚫')
		}
	}	

	else if (command === "invites" || command === "inv" || command === "invite") {

		if (args[0] === "create") {
			message.channel.createInvite()
					.then(invite => message.channel.send("Created invite https://discord.gg/" + invite.code));
		}
		else if (args[0] === "list") {
			/* message.guild.fetchInvites()
					.then(invite => {
						const array = invite.array();
						const inviteEmbed = new Discord.MessageEmbed();
									inviteEmbed.setColor(color)
									.setTitle('Here\'s what I found: ')
									.setDescription('All details are retrieved from your Discord Guild, any issues are with the guild itself.')
									.addFields(
										{ name: 'Invite #1', value: array[0].code, inline: true },
										{ name: 'Invite #2', value: array[1].code, inline: true },
										{ name: 'Invite #3', value: array[2].code, inline: true }
									);
						message.channel.send(inviteEmbed);
					})
					.catch(console.error); */

					message.reply('sorry but version ' + packageJson.version + ' is experiencing issues with $invites list. Please contact the developer.')
		}

	}

	else if (command === "ping") {
		message.react('🛰');
		message.channel.send(`Ping: ${client.ws.ping}ms`);
	}

	else if (command === "help") {
		message.react('📩');

		const helpEmbed = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle('Here\'s a bit of help:')
				.addFields(
					{ name: 'help', value: 'DMs you a list of the bot\s commands.' },
					{ name: 'warn', value: 'Lets admins warn a user. 3 warnings constitute a ban.' },
					{ name: 'invites', value: 'Shows you info about your server\'s invites. ?invites create makes a new invite and sends you the link code, or ?invites list lists all current open invites to the guild.' },
					{ name: 'servermute', value: 'Server mutes a user. Translation: shuts them up' },
					{ name: 'serverdeafen', value: 'Server deafens a user. Basically you can hear them but they can\'t hear you :)' },
					{ name: 'website', value: 'Open\'s the bot\'s website link (coming soon)' },
					{ name: 'vckick', value: 'Kicks a user from a voice channel.' },
					{ name: 'cat', value: 'Sends an image of a cat.' },
					{ name: 'info', value: 'Tells ya a little bit about the bot.'}
				)
		
		message.author.send(helpEmbed);
	}

	else if (command === "servermute" || command === "sm") {
		message.mentions.members.first().voice.setMute(true)
		.then(message.react('🎙'));
	}

	else if (command === "serverdeafen" || command === "sd") {
		message.mentions.members.first().voice.setDeaf(true)
		.then(message.react('🔇'));
	}

	else if (command === "website") {
		const websiteEmbed = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle('Page coming soon');

		message.channel.send(websiteEmbed);
	}

	else if (command === "vckick" || command === "voicekick") {
		
		message.mentions.members.first().voice.kick()
				.then(message.react('🦶'));

	}

	else if (command === 'cat') {

		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
	
		const catEmbed = new Discord.MessageEmbed()
				.setImage(file)
				.setTitle('Here\'s your cat:')
				.setColor(color);

		message.channel.send(catEmbed);
	}

	else if (command === "info") {

		const infoEmbed = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle('Here\'s a lil bit about us')
				.addFields(
					{ name: 'Developers:', value: 'hanatic, with input from UnsoughtThreee' },
					{ name: 'Version', value: packageJson.version },
				);
		
		message.channel.send(infoEmbed);

	}

});

client.on('error', error => {
		console.log(chalk.bold.red(`ERROR`)+chalk.red(error))
});

client.login(token);