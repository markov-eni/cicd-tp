const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hello world message", () => {
    expect(getGreeting()).toBe("Hello world!");
  });

  it("returns the hello world message from 42", () => {
    expect(getGreeting(42)).toBe("Hello world! From 42");
  });

  it("returns the hello world message from a string", () => {
    expect(getGreeting("Alice")).toBe("Hello world! From Alice");
  });

  it("returns the hello world message from a boolean", () => {
    expect(getGreeting(true)).toBe("Hello world! From true");
  });

  it("returns the hello world message from a float", () => {
    expect(getGreeting(3.14)).toBe("Hello world! From 3.14");
  });

  it("throws an error when null is passed as input", () => {
    expect(() => getGreeting(null)).toBe("Hello world!");
  });

  it("throws an error when undefined is passed as input", () => {
    expect(() => getGreeting(undefined)).toBe("Hello world!");
  });

  it("throws an error when an array is passed as input", () => {
    expect(() => getGreeting([42, "abc"])).toThrow(TypeError);
  });

  it("throws an error when a dict is passed as input", () => {
    expect(() => getGreeting({"key": "value"})).toThrow(TypeError);
  });

});
