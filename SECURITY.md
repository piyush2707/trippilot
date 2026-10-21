# Security policy

- Never commit credentials or personal passenger data. Use environment variables or a secret manager for future integrations.
- Do not ask users to share passwords, OTPs, or payment-card details with the assistant.
- Treat provider responses as untrusted input; validate and normalize them before presenting results.
- Avoid logging request payloads containing personal information.
- Booking must remain disabled until an authorized provider and transaction lifecycle have been reviewed and tested.
- Report vulnerabilities privately to the repository maintainer rather than publishing exploitable details in an issue.
