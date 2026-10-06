const mysql = require("mysql2/promise");
const fs = require("fs");

function readSecret(filePath) {
  if (!filePath) {
    return undefined;
  }

  return fs.readFileSync(filePath, "utf8").trim();
}

const password =
  process.env.DB_PASSWORD ||
  readSecret(process.env.DB_PASSWORD_FILE);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "appuser",
  password,
  database: process.env.DB_NAME || "appdb",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;