---
sidebar_position: 1
---

# Build Documentation

This document describes the build system, build configurations, and how to build the SDK for different scenarios.

## Build System

The project uses **Gradle** with **Kotlin DSL** for build configuration.

### Gradle Version

- **Gradle**: 8.11.2 (via wrapper)
- **AGP**: 8.11.2
- **Kotlin**: 2.0.21

### Project Structure

```
keverd_fraud_sdk/
├── build.gradle.kts              # Root build configuration
├── settings.gradle.kts            # Project settings
├── gradle.properties             # Gradle properties
├── gradle/
│   └── libs.versions.toml        # Dependency version catalog
└── app/
    ├── build.gradle.kts          # Module build configuration
    ├── proguard-rules.pro        # ProGuard rules for SDK
    └── consumer-rules.pro        # ProGuard rules for consumers
```

## Build Configurations

### Build Types

#### Debug
- **Minify**: Disabled
- **Debuggable**: Yes
- **Signing**: Debug signing
- **Use Case**: Development and testing

#### Release
- **Minify**: Enabled (ProGuard)
- **Debuggable**: No
- **Signing**: Release signing (if configured)
- **Use Case**: Production distribution

### Build Variants

The project has a single module (`app`) with two build types:
- `debug`
- `release`

## Building the SDK

### Build AAR File

#### Using Android Studio

1. Open the project in Android Studio
2. Select **Build → Make Module 'app'**
   - Or use shortcut: `Cmd + F9` (Mac) / `Ctrl + F9` (Windows/Linux)
3. AAR will be generated at:
   ```
   app/build/outputs/aar/app-release.aar
   ```

#### Using Gradle Command Line

**Debug AAR:**
```bash
./gradlew assembleDebug
```

**Release AAR:**
```bash
./gradlew assembleRelease
```

**Both:**
```bash
./gradlew assemble
```

### Output Location

AAR files are generated at:
```
app/build/outputs/aar/
├── app-debug.aar
└── app-release.aar
```

### Verify AAR Size

Check that AAR size is under 600 KB:

```bash
ls -lh app/build/outputs/aar/app-release.aar
```

Expected output:
```
-rw-r--r--  1 user  staff   450K Dec 15 10:00 app-release.aar
```

## ProGuard Configuration

### SDK ProGuard Rules

File: `app/proguard-rules.pro`

Rules for the SDK itself when building:

```proguard
# Keep SDK classes
-keep class com.keverd.sdk.** { *; }

# Keep Retrofit interfaces
-keep interface com.keverd.sdk.network.** { *; }

# Keep Gson models
-keep class com.keverd.sdk.network.** { *; }
```

### Consumer ProGuard Rules

File: `app/consumer-rules.pro`

Rules that are automatically applied to consuming apps:

```proguard
# Keep SDK classes
-keep class com.keverd.sdk.** { *; }

# Keep data classes
-keepclassmembers class com.keverd.sdk.** {
    <fields>;
    <methods>;
}

# Keep Retrofit interfaces
-keep interface com.keverd.sdk.network.** { *; }

# Keep Gson models
-keep class com.keverd.sdk.network.** { *; }

# Keep Kotlin coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
```

## Dependency Management

### Version Catalog

Dependencies are managed in `gradle/libs.versions.toml`:

```toml
[versions]
kotlin = "2.0.21"
coroutines = "1.7.3"
hilt = "2.48"
retrofit = "2.9.0"

[libraries]
kotlinx-coroutines-core = { 
    group = "org.jetbrains.kotlinx", 
    name = "kotlinx-coroutines-core", 
    version.ref = "coroutines" 
}
```

### Adding Dependencies

1. Add version to `[versions]` section
2. Add library to `[libraries]` section
3. Use in `app/build.gradle.kts`:
   ```kotlin
   implementation(libs.kotlinx.coroutines.core)
   ```

## Build Tasks

### Common Tasks

