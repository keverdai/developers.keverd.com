---
sidebar_position: 0
---

# Welcome

The Keverd Anti-ATO Android SDK provides comprehensive fraud detection and anti-ATO (Account Takeover) protection for Android applications.

## Quick Start

Get started with the SDK in minutes:

1. **Add the SDK** to your project
2. **Initialize** in your Application class
3. **Submit fingerprints** during critical operations

```kotlin
// Initialize SDK
val config = Config(
    apiBaseUrl = "https://api.keverd.com",
    apiKey = "your-api-key",
    consentRequired = true
)
val sdk = KeverdFingerprint.init(context, config)

// Submit fingerprint
sdk.submit(userId) { result ->
    when (result) {
        is Result.Success -> {
            // Use risk score for fraud detection
            val riskScore = result.score
        }
        // Handle other cases...
    }
}
```

## Key Features

- 🚀 **Fast**: Data collection < 50ms, total response < 100ms
- 🔒 **Secure**: All sensitive data SHA-256 hashed client-side
- 📱 **Lightweight**: SDK size < 600 KB
- 🛡️ **Privacy-First**: Consent management and no raw PII storage
- 🔧 **Easy Integration**: Simple API, comprehensive documentation

## Documentation

- **[Getting Started](/docs/getting-started)** - Setup and installation guide
- **[API Reference](/docs/api)** - Complete API documentation
- **[Fintech Integration](/docs/fintech-integration)** - Integration guide for fintech apps
- **[Architecture](/docs/architecture)** - Internal architecture and design

## Requirements

- Android SDK 21+ (Android 5.0 Lollipop)
- Kotlin 1.9+
- JDK 11+

## Support

For questions or issues:
- Check the [documentation](/docs/getting-started)
- Review [troubleshooting guides](/docs/getting-started#troubleshooting)
- Contact the support team

---

**Ready to get started?** Check out the [Getting Started Guide](/docs/getting-started)!
