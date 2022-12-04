import express from "express";
import Metric from "../models/Metric.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
import mongooseUtil from "mongoose";
const ObjectId = mongooseUtil.Types.ObjectId;

const router = express.Router();

// Get all metrics
router.get("/all", async (req, res, next) => {
  console.log("Get all metrics");
  await Metric.find({}).sort({ _id: -1 })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// Get certain metrics by ids
router.get("/", async (req, res, next) => {
  console.log("Get certain metrics");

  let objectIds = req.query.metricIds;
  console.log(objectIds);

  await Metric.find({
    _id: { $in: objectIds }})
    .sort({ _id: -1 })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// get metrics summary by Ids
export const getMetricsSummaryByIds = async (metricIds) => {
  let retData = {
    topCountry: "",
    countryCount: [],
  };

  if (metricIds) {
    let objectIds = metricIds.map((id) => new ObjectId(id));

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

  console.log(retData);

  return retData;
};

// get all metric summary
export const getAllMetricsSummary = async () => {
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
        count: -1,
        "_id.country": 1,
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
  });

  return retData;
};

export default router;
