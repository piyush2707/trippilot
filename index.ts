import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { searchMockFlights } from "../../../packages/providers/flights/src/mock.js";
import { searchMockTrains } from "../../../packages/providers/trains/src/mock.js";
import { validateDate } from "../../../packages/core/src/types.js";

const server = new McpServer({ name: "trippilot", version: "0.1.0" });
const searchShape = {
  origin: z.string().trim().min(2).max(80).describe("Origin city or station/airport code"),
  destination: z.string().trim().min(2).max(80).describe("Destination city or station/airport code"),
  date: z.string().refine(validateDate, "Use a real date in YYYY-MM-DD format"),
  passengers: z.number().int().min(1).max(9).default(1)
};

server.registerTool("search_flights", {
  title: "Search flights (mock)",
  description: "Search TripPilot demonstration flight fixtures. These are not live schedules, fares, or availability.",
  inputSchema: searchShape
}, async ({ origin, destination, date, passengers }) => {
  const results = searchMockFlights({ origin, destination, date, passengers });
  return { content: [{ type: "text", text: JSON.stringify({ status: "MOCK", warning: "Sample data only; no live provider is connected.", passengers, results }, null, 2) }] };
});

server.registerTool("search_trains", {
  title: "Search trains (mock)",
  description: "Search TripPilot demonstration train fixtures. These are not real train schedules, fares, or availability.",
  inputSchema: searchShape
}, async ({ origin, destination, date, passengers }) => {
  const results = searchMockTrains({ origin, destination, date, passengers });
  return { content: [{ type: "text", text: JSON.stringify({ status: "MOCK", warning: "Sample data only; no authorized rail provider is connected.", passengers, results }, null, 2) }] };
});

server.registerTool("compare_journeys", {
  title: "Compare sample journeys",
  description: "Compare mock flight and train options by price or duration. Results are demonstrations, not live travel offers.",
  inputSchema: { origin: searchShape.origin, destination: searchShape.destination, date: searchShape.date, sortBy: z.enum(["price", "duration"]).default("price") }
}, async ({ origin, destination, date, sortBy }) => {
  const results = [...searchMockFlights({ origin, destination, date }), ...searchMockTrains({ origin, destination, date })]
    .sort((a, b) => sortBy === "price" ? a.price - b.price : a.durationMinutes - b.durationMinutes);
  return { content: [{ type: "text", text: JSON.stringify({ status: "MOCK", warning: "All options are sample fixtures; do not use for travel decisions.", sortBy, results }, null, 2) }] };
});

server.registerTool("get_booking_link", {
  title: "Booking link availability",
  description: "Explain booking-link capability. This starter has no verified provider booking links and cannot book tickets.",
  inputSchema: { mode: z.enum(["flight", "train"]), origin: z.string().min(2), destination: z.string().min(2) }
}, async ({ mode }) => ({ content: [{ type: "text", text: JSON.stringify({ status: "NOT_CONFIGURED", mode, bookingEnabled: false, message: "No verified booking link or authorized booking integration is configured. Visit the relevant airline or official railway booking service directly and verify details there." }, null, 2) }] }));

const transport = new StdioServerTransport();
await server.connect(transport);
