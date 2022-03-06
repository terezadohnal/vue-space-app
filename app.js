const express = require("express");
const { home } = require("osenv");
const app = express();

const homepageRouter = require("./routes/homepage");

app.use(express.json());

app.use("/", homepageRouter);

const port = 3030;
app.listen(port, () => {
  console.log("Hello friends from port " + port);
});
