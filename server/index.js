const express = require("express");
const cors = require("cors");
const { createTasksTable } = require("./database");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

createTasksTable();
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
