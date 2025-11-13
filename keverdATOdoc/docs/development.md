---
sidebar_position: 1
---

# Development Guide

This guide covers development practices, coding standards, and contribution guidelines for the Keverd Anti-ATO Android SDK.

## Development Environment Setup

### Required Tools

- **Android Studio**: Hedgehog | 2023.1.1 or later
- **JDK**: 11 or later
- **Kotlin**: 1.9+
- **Android SDK**: API 21+ (Android 5.0 Lollipop)
- **Gradle**: 8.11.2 (included via wrapper)

### IDE Configuration

#### Code Style

The project follows Kotlin official style guide:
- **Indentation**: 4 spaces
- **Line Length**: 120 characters
- **Naming**: camelCase for variables, PascalCase for classes

#### Code Formatting

Android Studio settings:
1. Go to **Preferences → Editor → Code Style → Kotlin**
2. Import the Kotlin style guide
3. Enable **Reformat on Save**

#### Linting

The project uses Android Lint. Run lint checks:
```bash
./gradlew lint
```

## Project Structure

```
app/src/main/java/com/keverd/sdk/
├── KeverdFingerprint.kt      # Main SDK class
├── Config.kt                 # Configuration
├── Result.kt                 # Result types
├── collector/
│   ├── DeviceCollector.kt
│   ├── SimCollector.kt
│   ├── SessionCollector.kt
│   └── BehavioralCollector.kt
├── network/
│   ├── FingerprintApi.kt
│   ├── FingerprintRequest.kt
│   └── FingerprintResponse.kt
├── di/
│   ├── NetworkModule.kt
│   └── AppModule.kt
└── util/
    └── HashUtil.kt
```

## Coding Standards

### Kotlin Conventions

1. **Use Kotlin idioms:**
   ```kotlin
   // Good
   val result = data?.let { process(it) } ?: defaultValue
   
   // Avoid
   val result = if (data != null) process(data) else defaultValue
   ```

2. **Prefer data classes:**
   ```kotlin
   data class Config(val apiBaseUrl: String, val apiKey: String)
   ```

3. **Use sealed classes for results:**
   ```kotlin
   sealed class Result {
       data class Success(...) : Result()
       data class Error(...) : Result()
   }
   ```

### Naming Conventions

- **Classes**: PascalCase (`DeviceCollector`)
- **Functions**: camelCase (`collect()`)
- **Variables**: camelCase (`deviceId`)
- **Constants**: UPPER_SNAKE_CASE (`SESSION_ID_KEY`)
- **Packages**: lowercase (`com.keverd.sdk`)

### Documentation

All public APIs must have KDoc:

```kotlin
/**
 * Collects device-related fingerprint data
 * All identifiers are hashed before return
 *
 * @return Map of device data with hashed identifiers
 */
suspend fun collect(): Map<String, String?>
```

### Error Handling

1. **Use sealed classes for results:**
   ```kotlin
   sealed class Result {
       data class Success(...) : Result()
       data class Error(val message: String) : Result()
   }
   ```

2. **Handle nulls gracefully:**
   ```kotlin
   val value = nullableValue ?: return null
   ```

3. **Catch specific exceptions:**
   ```kotlin
   try {
       // operation
   } catch (e: IOException) {
       // handle IO error
   } catch (e: Exception) {
       // handle other errors
   }
   ```

## Security Guidelines

### Data Hashing

**Rule**: All sensitive identifiers MUST be hashed before transmission.

```kotlin
// ✅ Good
val deviceId = HashUtil.sha256(getAndroidId())

// ❌ Bad
val deviceId = getAndroidId() // Raw identifier
```

### HTTPS Only

**Rule**: All network calls MUST use HTTPS.

```kotlin
// ✅ Good
val config = Config(
    apiBaseUrl = "https://api.keverd.com",
    ...
)

// ❌ Bad
val config = Config(
    apiBaseUrl = "http://api.keverd.com", // Will throw exception
    ...
)
```

### No PII in Logs

**Rule**: Never log raw PII.

```kotlin
// ✅ Good
Log.d("SDK", "Device ID collected: ${HashUtil.sha256(deviceId)}")

// ❌ Bad
Log.d("SDK", "Device ID: $deviceId") // Raw PII
```

### No PII in Storage

**Rule**: Only store hashed values in SharedPreferences.

```kotlin
// ✅ Good
prefs.edit().putString("device_id", HashUtil.sha256(deviceId)).apply()

// ❌ Bad
prefs.edit().putString("device_id", deviceId).apply() // Raw PII
```

## Performance Guidelines

### Collection Performance

Each collector must complete in its target time:
- `DeviceCollector`: < 10ms
- `SimCollector`: < 10ms
- `SessionCollector`: < 5ms
- `BehavioralCollector`: < 5ms

**Total**: < 50ms

### Optimization Tips

