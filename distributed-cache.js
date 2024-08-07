import express from "express";
import { Calculate } from "./Utils/HeavyCalculation.js";
import { Redis } from "ioredis";
import { config } from "dotenv";

const app = express();
config();

//creating single distributed cache server.
const redis = new Redis(process.env.REDIS_KEY);

// Endpoint;
app.get("/", async (req, res) => {
  try {
    let data = await redis.get("heavy-data");
    if (!data) {
      console.log("Calculating new data");
      data = await Calculate();
      await redis.set("heavy-data", data);
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
