require("dotenv").config();

//connect setup
module.exports = {
  // client: "mysql2",
  // connection: {
  //   host: process.env.DB_LOCAL_HOST,
  //   database: process.env.DB_LOCAL_DBNAME,
  //   user: process.env.DB_LOCAL_USER,
  //   password: process.env.DB_LOCAL_PASSWORD,
  //   charset: "utf8",
  //         typeCast: function (field, next) {
  //           if (field.type == 'DATE' || field.type == 'TIMESTAMP') {
  //             return field.string();
  //           }
  //           return next();
  //         }
  // },
   client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
          typeCast: function (field, next) {
            if (field.type == 'DATE' || field.type == 'TIMESTAMP') {
              return field.string();
            }
            return next();
          }
  },
};
