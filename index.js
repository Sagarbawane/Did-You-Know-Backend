const express = require("express");
const configuredb = require("./config/database");
const cors = require("cors");
// const router = require("./config/route");
const app = express();
const router = require("./config/route");

const port = 3090;
configuredb();
app.use(cors());
app.use(express.json());
app.use(router);
// app.use(router);

app.listen(port, () => {
  console.log("server is runnig on port", port);
});
