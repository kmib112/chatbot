
// Khai báo
var request = require("request");
var login = require("facebook-chat-api");
var SimsimiAnswered;
var text;
var botkey = "http://sandbox.api.simsimi.com/request.p?key=c626fda0-1135-4a65-83ec-49da13eefdc1&lc=en&ft=1.0&text=";
login(
	{	
	email: "kmib112@gmail.com", 
	password: "098586500200Aqzz" 
	},
function callback (err, api)
{
	if(err) return console.error(err);
	
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent"});
	
	api.listen(function callback(err, message)
	{
		if(message.body === "stopchat098") { 
			api.sendMessage(":) Tạm biệt.", message.threadID); 
			api.markAsRead(message.threadID);
			return api.logout(err);
			return;
		}
		else if (message.senderID==="id_loại_trừ_1"||message.senderID==="id_loại_trừ_2") {			 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			return;
		}	
		else if (message.body)
		{
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			request(botkey + encodeURI(message.body),  
			function(error, response, body)
			{  
				if (error) api.sendMessage("Mạng lag rồi)", message.threadID);
				if (body.indexOf("Mạng lag rồi") > 0 || body.indexOf("response") < 0)
					api.sendMessage(":)" + message.body, message.threadID 
				);
				text = JSON.parse(body);
				if (text.result == "100")
				{
					SimsimiAnswered = text.response;
					if (message.body===text.response) {
						return;
					} else
					SimsimiAnswered = text.response;
					api.sendMessage(SimsimiAnswered+" <3", message.threadID);
					api.markAsRead(message.threadID);
					console.log("Answered:"+SimsimiAnswered);
				}
			});
		}
	});
})