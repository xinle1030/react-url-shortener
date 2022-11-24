import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { connect, close, clear } from "../config/test_db.js";

const agent = supertest.agent(app);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

test("GET /:urlId", async () => {
  console.log("run test");

  const urlId = nanoid(15);

  let url = {
    origUrl:
      "https://shopee.com.my/Asus-Zenbook-14-UX425E-AKI839WS-I5-1135G7-8GB-Ram-512GB-M.2-Iris-Xe-Graphics-14-FHD-Office-i.475306177.9176347026?sp_atk=d905691d-8ad5-4ffc-ad17-ca89e8983d58&xptdk=d905691d-8ad5-4ffc-ad17-ca89e8983d58",
    shortUrl: `http://localhost:3333/${urlId}`,
    urlId: urlId,
    title: "shopee asus zenbook",
  };

  const seededUrl = await Url.create(url);

  await agent.get("/" + seededUrl.urlId).expect(302);
});
