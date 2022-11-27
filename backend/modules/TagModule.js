const {sequelize} = require("../db");
const tagModel = require("../models/Tag");

async function getTags(req,res){
	tagModel.findAll().then(tags => {
		return res.status(200).json(tags);
	}).catch((error) => {
		console.error('Failed to retrieve data : ', error);
		return res.status(500).json({message:"Internal server error"});
	});
}

async function addTag(req,res) {
	if(!req.body){
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.tagName){
		return res.status(400).json({message:"Bad request"});
	}	

	try {
        await sequelize.transaction(async function (transaction) {
            // chain all your queries here. make sure you return them.
			//await userModel.sync({transaction});
            const tag = await tagModel.create({
                tagName: req.body.tagName								
            }, { transaction });           
            
            return tag;
        });
		
        console.log('success');
		return res.status(201).json({message:"Created"});
    } catch (error) {
		console.log("Failed to create item. Reason",error);
		return res.status(500).json({message:"Internal server error"});
    }	
}

async function deleteTag(req, res){
	try {
		await sequelize.transaction(async function(transaction){
			const tagrem = await tagModel.destroy({
				where: {id:req.params.id}
			}, {transaction});
			return tagrem;
		});
		console.log("successfully deleted");
		return res.status(201).json({message:"Deleted"})
	} catch (error) {
		console.log("Failed to delete note. Reason",error);
		return res.status(500).json({message:"Internal server error"})
	}	
}

module.exports = {addTag, getTags, deleteTag};