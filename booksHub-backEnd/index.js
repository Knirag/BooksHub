const express = require("express");
const app = express();
const port = process.emv.PORT|| 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});