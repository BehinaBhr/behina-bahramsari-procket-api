require("dotenv").config();

//connect setup
module.exports = {
    client: "mysql2",
    connection: {
      host: process.env.DB_LOCAL_HOST,
      database: process.env.DB_LOCAL_DBNAME,
      user: process.env.DB_LOCAL_USER,
      password: process.env.DB_LOCAL_PASSWORD,
      charset: "utf8",
    },
  };