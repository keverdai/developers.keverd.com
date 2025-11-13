---
sidebar_position: 1
---

# Testing Guide

This document describes the testing strategy, test structure, and how to run tests for the Keverd Anti-ATO Android SDK.

## Testing Strategy

The SDK uses a multi-layered testing approach:

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **Instrumented Tests**: Test on Android devices/emulators
4. **Performance Tests**: Verify performance targets

## Test Structure

```
app/src/
├── test/                    # Unit tests
│   └── java/com/keverd/sdk/
│       ├── collector/
│       ├── network/
│       └── util/
└── androidTest/             # Instrumented tests
    └── java/com/keverd/sdk/
        └── integration/
```

## Unit Tests

### DeviceCollector Tests

**File**: `app/src/test/java/com/keverd/sdk/collector/DeviceCollectorTest.kt`

```kotlin
import com.keverd.sdk.collector.DeviceCollector
import com.keverd.sdk.util.HashUtil
import kotlinx.coroutines.test.runTest
import org.junit.Test
import org.junit.Assert.*
import org.mockito.Mockito.*

class DeviceCollectorTest {
    
    @Test
    fun `collect returns device data with hashed device ID`() = runTest {
        val context = mock(Context::class.java)
        val collector = DeviceCollector(context)
        
        val result = collector.collect()
        
        assertNotNull(result["deviceId"])
        // SHA-256 produces 64-character hex string
        assertEquals(64, result["deviceId"]?.length)
    }
    
    @Test
    fun `collect includes all required fields`() = runTest {
        val context = mock(Context::class.java)
        val collector = DeviceCollector(context)
        
        val result = collector.collect()
        
        assertTrue(result.containsKey("manufacturer"))
        assertTrue(result.containsKey("model"))
        assertTrue(result.containsKey("sdkVersion"))
        assertTrue(result.containsKey("screenWidth"))
        assertTrue(result.containsKey("locale"))
    }
    
    @Test
    fun `collect completes in under 10ms`() = runTest {
        val context = mock(Context::class.java)
        val collector = DeviceCollector(context)
        
        val start = System.currentTimeMillis()
        collector.collect()
        val duration = System.currentTimeMillis() - start
        
        assertTrue(duration < 10, "Collection took ${duration}ms")
    }
}
```

### SimCollector Tests

**File**: `app/src/test/java/com/keverd/sdk/collector/SimCollectorTest.kt`

```kotlin
import com.keverd.sdk.collector.SimCollector
import kotlinx.coroutines.test.runTest
import org.junit.Test
import org.junit.Assert.*

class SimCollectorTest {
    
    @Test
    fun `collect handles missing permission gracefully`() = runTest {
        val context = createMockContextWithoutPermission()
        val collector = SimCollector(context)
        
        val result = collector.collect()
        
        // Should return empty map or null values, not crash
        assertNotNull(result)
    }
    
    @Test
    fun `collect hashes SIM serial when permission granted`() = runTest {
        val context = createMockContextWithPermission()
        val collector = SimCollector(context)
        
        val result = collector.collect()
        
        val simSerial = result["simSerial"]
        if (simSerial != null) {
            assertEquals(64, simSerial.length) // SHA-256 hex length
        }
    }
}
```

### SessionCollector Tests

**File**: `app/src/test/java/com/keverd/sdk/collector/SessionCollectorTest.kt`

```kotlin
import com.keverd.sdk.collector.SessionCollector
import kotlinx.coroutines.test.runTest
import org.junit.Test
import org.junit.Assert.*
import org.junit.Before
import android.content.Context
import android.content.SharedPreferences

class SessionCollectorTest {
    
    private lateinit var context: Context
    private lateinit var prefs: SharedPreferences
    
    @Before
    fun setup() {
        context = mock(Context::class.java)
        prefs = mock(SharedPreferences::class.java)
    }
    
    @Test
    fun `collect creates session ID on first call`() = runTest {
        `when`(prefs.getString(anyString(), any())).thenReturn(null)
        val collector = SessionCollector(context, prefs)
        
        val result = collector.collect()
        
        assertNotNull(result["sessionId"])
        assertEquals(64, result["sessionId"]?.length) // Hashed
    }
    
    @Test
    fun `collect increments session count`() = runTest {
        `when`(prefs.getInt(anyString(), anyInt())).thenReturn(5)
        val collector = SessionCollector(context, prefs)
        
        val result = collector.collect()
        
        assertEquals("6", result["sessionCount"])
    }
}
```

### HashUtil Tests

**File**: `app/src/test/java/com/keverd/sdk/util/HashUtilTest.kt`

```kotlin
import com.keverd.sdk.util.HashUtil
import org.junit.Test
import org.junit.Assert.*

class HashUtilTest {
    
    @Test
    fun `sha256 returns correct hash for known input`() {
        val input = "test"
        val expected = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        
        val result = HashUtil.sha256(input)
        
        assertEquals(expected, result)
    }
    
    @Test
    fun `sha256 returns null for null input`() {
        val result = HashUtil.sha256(null)
        
        assertNull(result)
    }
    
    @Test
    fun `sha256 returns null for empty input`() {
        val result = HashUtil.sha256("")
        
        assertNull(result)
    }
    
    @Test
    fun `sha256 returns 64 character hex string`() {
        val result = HashUtil.sha256("test")
        
        assertNotNull(result)
        assertEquals(64, result!!.length)
        assertTrue(result.matches(Regex("[0-9a-f]{64}")))
    }
}
```

## Integration Tests

### Full Submission Flow Test

**File**: `app/src/androidTest/java/com/keverd/sdk/integration/SubmissionTest.kt`

