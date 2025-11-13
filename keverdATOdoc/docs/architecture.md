---
sidebar_position: 1
---

# Architecture Documentation

This document describes the internal architecture and design decisions of the Keverd Anti-ATO Android SDK.

## Overview

The SDK follows a modular architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                  KeverdFingerprint                      │
│              (Public API / Singleton)                   │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌───────────┐  ┌──────────┐  ┌──────────────┐
│ Collectors│  │ Network  │  │   Storage   │
│           │  │   Layer  │  │ (SharedPrefs)│
└───────────┘  └──────────┘  └──────────────┘
     │              │
     ▼              ▼
┌──────────┐  ┌──────────┐
│  Hash    │  │ Retrofit │
│  Util    │  │   API    │
└──────────┘  └──────────┘
```

## Core Components

### 1. KeverdFingerprint (Main Entry Point)

**Location**: `com.keverd.sdk.KeverdFingerprint`

The main SDK class that orchestrates all operations. It implements the singleton pattern and provides the public API.

**Responsibilities:**
- SDK initialization
- Consent management
- Orchestrating data collection
- Submitting fingerprints to API
- Result handling

**Key Methods:**
- `init()`: Initializes the SDK singleton
- `setConsent()`: Manages user consent
- `submit()`: Collects and submits fingerprint data

### 2. Data Collectors

The SDK uses four specialized collectors for different data types:

#### DeviceCollector
**Location**: `com.keverd.sdk.collector.DeviceCollector`

Collects device-specific information:
- Device identifiers (hashed)
- Hardware information
- OS version
- Screen metrics
- Locale and timezone

**Performance**: < 10ms

#### SimCollector
**Location**: `com.keverd.sdk.collector.SimCollector`

Collects SIM and network information:
- SIM serial number (hashed, requires permission)
- Network operator details
- Network type

**Performance**: < 10ms  
**Note**: Requires `READ_PHONE_STATE` permission

#### SessionCollector
**Location**: `com.keverd.sdk.collector.SessionCollector`

Manages session and install tracking:
- Session ID (hashed)
- Install ID (hashed)
- Session count
- First session timestamp

**Performance**: < 5ms  
**Storage**: Uses SharedPreferences

#### BehavioralCollector
**Location**: `com.keverd.sdk.collector.BehavioralCollector`

Collects user interaction data:
- Touch pressure and size
- Touch duration
- Scroll velocity
- Tap count

**Performance**: < 5ms  
**Note**: Requires manual integration via `createTouchListener()`

### 3. Network Layer

#### FingerprintApi
**Location**: `com.keverd.sdk.network.FingerprintApi`

Retrofit interface for API communication:
- `POST /fingerprint/score` endpoint
- API key authentication via header
- Suspend functions for coroutine support

#### Request/Response Models
- `FingerprintRequest`: Request payload
- `FingerprintResponse`: Response with risk score

### 4. Utilities

#### HashUtil
**Location**: `com.keverd.sdk.util.HashUtil`

Provides SHA-256 hashing functionality:
- Hashes all sensitive identifiers
- Returns hex-encoded strings
- Handles null/empty inputs gracefully

### 5. Dependency Injection

The SDK supports two initialization modes:

#### Manual Initialization (Primary)
Used by `KeverdFingerprint.init()`:
- Creates all dependencies manually
- No Hilt required
- Simpler for consumers

#### Hilt Injection (Optional)
Modules in `com.keverd.sdk.di`:
- `NetworkModule`: Provides Retrofit and OkHttpClient
- `AppModule`: Provides SharedPreferences

**Note**: Hilt modules are optional and primarily for advanced use cases.

## Data Flow

### Initialization Flow

```
1. KeverdFingerprint.init(context, config)
   │
   ├─> Validate config (HTTPS check)
   │
   ├─> Create OkHttpClient
   │   └─> Add logging interceptor
   │
   ├─> Create Retrofit
   │   └─> Set base URL from config
   │
   ├─> Create FingerprintApi
   │
   ├─> Create Collectors
   │   ├─> DeviceCollector
   │   ├─> SimCollector
   │   ├─> SessionCollector
   │   └─> BehavioralCollector
   │
   └─> Return singleton instance
