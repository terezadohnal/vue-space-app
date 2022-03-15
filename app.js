const express = require("express");
const { home } = require("osenv");
const { initializeDatabase } = require("./database/database");
const app = express();
const homepageRouter = require("./routes/homepage");

initializeDatabase();
app.use(express.json());

app.use("/", homepageRouter);

const port = 3030;
app.listen(port, () => {
  console.log("Hello friends from port " + port);
});
