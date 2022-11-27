const express = require("express");
const { deleteNote, addNote, editNote, getNotes, getTagNoteIds } = require("../modules/NoteModule");
const noteModel = require("../models/Note");
const { getTags, deleteTag, addTag } = require("../modules/TagModule");


const router = express.Router();


// Muistiinpano
router.get("/note",function(req,res) {
	//let query = {"userid":req.user}	
	getNotes(req,res);	
});
router.get("/notetags",function(req,res) {
	//let query = {"userid":req.user}	
	getTagNoteIds(req,res);	
});

router.post("/note",function(req,res) {
	addNote(req,res);
	//console.log(req.body);
})

router.delete("/note/:id",function(req,res) {	
	deleteNote(req,res);
})

router.put("/note/:id",function(req,res) {
	editNote(req,res);
	/*if(!req.body){
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
	  })();*/	  
})
// Tagit
router.get("/tag",function(req,res) {	
	getTags(req,res);	
});

router.delete("/tag/:id",function(req,res) {	
	deleteTag(req,res);
})

router.post("/tag",function(req,res) {
	addTag(req,res);
	//console.log(req.body);
})
// 

module.exports = router;


