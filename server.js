const express = require("express");

const app = express();

//routes
app.get("/", (req, resp) => {
  resp.send("Hello  from NODE API");
});

app.listen(3000, () => {
  console.log("Node API app is running on port 3000");
});
