const { sequelize } = require('../db');
const {DataTypes} = require('sequelize');

const Session = sequelize.define('session', {
	// Model attributes are defined here
	userid: {
	  type: DataTypes.NUMBER,	  
	  unique:true
	},
	token: {
	  type: DataTypes.STRING,
	  unique:true,
	  allowNull:false
	  // allowNull defaults to true
	},
	ttl: {
		type:DataTypes.NUMBER,
		allowNull:false
	}
}, {
	// Other model options go here
});
/*sequelize.sync().then(() => {
	console.log('Book table created successfully!');	
}).catch((error) => {
	console.error('Unable to create table : ', error);
}).finally(() => {
	
});*/
Session.sync();
module.exports = sequelize.model("session", Session);