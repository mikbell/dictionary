import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT;
const apiKey = process.env.API_KEY

app.set("view engine", "ejs");

const BASE_URL = "https://wordsapiv1.p.rapidapi.com/words/";

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.get("/words", async (req, res) => {
	const searchWord = req.query.search || "example";

	try {
		const response = await axios.get(`${BASE_URL}${searchWord}`, {
			headers: {
				"x-rapidapi-key": apiKey,
				"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
			},
		});
		console.log(response.data);
		res.render("index.ejs", { word: response.data });
	} catch (error) {
		console.error(error);
		res.render("index.ejs", { word: null, error: "Word not found" });
	}
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
