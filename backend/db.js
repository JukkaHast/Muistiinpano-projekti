const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
  	// we will be saving our db as a file on this path
    storage: 'tietokanta/database.sqlite', // or ':memory:'
});

module.exports = {sequelize}