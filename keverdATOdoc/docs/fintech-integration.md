---
sidebar_position: 1
---

# Fintech App Integration Guide

This guide explains how to integrate the Keverd Anti-ATO Android SDK into your fintech application.

## Overview

The Keverd SDK is designed as a **library (AAR)** that can be integrated into any Android fintech app. It does NOT require a standalone app - it's meant to be embedded in your existing application.

## ✅ SDK Configuration Status

The SDK is properly configured as a library:

- ✅ **Module Type**: Android Library (AAR) - `android.library` plugin
- ✅ **No Application Code**: Only library code, no launcher activities
- ✅ **Manifest**: Only permissions, no `<application>` tag
- ✅ **Dependencies**: Properly configured for library distribution
- ✅ **ProGuard Rules**: Consumer rules included for your app
- ✅ **Sample App**: Separate module for testing (not part of SDK)

## Integration Methods

### Method 1: AAR File (Recommended for Production)

#### Step 1: Get the AAR File

Build or download the AAR:
```bash
./gradlew :app:assembleRelease
```

The AAR will be at: `app/build/outputs/aar/app-release.aar`

#### Step 2: Add AAR to Your Project

1. Copy the AAR file to your app's `libs` directory:
   ```
   your-fintech-app/
   └── app/
       └── libs/
           └── keverd-sdk-release.aar
   ```

2. Add to your `app/build.gradle.kts`:
   ```kotlin
   dependencies {
       implementation(files("libs/keverd-sdk-release.aar"))
       
       // Required dependencies (if not already in your project)
       implementation("androidx.core:core-ktx:1.10.1")
       implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
       implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
       implementation("com.squareup.retrofit2:retrofit:2.9.0")
       implementation("com.squareup.retrofit2:converter-gson:2.9.0")
       implementation("com.squareup.okhttp3:okhttp:4.12.0")
       implementation("com.google.code.gson:gson:2.10.1")
   }
   ```

#### Step 3: Add Permissions

Add to your `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

**Note**: `READ_PHONE_STATE` is a runtime permission on Android 6.0+. Request it at runtime:

```kotlin
if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE) 
    != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(this, 
        arrayOf(Manifest.permission.READ_PHONE_STATE), 
        REQUEST_CODE)
}
```

### Method 2: Module Dependency (For Development)

If you have access to the SDK source code:

1. Add to `settings.gradle.kts`:
   ```kotlin
   include(":keverd-sdk")
   project(":keverd-sdk").projectDir = File("../keverd_fraud_sdk/app")
   ```

2. Add dependency in `app/build.gradle.kts`:
   ```kotlin
   dependencies {
       implementation(project(":keverd-sdk"))
   }
   ```

### Method 3: Maven Repository (Future)

When published to Maven:

```kotlin
repositories {
    maven {
        url = uri("https://your-maven-repo.com/releases")
    }
}

dependencies {
    implementation("com.keverd:sdk:1.0.0")
}
```

## Integration Steps

### 1. Initialize SDK

Initialize in your `Application` class:

```kotlin
import com.keverd.sdk.Config
import com.keverd.sdk.KeverdFingerprint

class MyFintechApp : Application() {
    private lateinit var keverdSdk: KeverdFingerprint
    
    override fun onCreate() {
        super.onCreate()
        
        val config = Config(
            apiBaseUrl = "https://api.keverd.com", // Your API endpoint
            apiKey = "your-api-key-here",           // Your API key
            consentRequired = true                  // Require user consent
        )
        
        keverdSdk = KeverdFingerprint.init(this, config)
    }
}
```

### 2. Request Consent (If Required)

Show consent dialog before collecting data:

```kotlin
fun showConsentDialog() {
    MaterialAlertDialogBuilder(this)
        .setTitle("Data Collection Consent")
        .setMessage("We collect device information to help prevent fraud. Your data is hashed and encrypted.")
        .setPositiveButton("Accept") { _, _ ->
            keverdSdk.setConsent(true)
            proceedWithTransaction()
        }
        .setNegativeButton("Decline") { _, _ ->
            keverdSdk.setConsent(false)
            // Handle declined consent
        }
        .show()
}
```

### 3. Submit Fingerprint

Submit fingerprint during critical operations (login, transaction, etc.):

```kotlin
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

