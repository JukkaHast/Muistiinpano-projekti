const { sequelize } = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
	// Model attributes are defined here
	userName: {
	  type: DataTypes.STRING,
	  allowNull: false
	},
	password: {
	  type: DataTypes.STRING,
	  allowNull:false
	  // allowNull defaults to true
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
User.sync();
module.exports = sequelize.model("user", User);

