---
sidebar_position: 1
---

# API Documentation

Complete API reference for the Keverd Anti-ATO Android SDK.

## Package: `com.keverd.sdk`

### KeverdFingerprint

Main SDK class for fingerprint collection and submission.

#### Companion Object Methods

##### `init(context: Context, config: Config): KeverdFingerprint`

Initializes the SDK singleton instance.

**Parameters:**
- `context`: Application context (will use `applicationContext` internally)
- `config`: SDK configuration (see `Config`)

**Returns:** Initialized `KeverdFingerprint` instance

**Example:**
```kotlin
val config = Config(
    apiBaseUrl = "https://api.keverd.com",
    apiKey = "your-api-key",
    consentRequired = true
)
val sdk = KeverdFingerprint.init(context, config)
```

**Thread Safety:** Thread-safe singleton pattern

---

#### Instance Methods

##### `setConsent(granted: Boolean)`

Sets user consent for data collection.

**Parameters:**
- `granted`: `true` if user granted consent, `false` otherwise

**Example:**
```kotlin
sdk.setConsent(true)
```

**Note:** Must be called before `submit()` if `config.consentRequired == true`

---

##### `submit(userId: String, onResult: (Result) -> Unit)`

Submits fingerprint data and receives risk score.

**Parameters:**
- `userId`: User identifier (not hashed)
- `onResult`: Callback function that receives `Result`

**Example:**
```kotlin
lifecycleScope.launch {
    sdk.submit("user123") { result ->
        when (result) {
            is Result.Success -> {
                println("Risk score: ${result.score}")
            }
            is Result.Error -> {
                println("Error: ${result.error}")
            }
            is Result.ConsentRequired -> {
                // Request consent
            }
        }
    }
}
```

**Threading:** 
- Collection and network calls run on `Dispatchers.IO`
- Callback executes on `Dispatchers.Main`

**Performance:**
- Collection: < 50ms
- Total: < 100ms

---

### Config

Configuration data class for SDK initialization.

**Properties:**
- `apiBaseUrl: String` - Base URL for API (must be HTTPS)
- `apiKey: String` - API key for authentication
- `consentRequired: Boolean` - Whether consent is required (default: `true`)

**Validation:**
- `apiBaseUrl` must start with `https://`
- Throws `IllegalArgumentException` if validation fails

**Example:**
```kotlin
val config = Config(
    apiBaseUrl = "https://api.keverd.com",
    apiKey = "your-api-key-here",
    consentRequired = true
)
```

---

### Result

Sealed class representing the result of fingerprint submission.

#### Result.Success

Successful submission with risk score.

**Properties:**
- `score: Double` - Risk score (0.0 to 1.0, where 1.0 is highest risk)
- `requestId: String` - Unique request identifier

**Example:**
```kotlin
when (result) {
    is Result.Success -> {
        if (result.score > 0.7) {
            // High risk
        }
    }
}
```

#### Result.Error

Submission failed with error information.

**Properties:**
- `error: String` - Error message
- `throwable: Throwable?` - Optional exception (default: `null`)

**Example:**
```kotlin
when (result) {
    is Result.Error -> {
        Log.e("SDK", result.error, result.throwable)
    }
}
```

#### Result.ConsentRequired

User consent is required but not granted.

**Example:**
```kotlin
when (result) {
    is Result.ConsentRequired -> {
        showConsentDialog()
    }
}
```

---

## Package: `com.keverd.sdk.collector`

### DeviceCollector

Collects device-related fingerprint data.

#### `collect(): Map<String, String?>`

Collects device information.

**Returns:** Map containing:
- `deviceId`: Hashed Android ID
- `manufacturer`: Device manufacturer
- `model`: Device model
- `brand`: Device brand
- `device`: Device name
- `product`: Product name
- `hardware`: Hardware name
- `sdkVersion`: Android SDK version
- `osVersion`: Android OS version
- `fingerprint`: Hashed build fingerprint
- `screenWidth`: Screen width in pixels
- `screenHeight`: Screen height in pixels
- `screenDensity`: Screen density
- `locale`: Device locale
- `timezone`: Timezone ID

**Performance:** < 10ms

---

### SimCollector

Collects SIM-related fingerprint data.

#### `collect(): Map<String, String?>`

Collects SIM and network information.