```bash
# Clean build artifacts
./gradlew clean

# Build AAR
./gradlew assembleRelease

# Run tests
./gradlew test

# Run lint
./gradlew lint

# Check dependencies
./gradlew dependencies

# Build and test
./gradlew build
```

### Task Dependencies

```
assembleRelease
├── compileReleaseKotlin
├── processReleaseResources
├── bundleReleaseAar
└── lintRelease
```

## Build Optimization

### Gradle Performance

Optimize Gradle build performance:

1. **Enable Gradle Daemon:**
   ```properties
   # gradle.properties
   org.gradle.daemon=true
   ```

2. **Enable Parallel Execution:**
   ```properties
   org.gradle.parallel=true
   ```

3. **Enable Build Cache:**
   ```properties
   org.gradle.caching=true
   ```

4. **Increase Heap Size:**
   ```properties
   org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
   ```

### Build Time Optimization

- Use incremental builds
- Enable build cache
- Use parallel execution
- Optimize ProGuard rules (keep only necessary)

## Signing Configuration

### Debug Signing

Debug builds are automatically signed with debug keystore.

### Release Signing

To sign release builds, configure in `app/build.gradle.kts`:

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("keystore.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "release"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
    
    buildTypes {
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}
```

**Note**: Never commit keystore files or passwords to version control.

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build SDK

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
    
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
    
    - name: Build AAR
      run: ./gradlew assembleRelease
    
    - name: Check AAR size
      run: |
        SIZE=$(stat -f%z app/build/outputs/aar/app-release.aar)
        if [ $SIZE -gt 614400 ]; then
          echo "AAR size ($SIZE bytes) exceeds 600 KB limit"
          exit 1
        fi
    
    - name: Upload AAR
      uses: actions/upload-artifact@v3
      with:
        name: keverd-sdk
        path: app/build/outputs/aar/app-release.aar
```

## Troubleshooting

### Build Failures

**Error: "SDK location not found"**
- Solution: Ensure `local.properties` has correct `sdk.dir` path

**Error: "Unresolved reference"**
- Solution: Sync Gradle (`./gradlew --refresh-dependencies`)

**Error: "Out of memory"**
- Solution: Increase heap size in `gradle.properties`

**Error: "ProGuard rules not found"**
- Solution: Ensure `proguard-rules.pro` exists in `app/` directory

### Performance Issues

**Slow builds:**
- Enable Gradle daemon
- Enable build cache
- Use parallel execution
- Increase heap size

**Large AAR size:**
- Check dependencies
- Optimize ProGuard rules
- Remove unused resources

## Build Artifacts

### Generated Files

After building, the following artifacts are generated:

```
app/build/
├── outputs/
│   ├── aar/
│   │   ├── app-debug.aar
│   │   └── app-release.aar
│   └── mapping/
│       └── release/
│           └── mapping.txt (ProGuard mapping)
├── intermediates/
│   └── ... (intermediate build files)
└── generated/
    └── ... (generated source files)
```

### AAR Contents

The AAR file contains:
- Compiled classes (`.class` files)
- Resources (`res/`)
- AndroidManifest.xml
- ProGuard mapping (if enabled)
- Consumer ProGuard rules

## Version Management

### Versioning Strategy

Use semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Updating Version

Update in `app/build.gradle.kts`:

```kotlin
defaultConfig {
    versionCode = 3        // Increment for each release
    versionName = "1.2.0"   // Semantic version
}
```

## Distribution

### Publishing AAR

1. Build release AAR:
   ```bash
   ./gradlew assembleRelease
   ```

2. Verify AAR:
   - Check size (< 600 KB)
   - Test in sample app
   - Verify ProGuard rules

3. Distribute:
   - Upload to repository
   - Or provide AAR file directly

### Maven Repository (Future)

For Maven publishing, add to `app/build.gradle.kts`:

```kotlin
plugins {
    id("maven-publish")
}

publishing {
    publications {
        create<MavenPublication>("release") {
            from(components["release"])
            
            groupId = "com.keverd"
            artifactId = "sdk"
            version = "1.0.0"
        }
    }
}
```

