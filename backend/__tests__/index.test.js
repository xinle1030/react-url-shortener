import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import { connect, close, clear } from "../config/test_db.js";
import {
  seedUrl,
} from "../test-setup/seed.js";

const agent = supertest.agent(app);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

test("GET /:urlId", async () => {

  let seededUrl = await seedUrl();

  await agent.get("/" + seededUrl.urlId).expect(302);
});
