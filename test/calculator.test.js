const { Add } = require("../calculator");

test("returns 0 for empty string", () => {
  expect(Add("")).toBe(0);
});

test("returns number for single number", () => {
  expect(Add("5")).toBe(5);
});

test("returns sum for two numbers", () => {
  expect(Add("1,2")).toBe(3);
});

test("returns sum for unknown amount of numbers", () => {
  expect(Add("1,2,3,4")).toBe(10);
});

test("handles newlines as delimiters", () => {
  expect(Add("1\n2,3")).toBe(6);
});


test("supports custom delimiter ';'", () => {
  expect(Add("//;\n1;2")).toBe(3);
});

test("throws exception on negative number", () => {
  expect(() => Add("1,-2,3")).toThrow("negatives not allowed: -2");
});

test("shows all negatives in exception", () => {
  expect(() => Add("1,-2,-5,3")).toThrow("negatives not allowed: -2, -5");
});

test("ignores numbers > 1000", () => {
  expect(Add("2,1001")).toBe(2);
  expect(Add("2,1000")).toBe(1002);
});

test("supports long custom delimiter", () => {
  expect(Add("//[***]\n1***2***3")).toBe(6);
});

test("supports multiple single-char delimiters", () => {
  expect(Add("//[*][%]\n1*2%3")).toBe(6);
});

test("supports multiple long delimiters", () => {
  expect(Add("//[**][%%]\n1**2%%3")).toBe(6);
});
