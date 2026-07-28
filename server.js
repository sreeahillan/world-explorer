
import express from "express";
import axios from "axios";
import 'dotenv/config';


const app = express();
const port = 3000;
let url = "https://api.restcountries.com"
const API_KEY = process.env.API_KEY;
let config =  {headers: { 'Authorization': `Bearer ${API_KEY}` }}


app.get("/" , (req , res) => {
    res.send("world explorer is running")
    console.log(API_KEY);
});

app.get("/joke" , async (req , res) => {
    const country = req.query.country;
    const result = await axios.get(url + `/countries/v5/names.common/${country}` , config);
    console.log(result.data);
    
});

app.listen(port , () => {
    console.log(`world explorer is running in the port ${port}`);  
});