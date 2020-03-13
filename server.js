const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use("/api/tournoi", tournoi);

app.listen(port, () => {
  console.log("server is up and running in port 5000");
});
