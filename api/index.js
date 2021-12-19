const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//create profile instance ENDPOINT 6
app.post('/api/:student/profiles', async (req, res) => {
	console.log(req.body)
	try {
		await profile.create({
			Stud_ID: req.params.Stud_ID,
			PName: req.body.PName,
			Program: req.body.Program,
			PriLang: req.body.PriLang,
			Location: req.body.Location,
			MaxRank: req.body.MaxRank,
			FTutition_Range: req.FTutition_Range,
			DTutition_Range: req.body.DTutition_Range,
			Profile_Order: req.body.Profile_Order,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate insititute' })
	}
})

//get sorted array of profiles ENDPOINT 7
app.get('/api/:student/profiles', async (req, res) => {
	console.log(req.body)
	try {
		await profile.find(
			{ sort: { PNumber: 1} }, //Need to generate through backend
			{ PNumber: 1, PName: 1}
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//edit student profile ENDPOINT 8
app.put('/api/:student/profiles/edit', async (req, res) => {
	console.log(req.body)
	try {
		await profile.updateOne(
			{Stud_ID: req.params.Stud_ID},
			{PName: req.params.PName},
			{ $set: { PName: req.body.PName,
					Program: req.body.Program,
					PriLang: req.body.PriLang,
					Location: req.body.Location,
					MaxRank: req.body.MaxRank,
					FTutition_Range: req.FTutition_Range,
					DTutition_Range: req.body.DTutition_Range,
					Profile_Order: req.body.Profile_Order,
			 } }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//delete student profile ENDPOINT 9
app.delete('/api/:student/profiles', async (req, res) => {
	console.log(req.body)
	try {
		await profile.deleteOne(
			{PName: req.body.PName},
			{Stud_ID: req.params.Stud_ID},
			{PNumber: req.body.PNumber},
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//get a single profile ENDPOINT 10
app.get('/api/student/profiles', async (req, res) => {
	console.log(req.body)
	try {
		await profile.find(
			{PName: req.body.PName},
			{Stud_ID: req.params.Stud_ID},
			{PNumber: req.body.PNumber},
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//get a single profile ENDPOINT 11
app.get('/api/student/profiles/result', async (req, res) => {
	console.log(req.body)
	try {
		await profile.find(
			{ rank: { $gte: req.query.MaxRank } },
			{ Program: req.body.Program },
			{ PriLang: req.body.PriLang },
			{ Location: req.body.Location },
			{ FTutition_Range: req.FTutition_Range },
			{ DTutition_Range: req.body.DTutition_Range },
			{ sort: { rank: 1} }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//post a comment ENDPOINT 12
app.post('/api/:student/uni-page/comment', async (req, res) => {
	console.log(req.body)
	try {
		await comment.create({
			UName: req.params.UName,
			Stud_ID: req.body.Stud_ID,
			Alias: req.body.Alias,
			Text: req.body.Text,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate insititute' })
	}
})

//Need endpoint to load comments


//edit uniInfo page ENDPOINT 13
app.put('/api/:UName/edit', async (req, res) => {
	console.log(req.body)
	try {
		await uniInfo.updateOne(
			{ UName: req.params.UName },
			{ $set: { UName: req.body.UName,
					  Prog_Offered: req.body.Prog_Offered,
					  Dom_Frgn_Ratio: req.body.Dom_Frgn_Ratio,
					  PriLang: req.body.PriLang,
					  Location: req.body.Location,
					  Rank: req.body.Rank,
					  FTutition_Range: req.FTutition_Range,
					  DTutition_Range: req.body.DTutition_Range,
					  Website: req.body.Website,
			 } }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//verify institution ENDPOINT 14
app.put('/api/admin/verify', async (req, res) => {
	console.log(req.body)
	try {
		await uniInfo.updateOne(
			{ UName: req.params.UName },
			{ email: req.params.email },
			{ $set: { Type: "verified"} }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//Is this delete the institution acc or remove verification status
//delete unverified institution ENDPOINT 15
app.delete('/api/admin/unverify', async (req, res) => {
	console.log(req.body)
	try {
		await unvInstitute.deleteOne(
			{ email: req.params.email },
			{ insName: req.params.insName }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//create uniinfo page ENDPOINT 16
app.post('/api/:UName/create-uni', async (req, res) => {
	console.log(req.body)
	try {
		await uniInfo.create({
			Uname: req.params.UName,
			Prog_Offered: req.body.Prog_Offered,
			Dom_Frgn_Ratio: req.body.Dom_Frgn_Ratio,
			PriLang: req.body.PriLang,
			Location: req.body.Location,
			Rank: req.body.Rank,
			FTutition_Range: req.FTutition_Range,
			DTutition_Range: req.body.DTutition_Range,
			Website: req.body.Website,
			Type: "Unverified",
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate insititute' })
	}
})

//END POINT 17 and 13 are duplicates

// Delete comment ENDPOINT 18
app.delete('/api/uni-page/comment/delete', async (req, res) => {
	console.log(req.body)
	try {
		await comment.deleteOne(
			{ UName: req.params.UName },
			{ CNumber: req.params.CNumber }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//check verified status ENDPOINT 19
app.get('/api/student/institute/ver-institute', async (req, res) => {
	console.log(req.body)
	try {
		await profile.find(
			{ insName: req.body.insName },
			{ Type: 1}
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})

//get X top rank ENDPOINT 20
//will be a query parameter ie, GET /api/top?rank=10 
app.get('/api/top', async (req, res) => {
	console.log(req.body)
	try {
		await uniInfo.find(
			{ rank: { $lte: req.query.rank } },
			{ sort: { rank: 1} }
		)
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'})
	}
})


app.use("/api/auth", authRoute);


app.listen("5000", () => {
  console.log("Backend is running.");
});