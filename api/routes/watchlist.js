const router = require("express").Router();
const savedUni = require("../models/savedUni");

//sample postman request 

//http://localhost:5000/api/watchlist?username=Cat

/*
{
    "username": "Cat",
    "Rank": 1,
    "Uname": "University of Calgary",
    "Location": "Canada, Alberta, Calgary",
    "Website": "https://www.ucalgary.ca/",
    "_id": "61c38ef768a1f8538587147f",
    "__v": 0
}
*/

//End point to retrieve all unis on watch list by username. Project by Uname, Rank, Location, UniID. And sort by rank
router.get("/", async (req, res) => {
    try {
      let queryUsername = req.query.username;
        
      const querySavedUnis = await savedUni.find(
        {username: queryUsername, 
        }, {Uname: 1, Rank: 1, Location: 1, UniID: 1 }).sort({Rank: 1});

      res.status(200).json(querySavedUnis);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//End point to save a uni to watchlist
router.post("/", async (req, res) => {
    const newSavedUni = new savedUni(req.body);
    try {
      const newWatchlist = await newSavedUni.save();
      res.status(200).json(newWatchlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//End point to check if uni is already on user's watchlist
router.get("/alreadySaved", async (req, res) => {
  try {
    let queryUsername = req.query.username;
    let queryUniID = req.query.UniID;
      
    const querySavedUnis = await savedUni.find(
      {username: queryUsername, 
          UniID : queryUniID,
      }, {Uname: 1, Rank: 1, Location: 1, UniID: 1 });

    res.status(200).json(querySavedUnis);
  } catch (err) {
    res.status(500).json(err);
  }
});

//End point to remove a university from watchlist
router.delete("/alreadySaved", async (req, res) => {
  try {
    let queryUsername = req.query.username;
    let queryUniID = req.query.UniID;
    await savedUni.deleteOne(
      {username: queryUsername, 
          UniID : queryUniID,});
    res.status(200).json("Deleted from watchlist");
  } catch (err) {
    res.status(500).json(err);
  }
});

//End point to delete all instances of a university from all watchlist by UniID
//Used for cleanup when deleting a uni
router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const updatedUni = await savedUni.updateMany({UniID: req.params.id},
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

//End point to delete all instances of a university from all watchlist by UniID
//Used for cleanup when deleting a uni
router.put("/:id", async (req, res) => {
  try {
    await savedUni.deleteMany({UniID: req.params.id});
    res.status(200).json("Deleted saved unis");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;