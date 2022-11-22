import express from "express";
import Url from "../models/Url.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const router = express.Router();

// Get all paths
router.get("/all", async (req, res, next) => {
  console.log("Get all urls");
  await Url.find({})
    .sort({ _id: -1 })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.get("/all/summary", async (req, res, next) => {
  console.log("Get all url summary");
  let retData = {
    totalClicks: 0,
    topLink: "",
    topLinkClicks: 0
  };

  // find totalClicks
  await Url.aggregate([
    { $group: { _id: null, totalClicks: { $sum: "$clicks" } } },
  ]).then((data) => {
    console.log(data);
    retData.totalClicks = data[0].totalClicks;
  });

  // find topUrl
  let topUrl = await Url.find({}, { shortUrl: 1, clicks: 1 }).sort({ clicks: -1 }).limit(1);

  if (topUrl.length > 0) {
    retData.topLink = topUrl[0].shortUrl;
    retData.topLinkClicks = topUrl[0].clicks;
  }

  return res.json(retData);
});

router.get("/:urlId", async (req, res) => {
  console.log("Get certain url");
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url);
    console.log(req.params.urlId);
    if (url) {
      return res.json(url);
    } else {
      res.status(404).json("Not found");
    }
  } catch (e) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

export default router;
