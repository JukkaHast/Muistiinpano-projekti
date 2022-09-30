const {sequelize} = require("../db");
const noteModel = require("../models/Note");

async function deleteNote(req, res){
	try {
		await sequelize.transaction(async function(transaction){
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
	}	
}
module.exports = {deleteNote};


