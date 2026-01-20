const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("responds with Hello world", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("responds with Hello world! From {name}", async () => {
    const name = "Alice";
    const res = await axios.get(`${baseURL}/hello/${name}`);
    expect(res.status).toBe(200);
    expect(res.data).toBe(`Hello world! From ${name}`);
  });

  it("responds with 404 if it contains backslash", async () => {
    const name = "Alice/Bob";
  
    await expect(
      axios.get(`${baseURL}/hello/${name}`)
    ).rejects.toMatchObject({
      response: { status: 404 },
    });
  });
  
  it("responds with 400 when name contains forbidden characters", async () => {
    const name = "Alice<script>";
  
    await expect(
      axios.get(`${baseURL}/hello/${name}`)
    ).rejects.toMatchObject({
      response: { status: 400 },
    });
  });
  
  it("responds with 400 when name is too long", async () => {
    const longName = "a".repeat(101);
  
    await expect(
      axios.get(`${baseURL}/hello/${longName}`)
    ).rejects.toMatchObject({
      response: { status: 400 },
    });
  });
});

describe("E2E POST /hello", () => {
  it("responds with Hello world", async () => {
    const res = await axios.post(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("responds with Hello world! From {x-name}", async () => {
    const name = "Bob";
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { "x-name": name }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe(`Hello world! From ${name}`);
  });


  it("responds with 400 when name contains forbidden characters", async () => {
    const name = "Alice<script>";
  
    await expect(
      axios.post(`${baseURL}/hello`, {}, {
        headers: { "x-name": name }
      })
    ).rejects.toMatchObject({
      response: { status: 400 },
    });
  });

  it("responds with 400 when name is too long", async () => {
    const longName = "a".repeat(101);
  
    await expect(
      axios.post(`${baseURL}/hello`, {}, {
        headers: { "x-name": longName }
      })
    ).rejects.toMatchObject({
      response: { status: 400 },
    });
  });

});
