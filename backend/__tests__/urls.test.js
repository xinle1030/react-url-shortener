import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import { connect, close, clear } from "../config/test_db.js";
import {
  seedUrl,
  moreUrlSamples,
  metrics1,
  metrics2,
  seedMetric,
  expectedUrlSummary,
  findTopLink,
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

  await agent
    .get(baseUrl + "/all/summary")
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(finalUrlSummary);
    });
});
