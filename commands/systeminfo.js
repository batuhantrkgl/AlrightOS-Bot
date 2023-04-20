const { SlashCommandBuilder } = require('@discordjs/builders');
const os = require('os');
const { MessageEmbed } = require('discord.js');
const osu = require('os-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('systeminfo')
        .setDescription('Displays system information'),
    async execute(interaction) {
        const totalMemoryInBytes = os.totalmem();
        const freeMemoryInBytes = os.freemem();
        const totalMemory = totalMemoryInBytes >= 1073741824 ? `${(totalMemoryInBytes / 1073741824).toFixed(2)} GB` : `${(totalMemoryInBytes / 1048576).toFixed(2)} MB`;
        const freeMemory = freeMemoryInBytes >= 1073741824 ? `${(freeMemoryInBytes / 1073741824).toFixed(2)} GB` : `${(freeMemoryInBytes / 1048576).toFixed(2)} MB`;
        const usedMemory = totalMemoryInBytes >= 1073741824 ? `${Math.round((totalMemoryInBytes - freeMemoryInBytes) / 1073741824)} GB` : `${Math.round((totalMemoryInBytes - freeMemoryInBytes) / 1048576)} MB`;
        const cpuCount = os.cpus().length;
        const osType = os.type();
        const osVersion = os.release();
        const uptime = os.uptime();
        const diskUsage = Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100);
        const latency = interaction.client.ws.ping.toFixed(0);
        const cpuUsage = await new Promise((resolve) => {
            osu.cpuUsage((value) => {
                resolve(Math.round(value * 100));
            });
        });

        // Embed Message
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('System Information')
            .addField('CPU Usage', `${cpuUsage}%`, true)
            .addField('Memory', `${usedMemory} / ${totalMemory}`, true)
            .addField('Disk Usage', `${diskUsage}%`, true)
            .addField('Uptime', `${(uptime / 60 / 60).toFixed(0)} hours`, true)
            .addField('Bot Latency', `${latency}ms`, true)
            .addField('Operating System', `${osType} ${osVersion}`, true);

        // Discord Ping
        const discordPing = interaction.client.ws.ping.toFixed(0);
        if (discordPing <= 200) {
            embed.addField('Discord Ping', `${discordPing}ms 🟢`, true);
        } else if (discordPing <= 500) {
            embed.addField('Discord Ping', `${discordPing}ms 🟡`, true);
        } else {
            embed.addField('Discord Ping', `${discordPing}ms 🔴`, true);
        }

        // CPU Usage
        const cpuModel = os.cpus()[0].model;
        embed.addField('CPU Model', `${cpuModel}`, true);
        embed.addField('CPU Cores', `${cpuCount}`, true);

        await interaction.reply({ embeds: [embed] });
    },
};