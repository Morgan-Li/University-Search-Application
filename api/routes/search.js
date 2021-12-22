const router = require("express").Router();
const Uni = require("../models/uniInfo");

//sample postman request http://localhost:5000/api/search?PriLang=English&Location=Canada

//http://localhost:5000/api/search?PriLang=English&Location=Canada&Dom_Frgn_Ratio=40&Program=Math&FTutition=400&DTutition=500

router.get("/", async (req, res) => {
    try {
      let queryPriLang = req.query.PriLang;
      let queryLocation = req.query.Location;

      if(req.query.Dom_Frgn_Ratio == "All") {
        queryDom_Frgn_Ratio = "0";
      }else {
        queryDom_Frgn_Ratio = req.query.Dom_Frgn_Ratio;
      }

      let queryProgram = req.query.Program;

      if(req.query.FTutition == "None") {
        parseInt(queryFTutition);
        queryFTutition = 900000;
      }else {
        queryFTutition = parseInt(req.query.FTutition);
      }
      if(req.query.DTutition == "None") {
        parseInt(queryDTutition);
        queryDTutition = 900000;
      }else {
        queryDTutition = parseInt(req.query.DTutition);
      }
      const queryUnis = await Uni.find(
        {PriLang: queryPriLang, 
        Location: {$regex:queryLocation},
        Dom_Frgn_Ratio:{$gte : queryDom_Frgn_Ratio},
        Prog_Offered: queryProgram,
        FTutition_Range:{$lte : queryFTutition},
        DTutition_Range: {$lte : queryDTutition},
        }, {Uname: 1, Rank: 1, Location: 1, Dom_Frgn_Ratio: 1,  Prog_Offered: 1, FTutition_Range:1, DTutition_Range: 1, Type: 1 }).sort({Rank: 1});

      res.status(200).json(queryUnis);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;