const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("API Health & Basic Endpoints", () => {
  // Test health endpoint
  it("should return 200 OK from /api/health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("message", "DMS Aarohi website API is running");
  });

  // Test 404 handler
  it("should return 404 for unknown endpoints", async () => {
    const res = await request(app).get("/api/unknown-endpoint-12345");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Route not found.");
  });
});