```

### Submission Flow

```
1. sdk.submit(userId, onResult)
   │
   ├─> Check consent (if required)
   │   └─> Return ConsentRequired if not granted
   │
   ├─> Collect Data (parallel execution)
   │   ├─> DeviceCollector.collect()
   │   │   └─> Hash sensitive data
   │   │
   │   ├─> SimCollector.collect()
   │   │   └─> Hash sensitive data
   │   │
   │   ├─> SessionCollector.collect()
   │   │   └─> Hash sensitive data
   │   │
   │   └─> BehavioralCollector.collect()
   │
   ├─> Create FingerprintRequest
   │
   ├─> Call API
   │   └─> api.submitFingerprint(apiKey, request)
   │
   └─> Handle Response
       ├─> Success → Result.Success(score, requestId)
       └─> Error → Result.Error(message, throwable)
```

## Security Architecture

### Data Hashing

All sensitive identifiers are hashed using SHA-256:

```kotlin
// Before transmission
deviceId: "abc123" → HashUtil.sha256() → "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
```

**Hashed Fields:**
- Device ID (Android ID)
- SIM Serial Number
- Session ID
- Install ID
- Build Fingerprint

### Network Security

- **HTTPS Only**: Enforced in `Config` validation
- **API Key Authentication**: Sent via `X-API-Key` header
- **No PII in Logs**: All logging excludes raw identifiers
- **No PII in Storage**: Only hashed values stored in SharedPreferences

### Consent Management

Consent is checked before any data collection:
1. If `config.consentRequired == true`
2. Check `hasConsent` flag
3. Return `Result.ConsentRequired` if not granted
4. Only proceed with collection if consent granted

## Performance Optimizations

### Collection Performance

Each collector is optimized for speed:

| Collector | Target Time | Optimization |
|-----------|-------------|--------------|
| DeviceCollector | < 10ms | Direct system calls, no I/O |
| SimCollector | < 10ms | Cached TelephonyManager |
| SessionCollector | < 5ms | SharedPreferences (fast) |
| BehavioralCollector | < 5ms | In-memory StateFlow |

**Total Collection Time**: < 50ms

### Network Performance

- Connection timeout: 30s
- Read timeout: 30s
- Write timeout: 30s
- HTTP/2 support (via OkHttp)

### Memory Management

- Singleton pattern reduces object creation
- Collectors are lightweight (no heavy objects)
- StateFlow for behavioral data (reactive, efficient)

## Error Handling

### Error Types

1. **Network Errors**
   - Connection failures
   - Timeout errors
   - HTTP errors (4xx, 5xx)

2. **Validation Errors**
   - Invalid config (non-HTTPS URL)
   - Missing API key
   - Invalid user ID

3. **Permission Errors**
   - Missing READ_PHONE_STATE (gracefully handled)

### Error Propagation

Errors are wrapped in `Result.Error`:
```kotlin
Result.Error(
    error = "Network error occurred",
    throwable = exception
)
```

## Threading Model

### Coroutines

The SDK uses Kotlin Coroutines for async operations:

- **Dispatchers.IO**: Network calls and data collection
- **Dispatchers.Main**: Callback execution (UI thread)

### Thread Safety

- Singleton instance uses `@Volatile` and `synchronized`
- SharedPreferences is thread-safe
- StateFlow is thread-safe

## Storage

### SharedPreferences

Used for persistent storage:
- **File**: `keverd_sdk_prefs`
- **Mode**: `MODE_PRIVATE`
- **Data Stored**:
  - Session ID (hashed)
  - Install ID (hashed)
  - Session count
  - First session timestamp

**Note**: No raw PII is stored, only hashed values.

## Testing Strategy

### Unit Tests
- Test collectors in isolation
- Mock dependencies
- Test hashing logic
- Test error handling

### Integration Tests
- Test full submission flow
- Test network layer
- Test consent flow

### Performance Tests
- Verify collection time < 50ms
- Verify total time < 100ms

## Future Enhancements

Potential improvements:
1. Caching mechanism for repeated submissions
2. Batch submission support
3. Offline queue for failed submissions
4. More granular consent options
5. Additional behavioral metrics

