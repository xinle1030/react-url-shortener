import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { validateUrl } from "../utils/utils.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const router = express.Router();

const parseTitle = (body) => {
  let match = body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== 'string')
    throw new Error('Unable to parse the title tag')
  return match[1]
}

// Short URL Generator
router.post("/short", async (req, res) => {
  console.log("Shorten URL");
  const { origUrl } = req.body;
  let title;
  const base = process.env.BASE;
  // const base = "https://url-shortener-slink.herokuapp.com";

  const urlId = nanoid(15);
  if (validateUrl(origUrl)) {

    await fetch(origUrl)
    .then(res => res.text()) // parse response's body as text
    .then(body => parseTitle(body)) // extract <title> from body
    .then(retTitle => title = retTitle) // send the result back
    .catch(e => res.status(500).end(e.message)) // catch possible errors

    console.log(title);

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
