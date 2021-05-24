// app.js
const express = require("express");
const path = require("path");

// Create Express app
const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
// A sample route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Start the Express server
app.listen(3000, () => console.log("Server running on port 3000!"));
