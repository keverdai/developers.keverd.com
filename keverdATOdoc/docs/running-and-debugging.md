---
sidebar_position: 2
---

# Running and Debugging the SDK

This guide explains how to run, test, and debug the Keverd Anti-ATO Android SDK.

## Overview

Since the SDK is an **Android library (AAR)**, it cannot be run directly like an application. However, you can:

1. **Run the Sample App** - Test the SDK in a real app
2. **Run Unit Tests** - Test individual components
3. **Run Instrumented Tests** - Test on Android devices/emulators
4. **Build the AAR** - Generate the library file
5. **Debug** - Set breakpoints and debug the code

## 🚀 Quick Start: Running the Sample App

A sample app module is included to test the SDK.

### 1. Open in Android Studio

1. Open the project in Android Studio
2. Wait for Gradle sync to complete

### 2. Select the Sample Module

1. Click the **module selector** dropdown (top toolbar, next to the run button)
2. Select **`sample`** module
3. Select a device/emulator from the device dropdown

### 3. Run the Sample App

**Option A: Using Android Studio**
- Click the **Run** button (green play icon) or press `Shift + F10`
- Or go to **Run → Run 'sample'**

**Option B: Using Gradle**
```bash
./gradlew :sample:installDebug
```

### 4. Test the SDK

1. Launch the sample app on your device/emulator
2. Click **"Grant Consent"** button
3. Click **"Submit Fingerprint"** button
4. View the results on screen

**Note**: Update the API URL and API key in `sample/src/main/java/com/keverd/sdk/sample/MainActivity.kt`:

```kotlin
val config = Config(
    apiBaseUrl = "https://api.keverd.com", // Your API URL
    apiKey = "your-api-key-here",          // Your API key
    consentRequired = true
)
```

## 🧪 Running Tests

### Unit Tests

**In Android Studio:**
1. Right-click on `app/src/test`
2. Select **Run 'Tests in 'app''**

**Via Command Line:**
```bash
./gradlew test
```

**Run Specific Test:**
```bash
./gradlew test --tests "com.keverd.sdk.collector.DeviceCollectorTest"
```

### Instrumented Tests

**Prerequisites:**
- Connected Android device or running emulator

**In Android Studio:**
1. Connect a device or start an emulator
2. Right-click on `app/src/androidTest`
3. Select **Run 'Tests in 'app''**

**Via Command Line:**
```bash
./gradlew connectedAndroidTest
```

## 🐛 Debugging

### Debug the Sample App

1. **Set Breakpoints:**
   - Open any SDK file (e.g., `KeverdFingerprint.kt`)
   - Click in the gutter to set a breakpoint (red dot)

2. **Start Debugging:**
   - Select **`sample`** module
   - Click **Debug** button (bug icon) or press `Shift + F9`
   - Or go to **Run → Debug 'sample'**

3. **Debug Controls:**
   - **Step Over** (`F8`): Execute current line
   - **Step Into** (`F7`): Enter function calls
   - **Step Out** (`Shift + F8`): Exit current function
   - **Resume** (`F9`): Continue execution

### Debug Unit Tests

1. Set breakpoints in test files
2. Right-click on test class/method
3. Select **Debug 'TestName'**

### Debug Instrumented Tests

1. Set breakpoints in test files
2. Connect device/emulator
3. Right-click on test class/method
4. Select **Debug 'TestName'**

### Debug SDK Code from Sample App

1. Set breakpoints in SDK code (e.g., `DeviceCollector.kt`)
2. Run sample app in debug mode
3. When breakpoint is hit, you can:
   - Inspect variables
   - Evaluate expressions
   - Step through code
   - View call stack

## 📦 Building the AAR

### Build Release AAR

**In Android Studio:**
1. Go to **Build → Make Module 'app'**
2. Or press `Cmd + F9` (Mac) / `Ctrl + F9` (Windows/Linux)

**Via Command Line:**
```bash
./gradlew :app:assembleRelease
```

**Output Location:**
```
app/build/outputs/aar/app-release.aar
```

### Build Debug AAR

