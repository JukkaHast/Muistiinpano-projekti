const { sequelize } = require('../db');
const {DataTypes} = require('sequelize');

const Tag = sequelize.define('tag', {
	// Model attributes are defined here
	id: {
	  type: DataTypes.INTEGER,	  
	  autoIncrement:true,
	  primaryKey: true
	},
	tagName: {
	  type: DataTypes.STRING,
	  unique:true,
	  allowNull:false
	  // allowNull defaults to true
	}
}, {
	// Other model options go here
	timestamps:false
	
});
/*sequelize.sync().then(() => {
	console.log('Book table created successfully!');	
}).catch((error) => {
	console.error('Unable to create table : ', error);
}).finally(() => {
	
});*/
Tag.sync();
module.exports = sequelize.model("tag", Tag);

