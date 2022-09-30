const apiroute = require("./routes/apiroute");
const express = require("express");
const {sequelize} = require("./db");
const userModel = require("./models/User");
const tagModel = require("./models/Tag");
const noteModel = require("./models/Note");
const noteTagModel = require("./models/NoteTag");


let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

// HEADERS ALWAYS BECOME LOWERCASE!!!!!!

app.post("/register", function(req,res) {
	try {
		sequelize.transaction(async function (transaction) {
			// chain all your queries here. make sure you return them.
			//await userModel.sync({transaction});
			const user = await userModel.create({
				userName: 'test',
				password: 'testtest'
			}, { transaction });           
			
			return user;
		});
		
		console.log('success');
		return res.status(200).json({message:"added"});
	} catch (error) {
		console.log('error',error);	
		return res.status(400).json({message:"failed"});
	}
	
	
})

app.use("/api",apiroute);

app.listen(port);

console.log("Running in port",port);