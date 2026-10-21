# TripPilot ✈️🚆
  <img src="hero.png" alt="Project hero banner" width="100%">

**An India-first travel capability for AI assistants.** TripPilot combines an installable agent skill with an MCP server so compatible assistants can search and compare journeys through structured tools.

> **Current status: starter prototype.** Flight and train tools return explicitly labelled mock fixtures. No live schedules, fares, availability, ticket issuance, payment, cancellation, or PNR status is implemented. Do not use mock results to plan or purchase travel.

## What's included

- `skills/trippilot/SKILL.md` — installable agent instructions and safety rules.
- `apps/mcp-server/` — Model Context Protocol server with validated tools.
- `packages/providers/flights/` and `packages/providers/trains/` — mock adapters designed to be replaced by authorized integrations.
- `tests/` — basic adapter and date validation tests.
- Booking remains disabled; the server never claims a booking succeeded.

## Requirements

- Node.js 20 or newer (Node.js 22 recommended)
- npm

## Run locally

```bash
npm install
npm test
npm run dev
```

The MCP server uses `stdio` transport. Configure it in your MCP-compatible client using the absolute path to this repository and the command `npm run dev` (or a client-specific command configuration). MCP client configuration varies; consult the documentation for the client you use.

## Available MCP tools

| Tool | Purpose | Data status |
|---|---|---|
| `search_flights` | Search sample flight options | MOCK |
| `search_trains` | Search sample train options | MOCK |
| `compare_journeys` | Compare sample options by price or duration | MOCK |
| `get_booking_link` | Explain booking-link readiness | NOT_CONFIGURED |

All searches require origin, destination, and a real calendar date in `YYYY-MM-DD` format. Passenger count is 1–9 for flight/train search.

## Install the skill

Copy `skills/trippilot/SKILL.md` into the skills directory supported by your AI tool. Each assistant product has its own skill discovery and installation method; follow that product's current documentation. The skill file is instructions, not a standalone booking integration. Use the MCP server for executable tools.

## Provider integration plan

1. **Flights:** start with an official developer sandbox such as Amadeus for Developers. Verify the exact production eligibility, carrier/market restrictions, commercial arrangements, and ticket-issuance process before claiming bookability.
2. **Trains:** identify an authorized rail data/booking provider and confirm contract, API access, permitted use, and booking lifecycle. Do not scrape consumer sites or bypass access controls.
3. Normalize provider data into `JourneyOption`, including source, retrieval timestamp, currency, local time zone, and `MOCK`/`SANDBOX`/`LIVE` status.
4. Add offer revalidation, error handling, timeouts, and provider contract tests before exposing live results.
5. Only implement booking after written authorization and end-to-end tests. Revalidate the offer, show the final total and rules, obtain explicit transaction confirmation, and verify provider status before reporting success. On uncertain timeouts, check status before retrying.

## Roadmap

- [x] Starter skill and MCP server
- [x] Mock flight/train adapters and basic tests
- [x] Data-status warnings and booking disabled
- [ ] Verify installation in target AI clients
- [ ] Flight sandbox adapter and provider contract tests
- [ ] Authorized rail provider research and integration
- [ ] Offer revalidation and real booking only after authorization
- [ ] Deployment, observability, security review, and privacy controls

## Security

Never commit API keys, `.env` files, passenger information, payment data, or OTPs. See [SECURITY.md](SECURITY.md).

## Contributing

Issues and pull requests are welcome. Keep mock/live distinctions explicit, add tests for new provider behavior, and never include secrets in fixtures or logs.

## License

MIT. See [LICENSE](LICENSE).