**Returns:** Map containing:
- `simSerial`: Hashed SIM serial number (requires permission)
- `simOperator`: SIM operator code
- `simOperatorName`: SIM operator name
- `simCountryIso`: SIM country ISO code
- `networkOperator`: Network operator code
- `networkOperatorName`: Network operator name
- `networkCountryIso`: Network country ISO code
- `phoneType`: Phone type
- `networkType`: Network type

**Performance:** < 10ms

**Permissions:** Requires `READ_PHONE_STATE` (gracefully handles missing permission)

---

### SessionCollector

Collects session-related fingerprint data.

#### `collect(): Map<String, String?>`

Collects session and install tracking data.

**Returns:** Map containing:
- `sessionId`: Hashed session ID
- `installId`: Hashed install ID
- `sessionCount`: Number of sessions
- `firstSession`: First session timestamp
- `timestamp`: Current timestamp

**Performance:** < 5ms

**Storage:** Uses SharedPreferences (`keverd_sdk_prefs`)

---

### BehavioralCollector

Collects behavioral fingerprint data.

#### `collect(): Map<String, String?>`

Collects user interaction data.

**Returns:** Map containing:
- `touchPressure`: Touch pressure
- `touchSize`: Touch size
- `touchDuration`: Touch duration in ms
- `scrollVelocity`: Scroll velocity
- `tapCount`: Number of taps
- `longPressDetected`: Whether long press detected
- `keyboardVisible`: Whether keyboard is visible

**Performance:** < 5ms

#### `createTouchListener(): View.OnTouchListener`

Creates a touch listener for collecting behavioral data.

**Returns:** `View.OnTouchListener` that can be attached to views

**Example:**
```kotlin
val collector = BehavioralCollector(context)
val touchListener = collector.createTouchListener()
view.setOnTouchListener(touchListener)
```

**Note:** Must be manually integrated into your UI

---

## Package: `com.keverd.sdk.network`

### FingerprintApi

Retrofit interface for fingerprint API.

#### `submitFingerprint(apiKey: String, request: FingerprintRequest): FingerprintResponse`

Submits fingerprint data to the API.

**Parameters:**
- `apiKey`: API key for authentication
- `request`: Fingerprint request data

**Returns:** `FingerprintResponse` with risk score

**Endpoint:** `POST /fingerprint/score`

**Headers:**
- `X-API-Key`: API key

**Throws:** Network exceptions on failure

---

### FingerprintRequest

Request model for fingerprint submission.

**Properties:**
- `userId: String` - User identifier
- `device: Map<String, String?>` - Device data
- `sim: Map<String, String?>` - SIM data
- `session: Map<String, String?>` - Session data
- `behavioral: Map<String, String?>` - Behavioral data

---

### FingerprintResponse

Response model from fingerprint API.

**Properties:**
- `score: Double` - Risk score (0.0 to 1.0)
- `requestId: String` - Unique request identifier
- `timestamp: Long?` - Optional timestamp

---

## Package: `com.keverd.sdk.util`

### HashUtil

Utility for SHA-256 hashing.

#### `sha256(input: String?): String?`

Hashes a string using SHA-256.

**Parameters:**
- `input`: String to hash (can be null or empty)

**Returns:** Hex-encoded SHA-256 hash, or `null` if input is null/empty

**Example:**
```kotlin
val hash = HashUtil.sha256("sensitive-data")
// Returns: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
```

---

## Error Handling

### Common Errors

#### Network Errors
```kotlin
Result.Error(
    error = "Network error occurred",
    throwable = IOException("Connection timeout")
)
```

#### Validation Errors
```kotlin
Result.Error(
    error = "Config validation failed: API base URL must use HTTPS"
)
```

#### Consent Errors
```kotlin
Result.ConsentRequired
```

---

## Threading

All network and collection operations run on background threads:
- **Collection**: `Dispatchers.IO`
- **Network**: `Dispatchers.IO`
- **Callbacks**: `Dispatchers.Main` (UI thread)

---

## Performance Guarantees

- **Data Collection**: < 50ms
- **Total Response Time**: < 100ms
- **SDK Size**: < 600 KB

---

## Best Practices

1. **Initialize Early**: Call `init()` in `Application.onCreate()`
2. **Handle Consent**: Always check for `Result.ConsentRequired`
3. **Error Handling**: Handle all `Result.Error` cases
4. **Thread Safety**: SDK is thread-safe, can be called from any thread
5. **Lifecycle**: Use `lifecycleScope` for coroutine-based calls

