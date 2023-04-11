const sqlite3 = require("sqlite3").verbose();

const DB_PATH = "./todo.db";

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

const createTasksTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      completed INTEGER
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Created tasks table.");
  });
};

module.exports = { db, createTasksTable };
