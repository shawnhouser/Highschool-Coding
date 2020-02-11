var express = require('express');
var helemt = require('helmet')
var app = express();
//app.use(helmet());
var serv = require('http').Server(app);
var sha1 = require("sha1");

var USER_DIRECTORY = "./users/";

function writeJSONToFile(userDataJSON, inData, override = 0){
	var trueFileName = USER_DIRECTORY + userDataJSON.hashedUserName + ".json";
	var fs = require("fs");
	var newJSON;
	if(override){
		fs.writeFile(trueFileName, JSON.stringify(inData), function(err,data) {
			if(err) {return console.log(err);}
			return;
		});
	} else {
	fs.readFile(trueFileName, "utf8", function (err,data) {
		if (err) {
			fs.writeFile(trueFileName, "", function(err) {
				if(err) { return console.log(err); }
			});
			newJSON = {
				userName: userDataJSON.inputUserName, 
				userId: userDataJSON.hashedUserName, 
				entries:[inData]
			};

			console.log("writeJSONToFile()\n\tFile made\tWrote Data\n\t"+trueFileName);
			fs.writeFile(trueFileName, JSON.stringify(newJSON), function(err){
				if(err){ return console.log(err); }
			});
		} else {
			newJSON = JSON.parse(data);
			newJSON["entries"].push(inData);
			console.log("writeJSONToFile()\n\tFile exsisted\tAppended Data\n\t"+trueFileName);
			fs.writeFile(trueFileName, JSON.stringify(newJSON), function(err){
				if(err){ return console.log(err); }
			});
		}
	});
	}
}
function readJSONFile(userDataJSON, callback){
	var trueFileName = USER_DIRECTORY + userDataJSON.hashedUserName +".json";
	var fs = require("fs");
	fs.readFile(trueFileName, "utf8", function(err,data){
		if(err){return console.log(err);}
		callback(data);
	})
}
function deleteEntryByNum(entryToDelete, userDataJSON){
	readJSONFile(userDataJSON, function(readData){
		var readJSON = JSON.parse(readData);
		readJSON["entries"].splice(entryToDelete, 1);
		writeJSONToFile(userDataJSON, readJSON, 1);
		console.log("deleteEntryByNum()\n\tEntry Deleted\t"+entryToDelete);
	});
}
//deleteEntryByNum(0,"help","./users/");
/*
readJSONFile("help", "./users/", function(readData){
	console.log(JSON.parse(readData));
});
*/

 
serv.listen(2000);
console.log("Server started.");
 
var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;

	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
	});

	socket.on('storeData',function(data){
		var userId = sha1(data.userName)
		var userData = {
			inputUserName:data.userName,
			hashedUserName:sha1(data.userName),
			trueFileName:USER_DIRECTORY + sha1(data.userName)
		}

		console.log("SOCKET - storeData\n\tStore Request from "+userData.hashedUserName);
		writeJSONToFile(userData, data.jsonEntry);
	});
	socket.on("requestData", function(data) {
		var userData = {
			inputUserName:data.userName,
			hashedUserName:sha1(data.userName),
			trueFileName:USER_DIRECTORY + sha1(data.userName)
		}

		console.log("SOCKET - requestData\n\tData Request from "+userData.hashedUserName);
		readJSONFile(userData, function(readData){
			socket.emit("transmitData", readData);
			console.log("SOCKET - transmitData\n\tSending user data to "+userData.hashedUserName);
		});
	});
	socket.on("deleteEntry", function(data){
		var userData = {
			inputUserName:data.userName,
			hashedUserName:sha1(data.userName),
			trueFileName:USER_DIRECTORY + sha1(data.userName)
		}

		console.log("SOCKET - deleteEntry\n\tDeleting entry #"+data.entryToDelete+" from "+userData.hashedUserName);
		deleteEntryByNum(data.entryToDelete, userData);
	});
});
