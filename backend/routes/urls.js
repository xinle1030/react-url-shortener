import express from "express";
import Url from "../models/Url.js";
import Metric from "../models/Metric.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
import { getAllMetricsSummary, getMetricsSummaryByIds } from "./metrics.js";

const router = express.Router();

// Get all link summary
router.get("/all/summary", async (req, res, next) => {
  console.log("Get all url summary");
  let retData = {
    totalClicks: 0,
    topLink: "",
    topLinkClicks: 0,
    topCountry: "",
    countryCount: [],
  };

  // find totalClicks
  await Url.aggregate([
    { $group: { _id: null, totalClicks: { $sum: "$clicks" } } },
  ]).then((data) => {
    if (data && data.length > 0) {
      console.log(data);
      retData.totalClicks = data[0].totalClicks;
    }
  });

  // find topUrl
  let topUrl = await Url.find({}, { shortUrl: 1, clicks: 1 })
    .sort({ clicks: -1 })
    .limit(1);

  if (topUrl.length > 0) {
    retData.topLink = topUrl[0].shortUrl;
    retData.topLinkClicks = topUrl[0].clicks;
  }

  // find top country
  let allMetricsSummary = Promise.resolve(await getAllMetricsSummary());

  retData.topCountry = (await allMetricsSummary).topCountry;
  retData.countryCount = (await allMetricsSummary).countryCount;

  console.log(retData);

  return res.json(retData);
});

// Get all links
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

// Get summary for a link
router.get("/:urlId/summary", async (req, res) => {
  console.log("Get certain url summary");

  let retData = {
    clicks: 0,
    topCountry: "",
    countryCount: [],
    metricIds: [],
  };

  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      retData.clicks = url.clicks;

      let metricIds = url.metrics;

      retData.metricIds = metricIds;

      let metricsSummary = Promise.resolve(
        await getMetricsSummaryByIds(metricIds)
      );

      retData.topCountry = (await metricsSummary).topCountry;
      retData.countryCount = (await metricsSummary).countryCount;
    } else {
      res.status(404).json("Not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }

  return res.json(retData);
});

// Get information for a link
router.get("/:urlId", async (req, res) => {
  console.log("Get certain url");
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
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