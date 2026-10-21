# Contributing

1. Open an issue describing the problem or proposed change.
2. Keep provider adapters separate from MCP tool definitions.
3. Label every fixture `MOCK`; never make up live fares or schedules.
4. Add tests for validation, provider failures, currency/time-zone normalization, and status labels.
5. Run `npm test` before submitting a pull request.
6. Never commit credentials, OTPs, payment information, or passenger data.
