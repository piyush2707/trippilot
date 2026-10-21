import type { JourneyOption, SearchRequest } from "../../../core/src/types.js";

export function searchMockTrains(request: SearchRequest): JourneyOption[] {
  const origin = request.origin.trim().toUpperCase();
  const destination = request.destination.trim().toUpperCase();
  const retrievedAt = new Date().toISOString();
  return [
    { id: "mock-train-001", mode: "train", provider: "TripPilot fixture", operator: "Sample Express 12001", origin, destination,
      departure: `${request.date}T06:00:00+05:30`, arrival: `${request.date}T14:30:00+05:30`, durationMinutes: 510,
      price: 850, currency: "INR", status: "MOCK", retrievedAt, notes: "Demonstration data only; not a real train, schedule, or fare." },
    { id: "mock-train-002", mode: "train", provider: "TripPilot fixture", operator: "Sample Mail 12009", origin, destination,
      departure: `${request.date}T20:00:00+05:30`, arrival: `${request.date}T06:00:00+05:30`, durationMinutes: 600,
      price: 620, currency: "INR", status: "MOCK", retrievedAt, notes: "Demonstration data only; not a real train, schedule, or fare." }
  ];
}
