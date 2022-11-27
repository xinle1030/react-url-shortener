import Metric from "../models/Metric.js";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

export const urlSample = [
  {
    origUrl:
      "https://shopee.com.my/Asus-Zenbook-14-UX425E-AKI839WS-I5-1135G7-8GB-Ram-512GB-M.2-Iris-Xe-Graphics-14-FHD-Office-i.475306177.9176347026?sp_atk=d905691d-8ad5-4ffc-ad17-ca89e8983d58&xptdk=d905691d-8ad5-4ffc-ad17-ca89e8983d58",
    title: "shopee asus zenbook",
  },
];

export const moreUrlSamples = [
  {
    origUrl:
      "https://shopee.com.my/Asus-Zenbook-14-UX425E-AKI839WS-I5-1135G7-8GB-Ram-512GB-M.2-Iris-Xe-Graphics-14-FHD-Office-i.475306177.9176347026?sp_atk=d905691d-8ad5-4ffc-ad17-ca89e8983d58&xptdk=d905691d-8ad5-4ffc-ad17-ca89e8983d58",
    title: "shopee asus zenbook",
  },
  {
    origUrl:
      "https://www.lazada.com.my/products/hot-swappable-royal-kludge-rk61-real-mechanical-keyboard-gaming-bluetooth-wireless-60-rgb-rk-61-61-keys-3-mode-keychron-k12-i1963348553-s10040430686.html?clickTrackInfo=undefined&search=1&source=search&spm=a2o4k.searchlist.list.i40.673b46d8DOCQNS",
    title: "lazada keyboard",
  },
];

export const metrics1 = [
  {
    country: "Malaysia",
    city: "Subang Jaya",
    location: { type: "Point", coordinates: [101.592, 3.0537] },
    timestamp: Date.now,
  },
  {
    country: "Canada",
    city: "Peterborough",
    location: { type: "Point", coordinates: [78.32, 44.3047] },
    timestamp: new Date().setDate(new Date().getDate() - 3),
  },
  {
    country: "Canada",
    city: "Toronto",
    location: { type: "Point", coordinates: [43.6532, 43.6532] },
    timestamp: new Date().setDate(new Date().getDate() - 7),
  },
];

export const metrics2 = [
  {
    country: "Philippines",
    city: "Manila",
    location: { type: "Point", coordinates: [43.6532, 43.6532] },
    timestamp: new Date().setDate(new Date().getDate() - 16),
  },
];

export async function seedUrl(urlArr) {
  let retUrlArr = [];

  for (let i in urlArr) {
    let currentUrl = urlArr[i];

    let urlId = nanoid(15);

    let url = {
      origUrl: currentUrl.origUrl,
      shortUrl: `http://localhost:3333/${urlId}`,
      urlId: urlId,
      title: currentUrl.title,
    };

    retUrlArr.push(url);
  }

  const seededUrl = await Url.insertMany(retUrlArr);

  if (seededUrl.length == 1) {
    return seededUrl[0];
  } else {
    return seededUrl;
  }
}

export async function seedMetric(seededUrl, metricArr) {
  const urlObjId = seededUrl.ObjectId;
  const urlId = seededUrl.urlId;

  metricArr.forEach((metric) => (metric.urlId = urlObjId));

  const seededMetrics = await Metric.insertMany(metricArr);

  if (seededMetrics) {
    await Url.updateOne(
      {
        urlId: urlId,
      },
      {
        $inc: { clicks: seededMetrics.length },
        $push: { metrics: seededMetrics },
      }
    );
  }

  return seededMetrics;
}

export async function findTopLink() {
  let topLink = "";

  let topUrl = await Url.find({}, { shortUrl: 1 })
    .sort({ clicks: -1 })
    .limit(1);

  if (topUrl.length > 0) {
    topLink = topUrl[0].shortUrl;
  }

  return topLink;
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

export const expectedUrlSummary = {
  totalClicks: 4,
  topLink: "",
  topLinkClicks: 3,
  topCountry: "Canada",
  countryCount: [
    { country: "Canada", count: 2 },
    { country: "Malaysia", count: 1 },
    { country: "Philippines", count: 1 },
  ],
};
