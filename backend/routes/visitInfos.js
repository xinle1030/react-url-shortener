import express from "express";
import VisitInfo from "../models/VisitInfo.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log("Get certain visitInfos");
  
    let objectIds = req.query.visitInfoIds;
  
    await VisitInfo.find({
      _id: { $in: objectIds },
    })
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
    console.log("Get all visitInfos");
    await VisitInfo.find({})
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  });

export default router;
