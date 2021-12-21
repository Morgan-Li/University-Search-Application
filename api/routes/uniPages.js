const router = require("express").Router();
const Uni = require("../models/uniInfo");
const Comment = require("../models/comment");

//CREATE UNI
router.post("/", async (req, res) => {
    const newUni = new Uni(req.body);
    try {
      const savedUni = await newUni.save();
      res.status(200).json(savedUni);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all unis for homepage
router.get("/", async (req, res) => {
    try {
      const unis = await Uni.find( {}, {Uname: 1, Rank: 1, Location: 1}).sort({Rank: 1});
      res.status(200).json(unis);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a single uni by id for single unipage
router.get("/:id", async (req, res) => {
    try {
      const singleUni = await Uni.findById(req.params.id);
      res.status(200).json(singleUni);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//post a comment
router.post("/comment", async (req, res) => {
    const newComment = new Comment({
        UniName: req.body.Uname,
        username: req.body.Username,
        desc: req.body.Description,
    });

    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get all comments for uni page
router.get("/:id/comment", async (req, res) => {
    try {
      let queryParam = req.query.UniName;
      console.log(queryParam);
      const comments = await Comment.find({UniName: queryParam});
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  /* Sample Json post
  {
    "Rank": "1",
    "Uname": "University of Calgary",
    "Prog_Offered": [
        "Math",
        "Computer Science",
        "Philosophy"
    ],
    "Dom_Frgn_Ratio": "60:40",
    "PriLang": "English",
    "Location": "Canada, Alberta, Calgary",
    "FTutition_Range": "1-99999",
    "DTutition_Range": "1-99999",
    "Website": "https://www.ucalgary.ca/",
    "Type": "Verified"
}
*/


module.exports = router;