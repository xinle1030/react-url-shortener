import express from "express";
import axios from "axios";
import Url from "../models/Url.js";
import Metric from "../models/Metric.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Url Shortener API!");
});

// redirect to original url using short url
router.get("/:urlId", async (req, res) => {
  console.log("redirect to original url using short url");

  let locObj = null;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const url = await Url.findOne({ urlId: req.params.urlId });

    let ipAddress = req.ip;
    let requestUrl = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_IP_GEO_API_KEY}`;

    // if not on localhost, check for client ip address
    if (ipAddress != "::1") {
      requestUrl += `&ip_address=${ipAddress}`;
    }

    try {
      let response = await axios.get(requestUrl);
      locObj = {
        country: response.data.country,
        city: response.data.city,
        coordinates: [response.data.longitude, response.data.latitude],
      };
      console.log(locObj);
    } catch (error) {
      console.log(error);
    }

    let metric = null;

    if (url && locObj) {
      metric = new Metric({
        urlId: url.ObjectID,
        country: locObj.country,
        city: locObj.city,
        location: {
          type: "Point",
          coordinates: [locObj.coordinates[0], locObj.coordinates[1]],
        },
        timestamp: new Date(),
      });
    } else if (url) {
      metric = new Metric({
        urlId: url.ObjectID,
        timestamp: new Date(),
      });
    }

    if (metric) {
      await metric.save();

      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 }, $push: { metrics: metric } }
      );

      const checkUrl = await Url.findOne({ urlId: req.params.urlId });
      console.log(checkUrl);

      await session.commitTransaction();
      session.endSession();

      return res.redirect(url.origUrl);
    } else {
      await session.abortTransaction();

      return res.status(404).json("Not found");
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    return res.status(500).json("Server Error");
  }
});

export default router;
