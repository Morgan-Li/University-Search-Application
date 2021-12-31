const router = require("express").Router();
const Uni = require("../models/uniInfo");

//sample postman request 

//http://localhost:5000/api/search?PriLang=English&Location=Canada&Dom_Frgn_Ratio=40&Program=Math&FTutition=40000&DTutition=50000

//Endpoint for search query using params
router.get("/", async (req, res) => {
    try {
      let query2 = "";
      let query3 = "";

      if(req.query.PriLang == "All") {
        queryPriLang = {$type: "string"};
      }else {
        queryPriLang = req.query.PriLang;
      }

      if(req.query.Location == "All") {
        queryLocation = req.query.Location;
        query2 = {$type: "string"};
      }else {
        queryLocation = req.query.Location;
      }

      if(req.query.Dom_Frgn_Ratio == "All") {
        queryDom_Frgn_Ratio = "0";
      }else {
        queryDom_Frgn_Ratio = req.query.Dom_Frgn_Ratio;
      }

      if(req.query.Program == "All") {
        queryProgram = req.query.Program;
        query3 = {$type: "string"};
      }else {
        queryProgram = req.query.Program;
      }

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
        $or: [{ Prog_Offered: queryProgram}, {Prog_Offered: query3}], 
        FTutition_Range:{$lte : queryFTutition},
        DTutition_Range: {$lte : queryDTutition},
        }, {Uname: 1, Rank: 1, Location: 1, Dom_Frgn_Ratio: 1,  Prog_Offered: 1, FTutition_Range:1, DTutition_Range: 1, Type: 1 }).sort({Rank: 1});
      res.status(200).json(queryUnis);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;