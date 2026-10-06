const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/app");

test("GET / returns API message", async () => {
  const response = await request(app)
    .get("/")
    .expect(200);

  assert.strictEqual(
    response.body.message,
    "Node.js + Express + MySQL API"
  );
});

test("POST /api/users validates required fields", async () => {
  const response = await request(app)
    .post("/api/users")
    .send({})
    .expect(400);

  assert.strictEqual(
    response.body.error,
    "name and email are required"
  );
});