const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("cannot connect to database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    msg: "express template",
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
