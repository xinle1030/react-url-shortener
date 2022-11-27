import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import { connect, close, clear } from "../config/test_db.js";
import {
  seedUrl,
  seedMetric,
  seedManyUrls,
  seedManyMetrics,
  expectedMetricSummaryById,
  expectedMetricSummary
} from "../test-setup/seed.js";
import {
  getMetricsSummaryByIds,
  getAllMetricsSummary,
} from "../routes/metrics.js";

const agent = supertest.agent(app);
let baseUrl = "/api/metrics/";

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

test("GET /all", async () => {
  let seededUrl = await seedUrl();
  let seededMetrics = await seedMetric(seededUrl);

  await agent
    .get(baseUrl + "/all")
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(seededMetrics.length);

      // expect(response.body[0]).toHaveProperty("country");
      // expect(response.body[0]).toHaveProperty("city");
      // expect(response.body[0]).toHaveProperty("location");
      // expect(response.body[0]).toHaveProperty("timestamp");

      // Check data
      for (let i in seededMetrics) {
        expect(response.body[i].country).toBe(seededMetrics[i].country);
        expect(response.body[i].city).toBe(seededMetrics[i].city);
        expect(response.body[i].location).toStrictEqual(
          seededMetrics[i].location
        );
        expect(response.body[i].timestamp).toEqual(expect.anything());
      }
    });
});

test("GET /", async () => {
  let seededUrl = await seedUrl();
  let seededMetrics = await seedMetric(seededUrl);

  let metricIds = seededMetrics.map((metric) => metric.id);

  await agent
    .get(baseUrl)
    .query({ metricIds: metricIds })
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBe(metricIds.length);

      // Check data
      for (let i in seededMetrics) {
        expect(response.body[i].country).toBe(seededMetrics[i].country);
        expect(response.body[i].city).toBe(seededMetrics[i].city);
        expect(response.body[i].location).toStrictEqual(
          seededMetrics[i].location
        );
        expect(response.body[i].timestamp).toEqual(expect.anything());
      }
    });
});

test("Get Metric Summary by Ids", async () => {
  let seededUrl = await seedUrl();
  let seededMetrics = await seedMetric(seededUrl);

  let metricIds = seededMetrics.map((metric) => metric.id);

  let metricsSummary = await getMetricsSummaryByIds(metricIds);

  expect(metricsSummary).toStrictEqual(expectedMetricSummaryById);
});

test("Get All Metric Summary", async () => {
  let seededUrls = await seedManyUrls();
  let seededMetrics = await seedManyMetrics(seededUrls);

  let metricIds = seededMetrics.map((metric) => metric.id);
1
  let metricsSummary = await getAllMetricsSummary(metricIds);

  expect(metricsSummary).toStrictEqual(expectedMetricSummary);
});