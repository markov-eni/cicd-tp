const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hello world when no name is provided", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return Hello world! From {name} when a name is provided", async () => {
    const name = "Alice";
    const res = await request(app).get(`/hello/${name}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`Hello world! From ${name}`);
  });

  it("should return Hello world! From {number} when a number is provided", async () => {
    const name = 42;
    const res = await request(app).get(`/hello/${name}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`Hello world! From ${name}`);
  });

  it("should return 400 when name contains forbidden characters", async () => {
    const name = "Alice<script>";
    const res = await request(app).get(`/hello/${name}`);
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when name is too long", async () => {
    const longName = "a".repeat(101);
    const res = await request(app).get(`/hello/${longName}`);
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /hello", () => {
  it("should return Hello world when no x-name header is provided", async () => {
    const res = await request(app).post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return Hello world! From {x-name} when x-name header is provided", async () => {
    const name = "Bob";
    const res = await request(app)
      .post("/hello")
      .set("x-name", name);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`Hello world! From ${name}`);
  });

  it("should return 400 when x-name header contains forbidden characters", async () => {
    const name = "Bob<script>";
    const res = await request(app)
      .post("/hello")
      .set("x-name", name);
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 when x-name header is too long", async () => {
    const longName = "a".repeat(101);
    const res = await request(app)
      .post("/hello")
      .set("x-name", longName);
    expect(res.statusCode).toBe(400);
  });
});
