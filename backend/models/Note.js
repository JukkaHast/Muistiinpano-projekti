const { sequelize } = require('../db');
const {DataTypes} = require('sequelize');
const User = require('./User');

const Note = sequelize.define('note', {
	// Model attributes are defined here
	text: {
	  type: DataTypes.TEXT,	  
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