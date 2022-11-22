import express from "express";
import axios from 'axios';
import Url from "../models/Url.js";
import Metric from "../models/Metric.js";

const router = express.Router();

router.get("/:urlId", async (req, res) => {

  let locObj = null;

  try {
    const url = await Url.findOne({ urlId: req.params.urlId });

    await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_IP_GEO_API_KEY}`)
    .then(response => {
        console.log(response.data);
        locObj = {
            country: response.data.country,
            city: response.data.city,
            coordinates: [response.data.longitude, response.data.latitude],
          };
        console.log(locObj);
        // return locObj;
    })
    .catch(error => {
        console.log(error);
    });

    let metric = null;

    if (url && locObj){
      metric = new Metric({
        urlId: url.ObjectID,
        country: locObj.country,
        city: locObj.city,
        location: { type: "Point", coordinates: [locObj.coordinates[0], locObj.coordinates[1]] },
        timestamp: new Date(),
      });
    }
    else if (url){
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

      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

export default router;
