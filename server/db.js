const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "WPIboy23$", //maybe we can hide this password in a .env file? would require npm i dotenv
    port: 5432,
    database: "perntodo"
});

module.exports = pool;