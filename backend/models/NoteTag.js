const { sequelize } = require('../db');
const Note = require('./Note');
const Tag = require('./Tag');



const NoteTag = sequelize.define('notetag', {
	/*user_id: {
		type: DataTypes.INTEGER,
		allowNull:false,
		references: {
		  model: User, 
		  key: 'id'
		  
		}
	  },
	id: {
	type: DataTypes.INTEGER,
	allowNull:false,
	references: {
		model: Tag, 
		key: 'tag_id'		
		}
	}	  
},{
	indexes: [
	{
	 primaryKey: true,
	 fields: ['user_id', 'tag_id']
	}]*/
},{timestamps:false});
Note.belongsToMany(Tag, { through: NoteTag });
Tag.belongsToMany(Note, { through: NoteTag });

NoteTag.sync();
module.exports = sequelize.model("notetag", NoteTag);

