const {sequelize} = require("../db");
const express = require("express");
const noteModel = require("../models/Note");

const router = express.Router();
//DATABASE


router.get("/note",function(req,res) {
	//let query = {"userid":req.user}	
	noteModel.findAll({where: {userId:req.headers.userid}}).then(items => {
		//console.log(items);
		//items = JSON.parse(JSON.stringify(items));
		//console.log(items)
		
		return res.status(200).json(items);
	}).catch((error) => {
		console.error('Failed to retrieve data : ', error);
	});
});

router.post("/note",function(req,res) {
	if(!req.body){
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.notetext){
		return res.status(400).json({message:"Bad request"})
	}
	let item = new noteModel({		
		text:req.body.text,
		userid:req.body.userid,		
	})

	try {
        sequelize.transaction(async function (transaction) {
            // chain all your queries here. make sure you return them.
			//await userModel.sync({transaction});
            const note = await noteModel.create({
                text: req.body.notetext,
				userId: req.body.userid
            }, { transaction });           
            
            return note;
        });
		
        console.log('success');
		return res.status(201).json({message:"Created"});
    } catch (error) {
		console.log("Failed to create item. Reason",error);
		return res.status(500).json({message:"Internal server error"})
    }	
})

/*router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user},function(err){
		if(err) {
			console.log("Failed to remove item. Reason.",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"Success"});
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body){
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type){
		return res.status(400).json({message:"Bad request"})
	}
	let item = {		
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},
	item, function(err) {
		if(err) {
			console.log("Failed to update item. Reason",err);
			return res.status(500).json({message:"Internal server error"});
		}
		return res.status(200).json({message:"Success"});
	})
})*/

module.exports = router;


