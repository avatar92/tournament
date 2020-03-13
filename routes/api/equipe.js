const express = require("express");
const router = express.Router();

const Equipe = require("../../models/Equipe");

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "hello equipe" });
});

//@route POST /api/equipe
//@desc add a Team to the database
//@access public
router.post("/", (req, res) => {
  let error;
  if (req.body.title.length === 0) {
    error = "Team title field is required";
    return res.status(400).json({ errors });
  }
  const newEquipe = new Equipe({
    title: req.body.title
  });
  newEquipe.save().then(equipe => res.status(200).json({ equipe })).catch(e=>res.status(400).json(e))
});
//@route GET /api/equipe
//@desc GET all Team from the database in an array
//@access public
router.get("/", (req, res) => {
  Equipe.find()
    .then(equipes => res.status(200).json(equipes))
    .catch(e => res.status(400).json(e));
});

module.exports = router;
