const router = require("express").Router();
const Uni = require("../models/uniInfo");
const Comment = require("../models/comment");

/* Sample Json post http://localhost:5000/api/uniPages
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
    "FTutition_Range": "99999",
    "DTutition_Range": "99999",
    "Website": "https://www.ucalgary.ca/",
    "Type": "Verified"
}
*/

//End point for creating new university
router.post("/", async (req, res) => {
    try{
      const newUni = new Uni(req.body);
      if(req.body.isAdmin) {
        try {
          const savedUni = await newUni.save();
          res.status(200).json(savedUni);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("Only admins can create universities!");
      }
    }catch (err) {
      res.status(500).json(err);
    }
  });

//End point to delete a university by ID
router.delete("/:id", async (req, res) => {
  try {
    if(req.body.isAdmin) {
      try {
        await Uni.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted university");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Only admins can delete universities!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//End point to delete all comments on a university page by ID
router.delete("/:id/comment", async (req, res) => {
  try {
    if(req.body.isAdmin) {
      try {
        await Comment.deleteMany({UniID: req.params.id});
        res.status(200).json("Deleted comments");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Only admins can delete university comments!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//End point for finding all Unis, projecting by Uname, Rank, and Location, then sorting by rank for homepage table
router.get("/", async (req, res) => {
    try {
      const unis = await Uni.find( {}, {Uname: 1, Rank: 1, Location: 1}).sort({Rank: 1});
      res.status(200).json(unis);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//End point for retrieving a single uni by unique ID to load individual uni webpage
router.get("/:id", async (req, res) => {
    try {
      const singleUni = await Uni.findById(req.params.id);
      res.status(200).json(singleUni);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//End point to find and update uni by ID
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

//End point to post a comment
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

//End point to get all comments on a single uni webpage
router.get("/:id/comment", async (req, res) => {
    try {
      let queryParam = req.params.id;
      const comments = await Comment.find({UniID: queryParam}).sort({createdAt: -1});
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;