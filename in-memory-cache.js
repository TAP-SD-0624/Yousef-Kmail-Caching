import express from "express";
import cache from "node-cache";
import { Calculate } from "./Utils/HeavyCalculation.js";
const app = express();

const mycache = new cache();

app.get("/", (req, res) => {
  let data = mycache.get("heavy-data");
  if (!data) {
    console.log("Calculating new data");
    data = Calculate();
    mycache.set("heavy-data", data, 10);
  }
  res.status(200).json(data);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
