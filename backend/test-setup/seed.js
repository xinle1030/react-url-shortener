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

export async function seedManyUrls() {

  const seededUrl1 = seedUrl();

  const urlId = nanoid(15);

  let url = [
    {
      origUrl:
        "https://www.lazada.com.my/products/hot-swappable-royal-kludge-rk61-real-mechanical-keyboard-gaming-bluetooth-wireless-60-rgb-rk-61-61-keys-3-mode-keychron-k12-i1963348553-s10040430686.html?clickTrackInfo=undefined&search=1&source=search&spm=a2o4k.searchlist.list.i40.673b46d8DOCQNS",
      shortUrl: `http://localhost:3333/${urlId}`,
      urlId: urlId,
      title: "lazada keyboard",
    },
  ];

  const seededUrl2 = await Url.create(url);

  return [seededUrl1, seededUrl2];
}

export async function seedManyMetrics(seededUrls) {

  let seededMetrics1 = seedMetric(seededUrls[0]);

  let metrics2 = [
    {
      urlId: seededUrls[1].ObjectId,
      country: "Philippines",
      city: "Manila",
      location: { type: "Point", coordinates: [43.6532, 43.6532] },
      timestamp: new Date().setDate(new Date().getDate() - 16),
    },
  ];

  const seededMetrics2 = await Metric.insertMany(metrics2);

  if (seededMetrics2) {

    Url.updateOne(
      {
        urlId: seededUrls[1],
      },
      { $inc: { clicks: metrics2.length }, $push: { metrics: seededMetrics2 } }
    );
  }

  return [seededMetrics1, seededMetrics2];
}

export const expectedMetricSummaryById = {
  topCountry: "Canada",
  countryCount: [
    { country: "Canada", count: 2 },
    { country: "Malaysia", count: 1 },
  ],
};

export const expectedMetricSummary = {
  topCountry: "Canada",
  countryCount: [
    { country: "Canada", count: 2 },
    { country: "Malaysia", count: 1 },
    { country: "Philippines", count: 1 },
  ],
};
