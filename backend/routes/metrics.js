import express from "express";
import Metric from "../models/Metric.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
import ObjectId from "mongodb";

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Get certain metrics");

  let objectIds = req.query.metricIds;

  await Metric.find({
    _id: { $in: objectIds },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.get("/summary", async (req, res, next) => {
  console.log("Get certain metrics summary");
  let retData = {
    topCountry: "",
    countryCount: [],
  };
  let ids = req.query.metricIds;
  if (ids) {
    let objectIds = ids.map((id) => ObjectId.ObjectId(id));

    await Metric.aggregate([
      { $match: { _id: { $in: objectIds } } },
      {
        $group: {
          _id: {
            country: "$country",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $group: {
          _id: {
            country: "$_id.country",
          },
          count: {
            $first: "$count",
          },
        },
      },
      {
        $sort: {
          count: -1,
          "_id.country": 1,
        },
      },
    ]).then((data) => {
      console.log(data);
      if (data.length > 0) {
        retData.topCountry = data[0]["_id"]["country"];
        data.forEach((eachData) => {
          retData.countryCount.push({
            country: eachData["_id"]["country"],
            count: eachData.count,
          });
        });
      }
    });
  }

  return res.json(retData);
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

router.get("/all/summary", async (req, res, next) => {
  let retData = {
    topCountry: "",
    countryCount: [],
  };

  // find top country
  await Metric.aggregate([
    {
      $group: {
        _id: {
          country: "$country",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: {
          country: "$_id.country",
        },
        count: {
          $first: "$count",
        },
      },
    },
    {
      $sort: {
        "_id.country": 1,
        count: -1,
      },
    },
  ]).then((data) => {
    if (data.length > 0) {
      retData.topCountry = data[0]["_id"]["country"];
      data.forEach((eachData) => {
        retData.countryCount.push({
          country: eachData["_id"]["country"],
          count: eachData.count,
        });
      });
    }
    return res.json(retData);
  });
});

export default router;
