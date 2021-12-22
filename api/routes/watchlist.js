const router = require("express").Router();
const savedUni = require("../models/savedUni");

//sample postman request http://localhost:5000/api/search?PriLang=English&Location=Canada

//http://localhost:5000/api/search?PriLang=English&Location=Canada&Dom_Frgn_Ratio=40&Program=Math&FTutition=400&DTutition=500

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

  //CREATE watchlist uni
router.post("/", async (req, res) => {
    const newSavedUni = new savedUni(req.body);
    try {
      const newWatchlist = await newSavedUni.save();
      res.status(200).json(newWatchlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

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

module.exports = router;