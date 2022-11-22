import express from "express";
import Metric from "../models/Metric.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log("Get certain metrics");
  
    let objectIds = req.query.metricIds;
  
    await Metric.find({
      _id: { $in: objectIds },
    }).sort({_id:-1})
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  });

// Get all paths
router.get("/all", async (req, res, next) => {
    console.log("Get all metrics");
    await Metric.find({})
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  });

export default router;
