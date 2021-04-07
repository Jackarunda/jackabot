/*-------------- Imports ---------------*/
var Discord=require("discord.js")
var http=require("http")
var Promise=require("promise")
var Client=new Discord.Client()
/*---------------- Data ----------------*/
var StaticResponses={
	"ayy":"lmao",
	"ping":"pong",
	"wew":"lads",
	"bill clinton":"is a rapist",
	"under budget":"and ahead of schedule",
	"if you let the govt break the law during emergencies":"then they will create emergencies to break the law"
}
var ContainedResponses={
	"zanzibar":"*last resort"
}
/*---------- Runtime Vars -------------*/
var CurrentChannel=null
/*-------- Convenience Funcs -----------*/
function print(){
	for(var arg in arguments){
		if(arguments.hasOwnProperty(arg)){
			var val=arguments[arg]
			if(val){
				if(typeof(val)=="object"){
					for(var key in val){
						if((val.hasOwnProperty(key))&&(val[key])){console.log(key.toString(),val[key].toString())}
					}
				}else{
					console.log(val.toString())
				}
			}else{
				console.log("null\n")
			}
		}
	}
}
function RandomInt(min,max){
	return Math.floor(Math.random()*(max-min)+min)
}
function WriteMsg(msg){
	if(!CurrentChannel){return}
	CurrentChannel.startTyping()
	setTimeout(function(){
		CurrentChannel.stopTyping()
		CurrentChannel.send(msg)
	},250+Math.random()*750)
}
function NetGet(url){
	var options={
		host:url.substring(0,url.indexOf("/")),
		port:80,
		path:url.substring(url.indexOf("/"))
	}
	return new Promise(function(resolve,reject){
		http.get(options,function(res){
			var body=""
			res.on("data",function(d){
				body+=d
			})
			res.on("end",function(){
				resolve(res.statusCode,body)
			})
		}).on("error",function(e){
			reject(e)
		})
	})
}
/*----------- Special Responses --------*/
function WarframeWiki(txt){
	if(txt.substring(0,1)=="["){
		var url="warframe.wikia.com/wiki/"+txt.substring(1).replace("]","").replace(" ","_")
		NetGet(url).then(function(stts,content){
			if(stts==200){
				WriteMsg("http://"+url)
			}
		})
		return true
	}
	return false
}
/*-------------- Fitness Reminder --------------*/
function GenerateNofifyTime(timeslot){
	var Time=new Date()
	var CurYear=Time.getFullYear(),CurMonth=Time.getMonth(),CurHour=Time.getDate()
	switch(timeslot){
		case "morning":
			return new Date(CurYear,CurMonth,CurDay,RandomInt(10,14))
		case "evening":
			return new Date(CurYear,CurMonth,CurDay,RandomInt(14,21))
	}
}
var FitnessReminder={
	TartsNotified:false,
	TartsNotifyTime:0,
	JackNotified:false,
	JackNotifyTime:0,
	CurrentTimeslot:"morning",
	Think:(curTime)=>{
		print("hi",this)
		var CurTimeSlot=curTime.getHours()<12 ? "morning" : "evening"
		//if(FitnessReminder.
	}
}
/*-------------- Main Think ---------------*/
function Think(){
	var CurTime=new Date()
	FitnessReminder.Think(CurTime())
}
/*--------------- Hooks ----------------*/
Client.on("ready",function(){
	print("BOT READY")
	setInterval(Think,1000)
})
Client.on('message',function(msg){
	CurrentChannel=msg.channel
	var txt=msg.content,lowerTxt=msg.content.toLowerCase()
	StaticResponses.forEach(function(value,key){
		if(lowerTxt==key){
			WriteMsg(value)
			return
		}
	})
	ContainedResponses.forEach(function(value,key){
		if(lowerTxt.indexOf(key)!=-1){
			WriteMsg(value)
			return
		}
	})
	if(WarframeWiki(txt)){return}
})
print("fucking hello")
Client.login("MzE4NDY1MDM5NDk5NjU3MjE5.DAyxMA.lqcOWY3aYk_hlNC9ycbWzi2Cj3U")
/*----------- Reference Data ------------*/
/*-

channel <#318469775200092160>
id 318542002298028032
type DEFAULT
content dicks
author <@207691527839809537>
member <@207691527839809537>
nonce 318542000104144896
embeds
attachments [object Map]
createdTimestamp 1496016731572
reactions [object Map]
mentions [object Object]
_edits

channel <#318469775200092160>
id 318542230300262411
type DEFAULT
content <@318465039499657219> dick ass
author <@207691527839809537>
member <@207691527839809537>
nonce 318542228261699584
embeds
attachments [object Map]
createdTimestamp 1496016785932
reactions [object Map]
mentions [object Object]
_edits

-*/
