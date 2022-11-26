import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import Metric from "../models/Metric.js";
import { connect, close, clear } from "../config/test_db.js";
import { seedUrl, seedMetric } from "../test-setup/seed.js";

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
        expect(response.body[i].location).toStrictEqual(seededMetrics[i].location);
        expect(response.body[i].timestamp).toEqual(expect.anything());
      }
    });
});


test("GET /", async () => {
  let seededUrl = await seedUrl();
  let seededMetrics = await seedMetric(seededUrl);

  let metrisIds = seededMetrics.map(metric => metric.id);

  await agent
    .get(baseUrl)
    .query({metricIds: metrisIds})
    .expect(200)
    .then((response) => {

      expect(response.body.length).toBe(metrisIds.length);

      // Check data
      for (let i in seededMetrics) {
        expect(response.body[i].country).toBe(seededMetrics[i].country);
        expect(response.body[i].city).toBe(seededMetrics[i].city);
        expect(response.body[i].location).toStrictEqual(seededMetrics[i].location);
        expect(response.body[i].timestamp).toEqual(expect.anything());
      }
    });
});