fun performTransaction(userId: String, amount: Double) {
    lifecycleScope.launch {
        // Submit fingerprint before transaction
        keverdSdk.submit(userId) { result ->
            when (result) {
                is Result.Success -> {
                    val riskScore = result.score
                    
                    when {
                        riskScore >= 0.8 -> {
                            // Very high risk - require additional verification
                            requireBiometricVerification()
                        }
                        riskScore >= 0.5 -> {
                            // Medium risk - log for review
                            logSuspiciousActivity(result.requestId)
                            proceedWithTransaction()
                        }
                        else -> {
                            // Low risk - proceed normally
                            proceedWithTransaction()
                        }
                    }
                }
                
                is Result.Error -> {
                    // Log error but don't block transaction
                    Log.e("KeverdSDK", "Error: ${result.error}")
                    proceedWithTransaction() // Fail open
                }
                
                is Result.ConsentRequired -> {
                    // Request consent
                    showConsentDialog()
                }
            }
        }
    }
}
```

## Use Cases in Fintech Apps

### 1. Login/Sign-In

```kotlin
fun handleLogin(userId: String, password: String) {
    lifecycleScope.launch {
        keverdSdk.submit(userId) { result ->
            when (result) {
                is Result.Success -> {
                    if (result.score > 0.7) {
                        // High risk - require 2FA
                        requireTwoFactorAuth()
                    } else {
                        // Proceed with login
                        authenticateUser(userId, password)
                    }
                }
                // ... handle other cases
            }
        }
    }
}
```

### 2. Transaction Processing

```kotlin
fun processPayment(userId: String, amount: Double) {
    lifecycleScope.launch {
        keverdSdk.submit(userId) { result ->
            when (result) {
                is Result.Success -> {
                    when {
                        result.score >= 0.8 -> {
                            // Very high risk - block transaction
                            showSecurityAlert("Transaction blocked for security reasons")
                        }
                        result.score >= 0.6 -> {
                            // High risk - require PIN/biometric
                            requireAdditionalAuth { processPayment(userId, amount) }
                        }
                        else -> {
                            // Low risk - process payment
                            executePayment(userId, amount, result.requestId)
                        }
                    }
                }
                // ... handle errors
            }
        }
    }
}
```

### 3. Account Creation

```kotlin
fun createAccount(userData: UserData) {
    lifecycleScope.launch {
        keverdSdk.submit("new-user-${System.currentTimeMillis()}") { result ->
            when (result) {
                is Result.Success -> {
                    if (result.score > 0.5) {
                        // Medium risk - flag for manual review
                        createAccountWithReview(userData, result.requestId)
                    } else {
                        // Low risk - create account normally
                        createAccount(userData)
                    }
                }
                // ... handle other cases
            }
        }
    }
}
```

## Best Practices

### 1. Error Handling

Always handle errors gracefully - don't block user flows:

```kotlin
keverdSdk.submit(userId) { result ->
    when (result) {
        is Result.Success -> {
            // Use risk score for decision making
        }
        is Result.Error -> {
            // Log error but fail open (don't block user)
            Log.e("SDK", result.error, result.throwable)
            proceedNormally() // Continue with normal flow
        }
        is Result.ConsentRequired -> {
            // Request consent
        }
    }
}
```

### 2. Performance

The SDK is designed to be fast (< 100ms), but:

- Don't call `submit()` on every screen
- Use it for critical operations (login, transactions, account changes)
- Consider caching results for short periods

### 3. Privacy & Compliance

- Always request consent before collection
- Show privacy policy explaining data collection
- Allow users to revoke consent
- Comply with GDPR, CCPA, and local regulations

### 4. Testing

Test in different scenarios:

- Different Android versions (especially Android 10+)
- Devices with/without SIM cards
- With/without permissions granted
- Network failures
- API errors

## ProGuard Configuration

If you're using ProGuard/R8, the SDK includes consumer rules automatically. However, you may need to add:

```proguard
# Keep SDK classes (already included in consumer rules)
-keep class com.keverd.sdk.** { *; }

# If using reflection
-keepclassmembers class com.keverd.sdk.** {
    <fields>;
    <methods>;
}
```

## Troubleshooting

### SDK Not Initializing

- Check API URL is HTTPS
- Verify API key is correct
- Ensure Application class is properly registered in manifest

### No Data Collected

- Check permissions are granted (especially READ_PHONE_STATE)
- Verify consent is set if required
- Check Logcat for errors

### Network Errors

- Verify API URL is accessible
- Check network permissions
- Verify API key is valid

### Large App Size

The SDK adds minimal size (< 600 KB). If concerned:
- Use ProGuard/R8
- Remove unused dependencies
- Check for duplicate dependencies

## Security Considerations

1. **API Key Storage**: Store API key securely (not in code)
   ```kotlin
   // Use BuildConfig or secure storage
   val apiKey = BuildConfig.KEVERD_API_KEY
   ```

2. **HTTPS Only**: SDK enforces HTTPS - never use HTTP

3. **Data Hashing**: All sensitive data is hashed client-side

4. **No PII Storage**: SDK doesn't store raw PII

## Support

For integration help:
- Check [API Reference](/docs/api) for API reference
- Review [Architecture](/docs/architecture) for internal details
- Contact support team

## Example Integration

See the `sample/` module in this repository for a complete working example of SDK integration.

