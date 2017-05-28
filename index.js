/*-------------- Imports ---------------*/
var Discord=require('discord.js')
var Client=new Discord.Client()
/*---------------- Data ----------------*/
var StaticResponses={
	"ayy":"lmao",
	"ping":"pong"
}
/*-------- Convenience Funcs -----------*/
function Write(chan,msg){
	chan.startTyping()
	setTimeout(function(){
		chan.stopTyping()
		chan.send(msg)
	},250+Math.random()*750)
}
/*----------- Special Responsed --------*/
function WarframeWiki(chan,txt){
	if(txt.substring(0,3)=="wf["){
		var res=txt.substring(3).replace("]","").replace(" ","_")
		Write(chan,"http://warframe.wikia.com/wiki/"+res)
	}
}
/*--------------- Hooks ----------------*/
Client.on("ready",function(){
	console.log("BOT READY")
})
Client.on('message',function(msg){
	var chan=msg.channel,txt=msg.content.toLowerCase()
	for(var key in StaticResponses){
		if(StaticResponses.hasOwnProperty(key)){
			if(txt==key){
				Write(chan,StaticResponses[key])
			}
		}
	}
	WarframeWiki(chan,txt)
})
Client.login("MzE4NDY1MDM5NDk5NjU3MjE5.DAyxMA.lqcOWY3aYk_hlNC9ycbWzi2Cj3U")