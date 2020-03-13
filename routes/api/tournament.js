const express = require("express");
const router = express.Router();

const Match = require("../../models/Match");
const Tournament = require("../../models/Tournament");

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "hello test" });
});
/**
 * @route POST /api/tournament/:matchA_id/:matchB_id
 * @description add a new tournament
 * @access public
 */
router.post("/:matchA_id/:matchB_id", (req, res) => {
  if (req.body.title === undefined || req.body.title.trim().length === 0) {
    return res.status(400).json({ error: "title match field is required" });
  }
  const matchA_id = req.params.matchA_id;
  const matchB_id = req.params.matchB_id;
  Match.findById(matchA_id)
    .then(matchA => {
      if (!matchA) {
        return res
          .status(404)
          .json({ error: "there is no matchA with that id" });
      }
      //   console.log(matchA)
      return matchA;
    })
    .then(match => {
      Match.findById(matchB_id).then(matchB => {
        if (!matchB) {
          res.status(404).json({ error: "there is no matchB with that id" });
        }
        // console.log(matchB)
        const newTournament = new Tournament({
          matchA: match._id,
          matchB: matchB_id,
          title: req.body.title
        });
        newTournament
          .save()
          .then(tournament => res.status(200).json(tournament));
      });
    })
    .catch(e => res.status(400).json(e));
});
/**
 * @route GET /api/tournament
 * @description GEt All tournament
 * @access public
 */
router.get("/", (req, res) => {
  Tournament.find()
    .populate("matchA")
    .populate("matchB")
    .exec()
    .then(tournaments => {
      if (!tournaments) {
        return res.json(404).json({ error: "no tournaments found" });
      }
      return res.status(200).json(tournaments);
    })
    .catch(e => res.status(400).json(e));
});

module.exports = router;
