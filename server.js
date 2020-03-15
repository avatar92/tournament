const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");

const equipe = require("./routes/api/equipe");
const match = require("./routes/api/match");
const tournament = require("./routes/api/tournament");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db =
  "mongodb+srv://adel123:adel123@cluster0-siyog.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("data base connected!!"))
  .catch(err => console.log(err));

app.get("/test", (req, res) => {
  res.json({ msg: "hello test" });
});

app.use("/api/equipe", equipe);
app.use("/api/match", match);
app.use("/api/tournament", tournament);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server is up and running in port 5000");
});
