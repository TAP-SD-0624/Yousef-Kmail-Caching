import express from "express";
import { Calculate } from "./Utils/HeavyCalculation.js";
import { createClient, createCluster } from "redis";
const app = express();

//creating single distributed cache server.
const redisCache = createClient({ url: "redis://127.0.0.1:6378" });

//creating multiple clusters.
const redisClusters = createCluster({
  rootNodes: [
    { url: "redis://127.0.0.1:6378" },
    { url: "redis://127.0.0.1:6379" },
  ],
});

//listening on errors
redisCache.on("error", (err) => console.log(`error occured, details: ${err}`));

//connect to redis server.
await redisCache.connect();
await redisClusters.connect();

//Endpoint
app.get("/", (req, res) => {
  let data = redisCache.get("heavy-data");
  if (!data) {
    console.log("Calculating new data");
    data = Calculate();
    redisCache.set("heavy-data", data, 10);
  }
  res.status(200).json(data);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
