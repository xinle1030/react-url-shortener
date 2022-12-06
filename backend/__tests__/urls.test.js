import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import { connect, close, clear } from "../config/test_db.js";
import {
  seedUrl,
  urlSample,
  moreUrlSamples,
  metrics1,
  metrics2,
  seedMetric,
  expectedUrlSummary,
  findTopLink,
  expectedUrlSummaryById,
} from "../test-setup/seed.js";

const agent = supertest.agent(app);
let baseUrl = "/api/urls";

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

test("GET /all/summary", async () => {
  let seededUrls = await seedUrl(moreUrlSamples);
  let seededMetrics1 = await seedMetric(seededUrls[0], metrics1);
  let seededMetrics2 = await seedMetric(seededUrls[1], metrics2);

  let topLink = await findTopLink();

  let finalUrlSummary = {
    ...expectedUrlSummary,
    topLink,
  };

  let response = await agent.get(baseUrl + "/all/summary").expect(200);

  if (response) {
    expect(response.body).toEqual(finalUrlSummary);
  }
});

test("GET /all", async () => {
  let seededUrls = await seedUrl(moreUrlSamples);

  let response = await agent.get(baseUrl + "/all").expect(200);

  if (response) {
    expect(response.body.length).toBe(seededUrls.length);

    // Use reverse to "sort" elements in insertion order
    for (let i in seededUrls.reverse()) {
      expect(response.body[i].origUrl).toBe(seededUrls[i].origUrl);
      expect(response.body[i].shortUrl).toBe(seededUrls[i].shortUrl);
      expect(response.body[i].urlId).toStrictEqual(seededUrls[i].urlId);
      expect(response.body[i].clicks).toBe(seededUrls[i].clicks);
      expect(response.body[i].date).toBe(seededUrls[i].date);
      expect(response.body[i].metrics).toEqual(seededUrls[i].metrics);
    }
  }
});

test("GET /:urlId/summary", async () => {
  let seededUrl = await seedUrl(urlSample);
  let seededMetrics = await seedMetric(seededUrl, metrics1);

  let response = await agent
    .get(baseUrl + `/${seededUrl.urlId}/summary`)
    .expect(200);

  if (response) {
    expect(response.body.clicks).toBe(expectedUrlSummaryById.clicks);
    expect(response.body.topCountry).toBe(expectedUrlSummaryById.topCountry);
    expect(response.body.countryCount).toStrictEqual(
      expectedUrlSummaryById.countryCount
    );

    expect(response.body).toHaveProperty("metricIds");
  }
});

test("GET /:urlId", async () => {
  let seededUrl = await seedUrl(urlSample);
  let seededMetrics = await seedMetric(seededUrl, metrics1);

  let singleSample = urlSample[0];

  let response = await agent.get(baseUrl + `/${seededUrl.urlId}`).expect(200);

  if (response) {
    expect(response.body).toHaveProperty("shortUrl");
    expect(response.body).toHaveProperty("urlId");
    expect(response.body).toHaveProperty("clicks");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("metrics");
    expect(response.body).toHaveProperty("origUrl");
    expect(response.body).toHaveProperty("title");

    expect(response.body.origUrl).toBe(singleSample.origUrl);
  }
});
