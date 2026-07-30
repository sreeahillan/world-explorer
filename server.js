import express from "express";
import axios from "axios";
import body from "body-parser";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(body.urlencoded({ extended: true }));

const url = "https://api.restcountries.com";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  try {
    const country_name = req.body.input;
    const result = await axios.get(
      url + `/countries/v5/names.common/${country_name}`,
      config,
    );
    let pop = JSON.stringify(result.data.data.objects[0].population)
    const country_data = {
      country_common_name: result.data.data.objects[0].names.common,
      country_capital_name: result.data.data.objects[0].capitals[0].name,
      country_region_name: result.data.data.objects[0].region,
      country_population: pop,
      country_currency_name: result.data.data.objects[0].currencies[0].name,
      country_currency_symbol: result.data.data.objects[0].currencies[0].symbol,
      country_language_names: result.data.data.objects[0].languages.map(
        (obj) => obj.name,
      ),
      country_continent_name: result.data.data.objects[0].continents,
      country_callingcode: result.data.data.objects[0].calling_codes,
      country_flag: result.data.data.objects[0].flag.url_png,
      country_driving_side: result.data.data.objects[0].cars.driving_side,
    };

    
    res.render("index.ejs", {
      data: country_data,
    });
    
  } catch (error) {
    console.log(error.message);

    res.render("index.ejs", {
      error_displayed: "Type the name correctly",
    });
  }
});

app.get("/joke", async (req, res) => {
  const country = req.query.country;
  const result = await axios.get(
    url + `/countries/v5/names.common/${country}`,
    config,
  );
});

app.listen(port, () => {
  console.log(`world explorer is running in the port ${port}`);
});
