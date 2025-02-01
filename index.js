import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;
const weatherArray = [];

const myApiKey = "0c19fb17b8205877843488efe5d9b26c";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const lat = req.body["lat"];
  const long = req.body["long"];
  console.log(lat);
  console.log(long);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myApiKey}`

    );
    
    const result = response.data;

    const fullObj = {...result, cTemp :Math.round(result.main.temp - 273.15)};
    weatherArray.push(fullObj);
    console.log(fullObj);
   
    
    res.render("index.ejs", {content : weatherArray});
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