```bash
./gradlew :app:assembleDebug
```

## 🔍 Module Selection

### Available Modules

1. **`app`** - The SDK library module (cannot run directly)
2. **`sample`** - Sample app that uses the SDK (can run)

### Switching Modules

**In Android Studio:**
1. Click the **module dropdown** (top toolbar)
2. Select desired module:
   - For running/testing: Select **`sample`**
   - For building library: Select **`app`**

## 📱 Device/Emulator Setup

### Using Emulator

1. **Create AVD:**
   - Go to **Tools → Device Manager**
   - Click **Create Device**
   - Select device (e.g., Pixel 5)
   - Select system image (API 21+)
   - Click **Finish**

2. **Start Emulator:**
   - Click **Play** button in Device Manager
   - Or select from device dropdown when running

### Using Physical Device

1. **Enable Developer Options:**
   - Go to **Settings → About Phone**
   - Tap **Build Number** 7 times

2. **Enable USB Debugging:**
   - Go to **Settings → Developer Options**
   - Enable **USB Debugging**

3. **Connect Device:**
   - Connect via USB
   - Accept debugging prompt on device
   - Device should appear in Android Studio

## 🛠️ Common Debugging Scenarios

### Debug SDK Initialization

1. Set breakpoint in `KeverdFingerprint.init()`
2. Run sample app in debug mode
3. Step through initialization code

### Debug Data Collection

1. Set breakpoint in collector (e.g., `DeviceCollector.collect()`)
2. Run sample app
3. Click "Submit Fingerprint"
4. Step through collection code

### Debug Network Calls

1. Set breakpoint in `FingerprintApi.submitFingerprint()`
2. Run sample app
3. Inspect request/response data

### Debug Error Handling

1. Set breakpoint in error handling code
2. Trigger error condition
3. Inspect error details

## 📊 Viewing Logs

### Android Studio Logcat

1. Open **Logcat** tab (bottom panel)
2. Filter by:
   - **Package**: `com.keverd.sdk.sample`
   - **Tag**: `KeverdSDK`
   - **Level**: Debug, Info, Error

### Filtering Logs

```
# Show only SDK logs
tag:KeverdSDK

# Show errors
level:error

# Show specific package
package:com.keverd.sdk
```

## 🔧 Troubleshooting

### "Module not found" Error

**Solution:**
1. Sync Gradle: **File → Sync Project with Gradle Files**
2. Invalidate caches: **File → Invalidate Caches / Restart**

### Sample App Won't Run

**Solution:**
1. Ensure `sample` module is selected
2. Check device/emulator is connected
3. Verify API URL and key in `MainActivity.kt`

### Breakpoints Not Hitting

**Solution:**
1. Ensure running in **Debug** mode (not Run)
2. Check breakpoint is enabled (red dot, not gray)
3. Verify code is actually executed
4. Rebuild project: **Build → Rebuild Project**

### Tests Not Running

**Solution:**
1. For instrumented tests: Ensure device/emulator is connected
2. Check test configuration in **Run → Edit Configurations**
3. Verify test class is in correct package

## 📝 Quick Reference

### Keyboard Shortcuts (Mac)

- **Run**: `Ctrl + R`
- **Debug**: `Ctrl + D`
- **Stop**: `Cmd + F2`
- **Step Over**: `F8`
- **Step Into**: `F7`
- **Resume**: `F9`

### Keyboard Shortcuts (Windows/Linux)

- **Run**: `Shift + F10`
- **Debug**: `Shift + F9`
- **Stop**: `Ctrl + F2`
- **Step Over**: `F8`
- **Step Into**: `F7`
- **Resume**: `F9`

## 🎯 Best Practices

1. **Always test in sample app** before building AAR
2. **Use breakpoints** to understand code flow
3. **Check Logcat** for runtime errors
4. **Run tests** before committing changes
5. **Test on real devices** in addition to emulator

## 📚 Next Steps

- Read [Getting Started](/docs/getting-started) for setup details
- Check [Testing Guide](/docs/testing) for testing strategies
- Review [Development Guide](/docs/development) for coding guidelines