```kotlin
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.keverd.sdk.Config
import com.keverd.sdk.KeverdFingerprint
import com.keverd.sdk.Result
import kotlinx.coroutines.runBlocking
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.Assert.*
import androidx.test.platform.app.InstrumentationRegistry

@RunWith(AndroidJUnit4::class)
class SubmissionTest {
    
    private val context = InstrumentationRegistry.getInstrumentation().targetContext
    
    @Test
    fun `submit returns success with valid config`() = runBlocking {
        val config = Config(
            apiBaseUrl = "https://api.keverd.com",
            apiKey = "test-api-key",
            consentRequired = false
        )
        
        val sdk = KeverdFingerprint.init(context, config)
        sdk.setConsent(true)
        
        var result: Result? = null
        sdk.submit("test-user") { result = it }
        
        // Wait for result
        Thread.sleep(2000)
        
        assertNotNull(result)
        assertTrue(result is Result.Success || result is Result.Error)
    }
    
    @Test
    fun `submit returns consent required when consent not granted`() = runBlocking {
        val config = Config(
            apiBaseUrl = "https://api.keverd.com",
            apiKey = "test-api-key",
            consentRequired = true
        )
        
        val sdk = KeverdFingerprint.init(context, config)
        // Don't set consent
        
        var result: Result? = null
        sdk.submit("test-user") { result = it }
        
        Thread.sleep(1000)
        
        assertNotNull(result)
        assertEquals(Result.ConsentRequired, result)
    }
}
```

## Performance Tests

### Collection Performance Test

**File**: `app/src/androidTest/java/com/keverd/sdk/performance/PerformanceTest.kt`

```kotlin
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.keverd.sdk.collector.*
import kotlinx.coroutines.runBlocking
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.Assert.*
import androidx.test.platform.app.InstrumentationRegistry

@RunWith(AndroidJUnit4::class)
class PerformanceTest {
    
    private val context = InstrumentationRegistry.getInstrumentation().targetContext
    
    @Test
    fun `device collection completes in under 10ms`() = runBlocking {
        val collector = DeviceCollector(context)
        
        val start = System.currentTimeMillis()
        collector.collect()
        val duration = System.currentTimeMillis() - start
        
        assertTrue(duration < 10, "Device collection took ${duration}ms")
    }
    
    @Test
    fun `sim collection completes in under 10ms`() = runBlocking {
        val collector = SimCollector(context)
        
        val start = System.currentTimeMillis()
        collector.collect()
        val duration = System.currentTimeMillis() - start
        
        assertTrue(duration < 10, "SIM collection took ${duration}ms")
    }
    
    @Test
    fun `total collection completes in under 50ms`() = runBlocking {
        val deviceCollector = DeviceCollector(context)
        val simCollector = SimCollector(context)
        val sessionCollector = SessionCollector(context, context.getSharedPreferences("test", Context.MODE_PRIVATE))
        val behavioralCollector = BehavioralCollector(context)
        
        val start = System.currentTimeMillis()
        deviceCollector.collect()
        simCollector.collect()
        sessionCollector.collect()
        behavioralCollector.collect()
        val duration = System.currentTimeMillis() - start
        
        assertTrue(duration < 50, "Total collection took ${duration}ms")
    }
}
```

## Running Tests

### Run All Tests

**Unit Tests:**
```bash
./gradlew test
```

**Instrumented Tests:**
```bash
./gradlew connectedAndroidTest
```

**All Tests:**
```bash
./gradlew check
```

### Run Specific Test

**From Android Studio:**
1. Right-click on test class or method
2. Select "Run 'TestName'"

**From Command Line:**
```bash
./gradlew test --tests "com.keverd.sdk.collector.DeviceCollectorTest"
```

### Test Coverage

Generate test coverage report:

```bash
./gradlew testDebugUnitTestCoverage
```

View report at:
```
app/build/reports/jacoco/testDebugUnitTestCoverage/html/index.html
```

## Mocking

### Mockito Setup

Add to `app/build.gradle.kts`:

```kotlin
dependencies {
    testImplementation("org.mockito:mockito-core:5.1.1")
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.1.0")
}
```

### Example Mock

```kotlin
import org.mockito.Mockito.*
import org.mockito.kotlin.any

val context = mock(Context::class.java)
`when`(context.getSystemService(any())).thenReturn(mock(TelephonyManager::class.java))
```

## Test Data

### Test Fixtures

Create test fixtures for consistent test data:

```kotlin
object TestFixtures {
    fun createConfig(): Config {
        return Config(
            apiBaseUrl = "https://api.test.com",
            apiKey = "test-api-key",
            consentRequired = false
        )
    }
    
    fun createMockContext(): Context {
        return mock(Context::class.java)
    }
}
```

## Best Practices

1. **Isolate Tests**: Each test should be independent
2. **Use Descriptive Names**: Test names should describe what they test
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Test Edge Cases**: Null, empty, invalid inputs
5. **Verify Performance**: Include performance assertions
6. **Mock External Dependencies**: Don't rely on real network/device

## Continuous Integration

### CI Test Configuration

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
    
    - name: Run unit tests
      run: ./gradlew test
    
    - name: Run instrumented tests
      run: ./gradlew connectedAndroidTest
      # Requires emulator or device
```

## Troubleshooting

### Common Issues

**Tests fail with "Unresolved reference"**
- Sync Gradle
- Rebuild project

**Instrumented tests fail**
- Ensure device/emulator is connected
- Check Android SDK is properly configured

**Performance tests fail**
- Run on physical device (emulator may be slower)
- Account for test overhead

**Mockito errors**
- Use `mockito-kotlin` for better Kotlin support
- Check mock setup is correct

