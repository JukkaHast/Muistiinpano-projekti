const apiroute = require("./routes/apiroute");
const express = require("express");
const {sequelize} = require("./db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("./models/User");
const sessionModel = require("./models/Session");


let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

const time_to_live_diff = 3600000;

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

// HEADERS ALWAYS BECOME LOWERCASE!!!!!!

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden!"});
	}
	sessionModel.findOne({where: {token:req.headers.token}}).then(session => {
		if(!session){
			return res.status(403).json({message:"Forbidden"});
		}
		let now = Date.now();
		if(now > session.ttl){
			sessionModel.destroy({where: {id:session.id}}).then(items => {
				//return res.status(201).json({message:"Deleted "+items+" rows"})
			}).catch((err) => {
				console.log("Failed to remove session. Reason",err);
				//return res.status(403).json({message:"Forbidden"});
			})
			//sessionModel.deleteOne({"_id":session._id},function(err){
			//	console.log("Failed to remove session. Reason",err);				
			//})			
			return res.status(403).json({message:"Forbidden"});
		} else {
			//session.set({ttl:now+time_to_live_diff})
			//session.save().then(session => {
				
			session.update({ttl:now+time_to_live_diff},{id:session.id}).then(session => {
				console.log(session);
				req.session = {};
				req.session.userid = session.userid;
			}).catch((err) => {
				console.log("Failed to resave session. Reasonsss",err);
			}).finally(() => {
				return next();
			})
			
			
			/*req.session = {};
			req.session.userid = session.userid;
			session.ttl = now + time_to_live_diff;
			session.save(function(err){
				if(err){
					console.log("Failed to resave session. Reason",err);
				}
				return next();
			})*/			
		}
	}).catch((err) => {
		console.log("Failed to find session. Reason",err);
		return res.status(403).json({message:"Forbidden"});
	})
}

/*app.post("/addtag", async function(req,res) {
	if(!req.body){
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.tagname){
		return res.status(400).json({message:"Bad request"});
	}	

	try {
        const result = await sequelize.transaction(async function (t) {
            // chain all your queries here. make sure you return them.
			//await userModel.sync({transaction});
            const tag = await tagModel.create({
                tagName: req.body.tagname								
            }, { transaction: t });           
            
			console.log(tag.id);
            return tag;
        });
		console.log(result);
        console.log('success');
		return res.status(201).json({message:"Created"});
    } catch (error) {
		console.log("Failed to create item. Reason",error);
		return res.status(500).json({message:"Internal server error"});
    }	
})*/

app.post("/register", function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"}); 
		}

		userModel.create({userName:req.body.username, password:hash}).then(user => {
			if(!user){
				return res.status(500).json({message:"Internal server error"});
			}
			return res.status(201).json({message:"User registered!"});
		}).catch((err) => {
			console.log("Failed to create user. Reason",err);
				if(err.code === 11000){
					return res.status(409).json({message:"Username already in use"});
				}
				return res.status(500).json({message:"Internal server error"});
		})		
	})
	/*try {
		await sequelize.transaction(async function (transaction) {
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
	}	*/
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	let query = {userName:req.body.username}
	userModel.findOne({where: query}).then(user => {
		console.log(user);
		if(!user){
			return res.status(401).json({message:"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success){
			if(err){
				console.log("Comparing passwords failed. Reason",err);
				return res.status(500).json({message:"Internal server error"});
			}
			if(!success){
				return res.status(401).json({message:"Unauthorized bcrypt"});
			}
			let token = createToken();
			let now = Date.now();

			sessionModel.upsert({userid:user.id, token:token, ttl:now+time_to_live_diff}).then(item => {
				console.log(item);
				return res.status(200).json({token:token});
			}).catch((err) => {
				console.log("Saving session failed. Reason",err);
				return res.status(500).json({message:"Internal server error"});
			})			
		})		
	}).catch((err) => {
		console.log("Failed to login. Reason",err);
		return res.status(500).json({message:"Internal server error"});
	}).finally(() => {
		
	}) 
});

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"});
	}
	sessionModel.destroy({where: {token:req.headers.token}},function(err){
		if(err){
			console.log("Failed to logout user. Reason",err);
		}
		return res.status(200).json({message:"Logged out"});
	}).then(items => {
		return res.status(200).json({message:"Logged out"});
	}).catch((err) => {
		console.log("Failed to logout user. Reason",err);
	})
	
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);