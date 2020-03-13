const express = require("express");
const router = express.Router();

const Equipe = require("../../models/Equipe");
const Match = require("../../models/Match");
router.get("/test", (req, res) => {
  res.status(200).json({ msg: "hello match" });
});

/**
 * @route POST /api/match/:equipeA_id/:equipeB_id
 * @Desc Add a match
 * @access Public
 */
router.post("/:equipeA_id/:equipeB_id", (req, res) => {
  if (req.body.title === undefined || req.body.title.trim().length === 0) {
    return res.status(400).json({ error: "title match field is required" });
  }
  const equipeA_id = req.params.equipeA_id;
  const equipeB_id = req.params.equipeB_id;
  Equipe.findById(equipeA_id)
    .then(equipeA => {
      if (!equipeA) {
        return res
          .status(404)
          .json({ error: "there is no League with that id" });
      }
      return equipeA;
    })
    .then(equipe => {
      Equipe.findById(equipeB_id).then(equipeB => {
        if (!equipeB) {
          res.status(404).json({ error: "there is no league with that id" });
        }
        const newMatch = new Match({
          equipeA: equipe._id,
          equipeB: equipeB_id,
          title: req.body.title
        });
        newMatch.save().then(match => res.status(200).json(match));
      });
    })
    .catch(e => res.status(400).json(e));
});
/**
 * @route GET /api/match
 * @Desc GET all match
 * @access Public
 */
router.get("/", (req, res) => {
  Match.find()
    .populate("equipeA")
    .populate("equipeB")
    .exec()
    .then(matchs => {
      return res.status(200).json(matchs);
    });
});

module.exports = router;
