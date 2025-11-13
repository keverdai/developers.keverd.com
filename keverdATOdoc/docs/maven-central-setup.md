---
sidebar_position: 1
---

# Maven Central Publishing Guide

This guide explains how to publish the Keverd SDK to Maven Central.

## Prerequisites

Before publishing to Maven Central, you need:

1. **Sonatype OSSRH Account**
   - Sign up at https://issues.sonatype.org/
   - Create a new project ticket for groupId `com.keverd`
   - Wait for approval (usually 1-2 business days)

2. **GPG Key for Signing**
   - Generate a GPG key pair
   - Publish public key to keyserver
   - Required for Maven Central

3. **Repository Access**
   - OSSRH username and password
   - GPG key ID, private key, and passphrase

## Setup Steps

### 1. Create Sonatype OSSRH Account

1. Go to https://issues.sonatype.org/
2. Create an account
3. Create a new ticket:
   - **Type**: New Project
   - **GroupId**: `com.keverd`
   - **Project URL**: `https://github.com/keverd/keverd-fraud-sdk`
   - **SCM URL**: `https://github.com/keverd/keverd-fraud-sdk.git`
4. Wait for approval

### 2. Generate GPG Key

```bash
# Generate GPG key
gpg --gen-key

# List keys to get key ID
gpg --list-secret-keys --keyid-format LONG

# Export public key
gpg --armor --export YOUR_KEY_ID > public-key.asc

# Publish to keyserver
gpg --keyserver keyserver.ubuntu.com --send-keys YOUR_KEY_ID
```

### 3. Configure Credentials

Create or update `~/.gradle/gradle.properties` (NOT in project):

```properties
# Sonatype OSSRH credentials
ossrhUsername=your-sonatype-username
ossrhPassword=your-sonatype-password

# GPG signing
signingKeyId=YOUR_GPG_KEY_ID
signingKey=-----BEGIN PGP PRIVATE KEY BLOCK-----\n...\n-----END PGP PRIVATE KEY BLOCK-----
signingPassword=your-gpg-passphrase
```

**Security Note**: Never commit these credentials to version control!

### 4. Update Version

Update version in `app/build.gradle.kts`:

```kotlin
version = "1.0.0"  // Use semantic versioning
```

### 5. Update POM Metadata

Update POM information in `app/build.gradle.kts`:

```kotlin
pom {
    name.set("Keverd Anti-ATO Android SDK")
    description.set("...")
    url.set("https://github.com/keverd/keverd-fraud-sdk")
    // ... update license, developers, SCM as needed
}
```

## Publishing

### Dry Run (Test Locally)

Test the publication locally first:

```bash
./gradlew :app:publishToMavenLocal
```

This publishes to `~/.m2/repository/com/keverd/sdk/1.0.0/`

### Publish to Staging

Publish to Sonatype staging repository:

```bash
./gradlew :app:publishReleasePublicationToOSSRHRepository
```

### Release to Maven Central

After publishing to staging:

1. Go to https://s01.oss.sonatype.org/
2. Login with your OSSRH credentials
3. Go to **Staging Repositories**
4. Find your repository (starts with `comkeverd-`)
5. **Close** the repository (validates artifacts)
6. **Release** the repository (publishes to Maven Central)

**Note**: It may take 10-30 minutes to sync to Maven Central after release.

### Verify Publication

After release, verify at:
- https://repo1.maven.org/maven2/com/keverd/sdk/
- https://search.maven.org/artifact/com.keverd/sdk

## Using the Published SDK

Once published, users can add to their `build.gradle.kts`:

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    implementation("com.keverd:sdk:1.0.0")
}
```

## Troubleshooting

### "GroupId not verified"

- Ensure your Sonatype ticket is approved
- Verify groupId matches exactly: `com.keverd`

### "Signature verification failed"

- Ensure GPG key is published to keyserver
- Verify signing credentials in `gradle.properties`
- Check key ID matches

### "Repository not found"

- Ensure you're using correct OSSRH URL
- Check credentials are correct
- Verify account has publishing permissions

### "Artifact validation failed"

- Ensure POM has all required fields
- Check license information is correct
- Verify SCM URLs are valid

## Requirements Checklist

Before publishing, ensure:

- [ ] Sonatype OSSRH account created and approved
- [ ] GPG key generated and published
- [ ] Credentials configured in `~/.gradle/gradle.properties`
- [ ] Version updated in `build.gradle.kts`
- [ ] POM metadata is complete and accurate
- [ ] License information is correct
- [ ] SCM URLs are valid
- [ ] All tests pass
- [ ] AAR builds successfully
- [ ] Source JAR generates correctly

## Version Management

Use semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

Update version in `app/build.gradle.kts` before each release.

## Automation (CI/CD)

For automated publishing, add to CI/CD pipeline:

```yaml
- name: Publish to Maven Central
  run: ./gradlew :app:publishReleasePublicationToOSSRHRepository
  env:
    OSSRH_USERNAME: ${{ secrets.OSSRH_USERNAME }}
    OSSRH_PASSWORD: ${{ secrets.OSSRH_PASSWORD }}
    SIGNING_KEY_ID: ${{ secrets.SIGNING_KEY_ID }}
    SIGNING_KEY: ${{ secrets.SIGNING_KEY }}
    SIGNING_PASSWORD: ${{ secrets.SIGNING_PASSWORD }}
```

## Additional Resources

- [Sonatype OSSRH Guide](https://central.sonatype.org/publish/publish-guide/)
- [GPG Key Management](https://central.sonatype.org/publish/requirements/gpg/)
- [Maven Central Requirements](https://central.sonatype.org/publish/requirements/)

