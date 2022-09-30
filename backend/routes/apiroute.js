const {sequelize} = require("../db");
const express = require("express");
const noteModel = require("../models/Note");
const { deleteNote } = require("../modules/deleteNote");

const router = express.Router();
//DATABASE


router.get("/note",function(req,res) {
	//let query = {"userid":req.user}	
	noteModel.findAll({where: {userId:req.headers.userid}}).then(items => {		
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
	/*let item = new noteModel({		
		text:req.body.text,
		userid:req.body.userid,		
	})*/

	try {
        sequelize.transaction(async function (transaction) {
            // chain all your queries here. make sure you return them.
			//await userModel.sync({transaction});
            const note = await noteModel.create({
                text: req.body.notetext,
				userId: req.body.userid,				
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

router.delete("/note/:id",function(req,res) {
	/*try {
		sequelize.transaction(async function(transaction){
			const noterem = await noteModel.destroy({
				where: {id:req.params.id, userId:req.headers.userid}
			}, {transaction});
			return noterem;
		});
		console.log("successfully deleted");
		return res.status(201).json({message:"Deleted"})
	} catch (error) {
		console.log("Failed to delete note. Reason",error);
		return res.status(500).json({message:"Internal server error"})
	}*/
	deleteNote(req,res);
})

router.put("/note/:id",function(req,res) {
	if(!req.body){
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.notetext){
		return res.status(400).json({message:"Bad request"})
	}

	(async () => {
		try {
			await sequelize.transaction(async function(transaction) {
				const noteupd = await noteModel.update({text:req.body.notetext},
					{ where: {
						id:req.params.id,userId:req.headers.userid}
				}, {transaction});
				return noteupd;
			});
			console.log("successfully edited");
			return res.status(201).json({message:"Edit performed succesfully"});
		} catch (error) {
			console.log("Failed to edit note. Reason",error);
			return res.status(500).json({message:"Internal server error"})
		}	
	  })();
	
})

module.exports = router;


