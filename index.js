const Discord = require('discord.js');
require('discord-reply');
const neis = require('neis');
const request = require('request-promise-native');

const Client = new Discord.Client();
const token = require('./token.json');
const users = require('./user.json');

Client.on('ready', () => {
    console.log('logged in');
})

Client.on('message', async (msg) => {
    if(msg.author.bot) return;

    let user = users.find(element => element.userid === msg.author.id);
    let nowDate = new Date(Date.now());
    let yyyyMMdd = `${nowDate.getFullYear()}${("0" + (nowDate.getMonth()+1)).slice(-2)}${("0" + (nowDate.getDate())).slice(-2)}`;

    if(msg.content === '성준 급식') {
        let url1 = `https://open.neis.go.kr/hub/schoolInfo?Key=${token.neis_token}&Type=json&pIndex=1&pSize=1&SCHUL_NM=${encodeURI(user.schoolname)}`
        console.log(url1)
        let data = await request(url1);
        let schoolInfo = JSON.parse(data).schoolInfo[1].row[0];

        let url2 = `https://open.neis.go.kr/hub/mealServiceDietInfo?Key=${token.neis_token}&Type=json&pIndex=1&pSize=1&ATPT_OFCDC_SC_CODE=${schoolInfo.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${schoolInfo.SD_SCHUL_CODE}&MLSV_YMD=${yyyyMMdd}`;
        console.log(url2);
        let mealdata = await request(url2);
        let meal = JSON.parse(mealdata).mealServiceDietInfo[1].row[0].DDISH_NM

        let embed = new Discord.MessageEmbed();
        embed.setTitle("오늘의 급식")
        embed.setColor(msg.member.displayHexColor);
        embed.setImage(msg.author.avatarURL());

        let dishes = meal.split('<br/>');
        let dishStr = "";
        dishes.forEach(dish => {
            dishStr = dishStr.concat(dish).concat("\n");
        });
        embed.setDescription(dishStr);

        msg.lineReply(embed)
    }

    if(msg.content.endsWith('멈춰') || msg.content.endsWith('멈춰!') || msg.content.endsWith('멈춰!!') || msg.content.endsWith('멈춰!!!') || msg.content.endsWith('멈춰!!!!')){
        let embed = new Discord.MessageEmbed();
        embed.setTitle('멈춰')
        embed.setImage('https://media.discordapp.net/attachments/813470000508829726/824701168521052170/3fcB7Q3.jpeg')
        embed.setColor(msg.member.displayHexColor);
        msg.channel.send(embed)
    }
    if(msg.content.endsWith('죽여')){
        let embed = new Discord.MessageEmbed();
        embed.setTitle('네.')
        embed.setImage('https://cdn.discordapp.com/attachments/833627238087262231/834405698162131005/bf59b40e923778b7dc3467579b7c4e65.gif')
        embed.setColor(msg.member.displayHexColor);
        msg.channel.send(embed)
    }
    if(msg.content.endsWith('전수찬')){
        let embed = new Discord.MessageEmbed();
        embed.setTitle('전수찬')
        embed.setImage('https://cdn.discordapp.com/attachments/833627238087262231/833987313625202698/SooChan3.PNG')
        embed.setColor(msg.member.displayHexColor);
        msg.channel.send(embed)
    }
    if(msg.content.endsWith('진형아 듀랭할까?')){
        let embed = new Discord.MessageEmbed();
        embed.setTitle('고향')
        embed.setImage('https://cdn.discordapp.com/attachments/833627238087262231/835423961847955476/unknown.png')
        embed.setColor(msg.member.displayHexColor);
        msg.channel.send(embed)
    }
    if(msg.content.includes("vs")) {
        let players = msg.content.split("vs");
        msg.lineReply(players[Math.floor(Math.random() * players.length)])
    }
    

})

Client.login(token.discord_token)