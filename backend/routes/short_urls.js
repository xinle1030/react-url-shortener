import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { validateUrl, extractTitle } from "../utils/utils.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const router = express.Router();

// Short URL Generator
router.post("/short", async (req, res) => {
  console.log("Shorten URL");
  const origUrl = req.body.origUrl;
  
  const base = process.env.BASE;
  // const base = "https://url-shortener-slink.herokuapp.com";

  const urlId = nanoid(15);
  if (validateUrl(origUrl)) {

    let title = await extractTitle(origUrl);

    try {
      const shortUrl = `${base}/${urlId}`;

      let url = new Url({
        origUrl,
        shortUrl,
        urlId,
        date: new Date(),
        title: title,
      });

      await url.save();
      res.status(201).json(url);
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
});

export default router;
