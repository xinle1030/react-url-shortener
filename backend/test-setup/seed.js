import Metric from "../models/Metric.js";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

export async function seedUrl() {
  const urlId = nanoid(15);

  let url = {
    origUrl:
      "https://shopee.com.my/Asus-Zenbook-14-UX425E-AKI839WS-I5-1135G7-8GB-Ram-512GB-M.2-Iris-Xe-Graphics-14-FHD-Office-i.475306177.9176347026?sp_atk=d905691d-8ad5-4ffc-ad17-ca89e8983d58&xptdk=d905691d-8ad5-4ffc-ad17-ca89e8983d58",
    shortUrl: "http://localhost:3333/-7NGNMc3-UfmqYu",
    urlId: urlId,
    title: "shopee asus zenbook",
  };

  const seededUrl = await Url.create(url);

  return seededUrl;
}

export async function seedMetric(seededUrl) {
  const urlId = seededUrl.urlId;

  let metrics = [
    {
      urlId: seededUrl.ObjectId,
      country: "Malaysia",
      city: "Subang Jaya",
      location: { type: "Point", coordinates: [101.592, 3.0537] },
      timestamp: Date.now,
    },
    {
      urlId: seededUrl.ObjectId,
      country: "Canada",
      city: "Peterborough",
      location: { type: "Point", coordinates: [78.32, 44.3047] },
      timestamp: new Date().setDate(new Date().getDate() - 3),
    },
    {
      urlId: seededUrl.ObjectId,
      country: "Canada",
      city: "Toronto",
      location: { type: "Point", coordinates: [43.6532, 43.6532] },
      timestamp: new Date().setDate(new Date().getDate() - 7),
    },
  ];

  const seededMetrics = await Metric.insertMany(metrics);

  if (seededMetrics) {
    // const resolvedMetrics = Promise.resolve(await seedMetrics);
    Url.updateOne(
      {
        urlId: urlId,
      },
      { $inc: { clicks: metrics.length }, $push: { metrics: seededMetrics } }
    );
  }

  return seededMetrics;
}

export const expectedMetricSummary = {
  topCountry: "Canada",
  countryCount: [
    { country: "Canada", count: 2 },
    { country: "Malaysia", count: 1 },
  ],
};
