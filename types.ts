export type DataStatus = "MOCK" | "SANDBOX" | "LIVE";

export interface JourneyOption {
  id: string;
  mode: "flight" | "train";
  provider: string;
  operator: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  durationMinutes: number;
  price: number;
  currency: "INR";
  status: DataStatus;
  retrievedAt: string;
  bookingUrl?: string;
  notes?: string;
}

export interface SearchRequest {
  origin: string;
  destination: string;
  date: string;
  passengers?: number;
}

export function normalizeCode(value: string): string {
  return value.trim().toUpperCase();
}

export function validateDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}
