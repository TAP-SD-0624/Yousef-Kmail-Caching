import express from "express";
import cache from "node-cache";
import { Calculate } from "./Utils/HeavyCalculation.js";

//initialize express app
const app = express();

//initialize in-memory cache.
const mycache = new cache();

//endpoint to test caching.
app.get("/", async (req, res) => {
  let data = mycache.get("heavy-data");
  if (!data) {
    console.log("Calculating new data");
    data = await Calculate();
    mycache.set("heavy-data", data, 10);
  }
  res.status(200).json(data);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
