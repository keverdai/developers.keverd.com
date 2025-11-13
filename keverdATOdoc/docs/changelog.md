---
sidebar_position: 1
---

# Changelog

All notable changes to the Keverd Anti-ATO Android SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Caching mechanism for repeated submissions
- Batch submission support
- Offline queue for failed submissions
- More granular consent options
- Additional behavioral metrics

## [1.0.0] - 2024-12-15

### Added
- Initial release of Keverd Anti-ATO Android SDK
- Device fingerprint collection
- SIM data collection
- Session tracking
- Behavioral data collection
- SHA-256 hashing for all sensitive identifiers
- Consent management system
- Network layer with Retrofit
- Hilt dependency injection support
- English and Swahili localization
- Comprehensive documentation

### Features
- **DeviceCollector**: Collects device information (manufacturer, model, OS version, screen metrics, locale, timezone)
- **SimCollector**: Collects SIM and network information (requires READ_PHONE_STATE permission)
- **SessionCollector**: Tracks session and install IDs
- **BehavioralCollector**: Collects user interaction data (touch, scroll, tap)
- **HashUtil**: SHA-256 hashing utility for sensitive data
- **KeverdFingerprint**: Main SDK class with init() and submit() methods
- **Config**: Configuration class with HTTPS validation
- **Result**: Sealed class for success/error/consent results

### Security
- All identifiers SHA-256 hashed client-side
- HTTPS-only communication (enforced)
- No raw PII in logs or storage
- Consent required before collection (configurable)

### Performance
- Data collection: < 50ms
- Total response time: < 100ms
- SDK size: < 600 KB

### Documentation
- README.md with usage examples
- Architecture documentation
- API reference
- Development guide
- Build documentation
- Testing guide

### Technical Details
- Min SDK: 21 (Android 5.0 Lollipop)
- Target SDK: 36
- Kotlin: 1.9+
- Coroutines for async operations
- Retrofit for network calls
- Hilt for dependency injection (optional)

---

## Version History

### Version Format
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Process

1. Update version in `app/build.gradle.kts`
2. Update this CHANGELOG.md
3. Create Git tag
4. Build and test release AAR
5. Distribute AAR

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

