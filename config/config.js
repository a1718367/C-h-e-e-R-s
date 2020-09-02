require("dotenv").config();
//Contains the login detail for various environements. Also contains environment variables to protect sensitive info.
module.exports = {
  "development": {
    "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
        "database": process.env.DBNAME,
          "host": process.env.DBHOST,
            "port": 3306,
              "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "zcy4cmud9cfoymy4",
    "password": "aj3dugv8nz0pp7vf",
    "database": "ulbwuh55bv36gdor",
    "host": "sq65ur5a5bj7flas.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql",
    "use_env_variable": "JAWSDB_URL"
  }

}