const { sequelize } = require('../db');
const {DataTypes} = require('sequelize');
const User = require('./User');

const Note = sequelize.define('note', {
	// Model attributes are defined here
	otsikko: {
		type: DataTypes.STRING
	},
	text: {
	  	type: DataTypes.TEXT('long'),
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull:false,
		references: {
		  	model: User,
		  	key: 'id'		  
		}
	  }
}, {
	// Other model options go here
});
User.hasMany(Note)
Note.belongsTo(User)
/*sequelize.sync().then(() => {
	console.log('Book table created successfully!');	
}).catch((error) => {
	console.error('Unable to create table : ', error);
}).finally(() => {
	
});*/
Note.sync();
module.exports = sequelize.model("note", Note);