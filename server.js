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

app.post("/explore", async (req, res) => {
  try {
    const country_name = req.body.input.trim();
    const result = await axios.get(
      url + `/countries/v5/names.common/${country_name}`,
      config,
    );

    const countries = result.data.data.objects;

    if (countries.length === 0) {
      return res.render("index.ejs", {
        error: "No country found with that name.",
      });
    }

    const country = countries[0];

    const countryData = {
      country_common_name: country.names.common,
      country_capital_name: country.capitals[0].name,
      country_region_name: country.region,
      country_population: country.population,
      country_currency_name: country.currencies[0].name,
      country_currency_symbol: country.currencies[0].symbol,
      country_language_names: country.languages.map((obj) => obj.name),
      country_continent_name: country.continents,
      country_callingcode: country.calling_codes,
      country_flag: country.flag.url_png,
      country_driving_side: country.cars.driving_side,
    };

    res.render("index.ejs", {
      data: countryData,
    });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", {
      error: "Something went wrong. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`world explorer is running in the port ${port}`);
});
