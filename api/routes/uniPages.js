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

//UPDATE UNI
router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const updatedUni = await Uni.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).json(updatedUni);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post a comment
router.post("/comment", async (req, res) => {
    const newComment = new Comment({
        UniID: req.body.UniID,
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
      let queryParam = req.params.id;
      const comments = await Comment.find({UniID: queryParam}).sort({createdAt: -1});
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete uni by id
router.delete("/:id", async (req, res) => {
  try {
    await Uni.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted university");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete uni comments 
router.delete("/:id/comment", async (req, res) => {
  try {
    await Comment.deleteMany({UniID: req.params.id});
    res.status(200).json("Deleted comments");
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

/*
[
    {
        "_id": "61c0f0c248885f3f7dee81db",
        "Rank": 1,
        "Uname": "University of Calgary",
        "Prog_Offered": [
            "Math",
            "Computer Science",
            "Philosophy"
        ],
        "Dom_Frgn_Ratio": "60",
        "PriLang": "English",
        "Location": "Canada, Alberta, Calgary",
        "FTutition_Range": 10000,
        "DTutition_Range": 4500,
        "Website": "https://www.ucalgary.ca/",
        "Type": "Verified",
        "__v": 0
    },
    {
        "_id": "61c0f08f48885f3f7dee81d8",
        "Rank": 2,
        "Uname": "University of Alberta",
        "Prog_Offered": [
            "Math",
            "Computer Science",
            "English"
        ],
        "Dom_Frgn_Ratio": "50",
        "PriLang": "English",
        "Location": "Canada, Alberta, Edmonton",
        "FTutition_Range": 15000,
        "DTutition_Range": 5000,
        "Website": "https://www.ualberta.ca/",
        "Type": "Unverified",
        "__v": 0
    },
    {
        "_id": "61c0f32048885f3f7dee81e7",
        "Rank": 3,
        "Uname": "Harvard University",
        "Prog_Offered": [
            "Math",
            "Computer Science",
            "Philosophy"
        ],
        "Dom_Frgn_Ratio": "70",
        "PriLang": "English",
        "Location": "United States, Massachusetts, Cambridge",
        "FTutition_Range": 50000,
        "DTutition_Range": 20000,
        "Website": "https://www.harvard.edu/",
        "Type": "Unverified",
        "__v": 0
    },
    {
        "_id": "61c41c47ec21264b035101af",
        "Rank": 4,
        "Uname": "Stanford University",
        "Prog_Offered": [
            "Math",
            "Science",
            "Arts"
        ],
        "Dom_Frgn_Ratio": "70",
        "PriLang": "English",
        "Location": "United States, California, Stanford",
        "FTutition_Range": 45000,
        "DTutition_Range": 18000,
        "Website": "https://www.stanford.edu/",
        "Type": "Unverified",
        "__v": 0
    }
]
*/

module.exports = router;