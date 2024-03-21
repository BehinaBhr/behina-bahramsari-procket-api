const knex = require("knex")(require("../knexfile"));

const getWelcomeMessage = (req, res) => {
    res.send('Welcome to Procket API in specific route');
};

module.exports = {
    getWelcomeMessage}