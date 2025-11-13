---
sidebar_position: 1
---

# Getting Started

This guide will help you set up the development environment and run the SDK project in Android Studio.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Android Studio** (Hedgehog | 2023.1.1 or later)
- **JDK 11** or later
- **Android SDK** (API 21+)
- **Kotlin** plugin for Android Studio
- **Git** (for version control)

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd keverd_fraud_sdk
```

### 2. Open in Android Studio

1. Launch Android Studio
2. Select **File → Open**
3. Navigate to the project directory
4. Click **OK**

Android Studio will automatically:
- Sync Gradle files
- Download dependencies
- Index the project

### 3. Configure SDK Path

Ensure your `local.properties` file contains the correct Android SDK path:

```properties
sdk.dir=/Users/your-username/Library/Android/sdk
```

On Windows:
```properties
sdk.dir=C\:\\Users\\your-username\\AppData\\Local\\Android\\Sdk
```

On Linux:
```properties
sdk.dir=/home/your-username/Android/Sdk
```

## Building the Project

### Build the AAR Library

To build the SDK as an AAR file:

1. **Using Android Studio:**
   - Open the **Build** menu
   - Select **Make Module 'app'**
   - Or use the shortcut: `Cmd + F9` (Mac) / `Ctrl + F9` (Windows/Linux)

2. **Using Gradle:**
   ```bash
   ./gradlew assembleRelease
   ```

The AAR file will be generated at:
```
app/build/outputs/aar/app-release.aar
```

### Build Variants

The project supports the following build types:

- **Debug**: Development build with debug symbols
- **Release**: Production build with ProGuard enabled

To switch build variants in Android Studio:
1. Go to **Build → Select Build Variant**
2. Choose your desired variant

## Running Tests

### Unit Tests

Run unit tests from Android Studio:
1. Right-click on `app/src/test`
2. Select **Run 'Tests in 'app''**

Or via command line:
```bash
./gradlew test
```

### Instrumented Tests

Run instrumented tests on a connected device or emulator:
1. Connect a device or start an emulator
2. Right-click on `app/src/androidTest`
3. Select **Run 'Tests in 'app''**

Or via command line:
```bash
./gradlew connectedAndroidTest
```

## Project Structure

```
keverd_fraud_sdk/
├── app/
│   ├── build.gradle.kts          # Module build configuration
│   ├── proguard-rules.pro         # ProGuard rules for SDK
│   ├── consumer-rules.pro         # ProGuard rules for consumers
│   └── src/
│       ├── main/
│       │   ├── AndroidManifest.xml
│       │   ├── java/com/keverd/sdk/
│       │   │   ├── KeverdFingerprint.kt    # Main SDK class
│       │   │   ├── Config.kt                # Configuration
│       │   │   ├── Result.kt                # Result types
│       │   │   ├── collector/               # Data collectors
│       │   │   ├── network/                 # Network layer
│       │   │   ├── di/                      # Dependency injection
│       │   │   └── util/                    # Utilities
│       │   └── res/                         # Resources
│       ├── test/                            # Unit tests
│       └── androidTest/                     # Instrumented tests
├── gradle/
│   └── libs.versions.toml                  # Dependency versions
├── build.gradle.kts                        # Root build config
├── settings.gradle.kts                      # Project settings
└── README.md                               # Project README
```

## Development Workflow

### 1. Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Run tests to ensure nothing breaks
4. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

### 2. Code Style

The project follows Kotlin coding conventions:
- Use 4 spaces for indentation
- Follow Kotlin style guide: https://kotlinlang.org/docs/coding-conventions.html
- Use KDoc for public APIs

### 3. Building for Release

Before releasing:

1. Update version in `app/build.gradle.kts`:
   ```kotlin
   versionCode = 2
   versionName = "1.1.0"
   ```

2. Build release AAR:
   ```bash
   ./gradlew assembleRelease
   ```

3. Verify AAR size (< 600 KB):
   ```bash
   ls -lh app/build/outputs/aar/app-release.aar
   ```

## Troubleshooting

### Gradle Sync Issues

If Gradle sync fails:

1. **Invalidate Caches:**
   - Go to **File → Invalidate Caches / Restart**
   - Select **Invalidate and Restart**

2. **Clean Build:**
   ```bash
   ./gradlew clean
   ```

3. **Update Gradle Wrapper:**
   ```bash
   ./gradlew wrapper --gradle-version=8.11.2
   ```

### Dependency Issues

If dependencies fail to download:

1. Check internet connection
2. Verify repository URLs in `build.gradle.kts`
3. Try syncing again: **File → Sync Project with Gradle Files**

### Build Errors

Common build errors and solutions:

**Error: "SDK location not found"**
- Ensure `local.properties` has correct `sdk.dir` path

**Error: "Unresolved reference"**
- Sync Gradle: **File → Sync Project with Gradle Files**
- Rebuild: **Build → Rebuild Project**

**Error: "Kotlin version mismatch"**
- Update Kotlin version in `gradle/libs.versions.toml`
- Sync Gradle

## Next Steps

- Read [Architecture](/docs/architecture) to understand the internal workings
- Check [Development Guide](/docs/development) for development guidelines
- Review [API Reference](/docs/api) for API documentation

## Additional Resources

- [Android Developer Guide](https://developer.android.com/guide)
- [Kotlin Documentation](https://kotlinlang.org/docs/home.html)
- [Gradle User Guide](https://docs.gradle.org/current/userguide/userguide.html)