1. **Avoid I/O in collectors:**
   ```kotlin
   // ✅ Good - Direct system calls
   val androidId = Settings.Secure.getString(...)
   
   // ❌ Bad - File I/O
   val data = File("data.txt").readText()
   ```

2. **Cache expensive operations:**
   ```kotlin
   private val telephonyManager by lazy {
       context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
   }
   ```

3. **Use coroutines for async:**
   ```kotlin
   // ✅ Good
   suspend fun collect() = withContext(Dispatchers.IO) { ... }
   
   // ❌ Bad
   fun collect() = Thread { ... }.start()
   ```

## Testing Guidelines

### Unit Tests

Create unit tests for all collectors:

```kotlin
class DeviceCollectorTest {
    @Test
    fun `collect returns hashed device ID`() = runTest {
        val collector = DeviceCollector(context)
        val result = collector.collect()
        
        assertNotNull(result["deviceId"])
        assertTrue(result["deviceId"]!!.length == 64) // SHA-256 hex length
    }
}
```

### Integration Tests

Test the full submission flow:

```kotlin
@Test
fun `submit returns success with valid data`() = runTest {
    val sdk = KeverdFingerprint.init(context, config)
    sdk.setConsent(true)
    
    var result: Result? = null
    sdk.submit("user123") { result = it }
    
    assertTrue(result is Result.Success)
}
```

### Performance Tests

Verify performance targets:

```kotlin
@Test
fun `collection completes in under 50ms`() = runTest {
    val start = System.currentTimeMillis()
    collector.collect()
    val duration = System.currentTimeMillis() - start
    
    assertTrue(duration < 50, "Collection took ${duration}ms")
}
```

## Building and Releasing

### Build Commands

```bash
# Debug build
./gradlew assembleDebug

# Release build
./gradlew assembleRelease

# Run tests
./gradlew test

# Run lint
./gradlew lint
```

### Version Management

Update version in `app/build.gradle.kts`:

```kotlin
defaultConfig {
    versionCode = 2        // Increment for each release
    versionName = "1.1.0"  // Semantic versioning
}
```

### Release Checklist

- [ ] Update version number
- [ ] Run all tests
- [ ] Run lint checks
- [ ] Verify AAR size < 600 KB
- [ ] Update CHANGELOG.md
- [ ] Build release AAR
- [ ] Test AAR in sample app
- [ ] Tag release in Git

## Dependency Management

### Adding Dependencies

Add to `gradle/libs.versions.toml`:

```toml
[versions]
new-library = "1.0.0"

[libraries]
new-library = { group = "com.example", name = "library", version.ref = "new-library" }
```

Then use in `app/build.gradle.kts`:

```kotlin
implementation(libs.new.library)
```

### Updating Dependencies

1. Update version in `libs.versions.toml`
2. Sync Gradle
3. Test thoroughly
4. Check for breaking changes

## Code Review Guidelines

### Review Checklist

- [ ] Code follows Kotlin conventions
- [ ] All public APIs have KDoc
- [ ] Security guidelines followed (hashing, HTTPS)
- [ ] Performance targets met
- [ ] Tests added/updated
- [ ] No raw PII in logs/storage
- [ ] Error handling implemented
- [ ] Thread safety considered

### Common Issues to Watch

1. **Missing hashing:**
   ```kotlin
   // ❌ Missing hash
   "deviceId" to getAndroidId()
   ```

2. **HTTP instead of HTTPS:**
   ```kotlin
   // ❌ HTTP URL
   apiBaseUrl = "http://api.example.com"
   ```

3. **Raw PII in logs:**
   ```kotlin
   // ❌ Logging raw data
   Log.d("SDK", "Device: $deviceId")
   ```

4. **Missing null checks:**
   ```kotlin
   // ❌ Potential NPE
   val value = nullableValue.length
   ```

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits:

```
feat: Add behavioral data collection
fix: Handle null device ID gracefully
docs: Update API documentation
refactor: Simplify collector initialization
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Write/update tests
4. Run tests and lint
5. Create PR with description
6. Address review comments
7. Merge after approval

## Troubleshooting

### Build Issues

**Gradle sync fails:**
```bash
./gradlew clean
./gradlew --refresh-dependencies
```

**Kotlin version mismatch:**
- Update Kotlin version in `libs.versions.toml`
- Sync Gradle

**Dependency conflicts:**
- Check dependency tree: `./gradlew dependencies`
- Resolve conflicts manually

### Runtime Issues

**SDK not initializing:**
- Check config validation (HTTPS URL)
- Verify context is application context

**Network errors:**
- Verify API URL is correct
- Check network permissions
- Verify API key is valid

## Resources

- [Kotlin Style Guide](https://kotlinlang.org/docs/coding-conventions.html)
- [Android Developer Guide](https://developer.android.com/guide)
- [Coroutines Guide](https://kotlinlang.org/docs/coroutines-guide.html)
- [Retrofit Documentation](https://square.github.io/retrofit/)

