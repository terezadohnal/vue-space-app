const express = require("express");
const { initializeDatabase } = require("./database/database");
const app = express();
const homepageRouter = require("./routes/homepage");
const userRouter = require("./routes/user");
const flightRouter = require("./routes/flight");
const cors = require("cors");
const config = require("./config");

initializeDatabase();

app.use(express.json());
app.use(
  cors({
    origin: config.allowedFEOrigin,
  })
);

app.use("/", homepageRouter);
app.use("/users", userRouter);
app.use("/flight", flightRouter);

const port = 3030;
app.listen(port, () => {
  console.log("Hello friends from port " + port);
});
