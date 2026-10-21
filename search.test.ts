import { describe, expect, it } from "vitest";
import { searchMockFlights } from "../packages/providers/flights/src/mock.js";
import { searchMockTrains } from "../packages/providers/trains/src/mock.js";
import { validateDate } from "../packages/core/src/types.js";

describe("mock search adapters", () => {
  const request = { origin: "DEL", destination: "BOM", date: "2027-02-12", passengers: 1 };
  it("returns clearly labelled mock flight fixtures", () => {
    const results = searchMockFlights(request);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.status === "MOCK")).toBe(true);
    expect(results[0]?.origin).toBe("DEL");
  });
  it("returns clearly labelled mock train fixtures", () => {
    expect(searchMockTrains(request).every((result) => result.status === "MOCK")).toBe(true);
  });
  it("validates calendar dates", () => {
    expect(validateDate("2027-02-12")).toBe(true);
    expect(validateDate("2027-02-31")).toBe(false);
    expect(validateDate("12-02-2027")).toBe(false);
  });
});
