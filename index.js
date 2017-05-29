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
	"under budget":"and ahead of schedule"
}
var ContainedResponses={
	"zanzibar":"*last resort",
	"tarts play with us":"Space Engineers\nWarframe\nArma III\nBattlefield 4\nGarry's Mod\nElder Scrolls Online\nMinecraft\nFractured Space\nRocket League\nRobocraft\nHalo Wars\nTeam Fortress 2\nHalo 3 (dewrito)\nThe Forest\nInsurgency\nSynergy (HL2)"
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
function Loop(obj,func){
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			func(key,obj[key])
		}
	}
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
/*--------------- Hooks ----------------*/
Client.on("ready",function(){
	print("BOT READY")
})
Client.on('message',function(msg){
	CurrentChannel=msg.channel
	var txt=msg.content,lowerTxt=msg.content.toLowerCase()
	Loop(StaticResponses,function(key,value){
		if(lowerTxt==key){
			WriteMsg(value)
			return
		}
	})
	Loop(ContainedResponses,function(key,value){
		if(lowerTxt.indexOf(key)!=-1){
			WriteMsg(value)
			return
		}
	})
	if(WarframeWiki(txt)){return}
})
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
