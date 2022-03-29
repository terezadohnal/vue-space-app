const express = require("express");
const { home } = require("osenv");
const { initializeDatabase } = require("./database/database");
const app = express();
const homepageRouter = require("./routes/homepage");
const userRouter = require("./routes/user");
const flightRouter = require("./routes/flight");

initializeDatabase();
app.use(express.json());

app.use("/", homepageRouter);
app.use("/user", userRouter);
app.use("/flight", flightRouter);

const port = 3030;
app.listen(port, () => {
  console.log("Hello friends from port " + port);
});
