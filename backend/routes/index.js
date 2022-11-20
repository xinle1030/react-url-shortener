import express from 'express';
import Url from '../models/Url.js';
import VisitInfo from "../models/VisitInfo.js";

const router = express.Router();

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    const data = req.query.userLocation;

    if (url) {

      let visitInfo = new VisitInfo({
        urlId: url.ObjectID,
        country: "Malaysia",
        city: "Batu Pahat",
        location: { type: "Point", coordinates: [ 27, 67 ] },
        timestamp: new Date(),
      });

      await visitInfo.save();

      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 }, $push: {visits: visitInfo}}
      );

      const checkUrl = await Url.findOne({ urlId: req.params.urlId });
      console.log(checkUrl);

      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;