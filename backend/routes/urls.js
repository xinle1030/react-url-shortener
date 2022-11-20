import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { validateUrl } from "../utils/utils.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const router = express.Router();

// Get all paths
router.get("/all", async (req, res, next) => {
  console.log("Get all urls");
  await Url.find({}).sort({_id:-1}) 
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// Short URL Generator
router.post("/short", async (req, res) => {
  console.log(req.body);
  const { origUrl, title } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid(15);
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
          title: title,
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
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
