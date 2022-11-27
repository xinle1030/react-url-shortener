import app from "../app.js";
import supertest from "supertest"; // supertest is a framework that allows to easily test web apis
import { connect, close, clear } from "../config/test_db.js";

const agent = supertest.agent(app);
let baseUrl = "/api";

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

test("POST /short", async () => {
  const data = {
    origUrl:
      "https://www.lazada.com.my/products/free-adaptermijia-vacuum-cleaner-robot-pro-stytj06zhm-55w-3000pa-suction-d-type-lds-laser-obstacle-avoidance-system-sweep-and-mop-robot-i3062690955-s16130519138.html?spm=a2o4k.home.just4u.15.2dd92e7e00eVfR&&scm=1007.17519.162103.0&pvid=322a6129-e5ce-4e99-bc49-4db77c7934f7&search=0&clickTrackInfo=tcsceneid%3AHPJFY%3Bbuyernid%3Aeb86bc95-db04-4fdd-9d1c-ec9ad7edb3f5%3Btcboost%3A0%3Bpvid%3A322a6129-e5ce-4e99-bc49-4db77c7934f7%3Bchannel_id%3A0000%3Bmt%3Ahot%3Bitem_id%3A3062690955%3Bself_ab_id%3A162103%3Bself_app_id%3A7519%3Blayer_buckets%3A5437.25236_955.3634_955.3630_6059.28889%3Bpos%3A14%3B",
    title: "roomba",
  };

  await agent
    .post(baseUrl + "/short")
    .send(data)
    .then((response) => {
      expect(response.body).toHaveProperty("shortUrl");
      expect(response.body).toHaveProperty("urlId");

      expect(response.body.origUrl).toBe(data.origUrl);
      expect(response.body.title).toBe(data.title);
    });
});
