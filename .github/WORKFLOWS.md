# GitHub Actions Workflows Documentation

## Overview

Automated workflows for branch synchronization across deployment environments and end-to-end testing.

## Workflows

### 1. CI (`ci.yml`)

**Trigger**: PR opened or updated against `main` or direct push to `main`

**Action**: Runs oxlint (type-aware) and tsc typechecker

**Purpose**: Catches lint errors and build failures before merge

## Token Setup

### Required Token: `PROJECT_ACTIONS_GITHUB_TOKEN`

All workflows use a custom Personal Access Token (PAT) instead of the default `GITHUB_TOKEN` to ensure that automatic merges trigger other workflows (CI/CD, tests, linting, etc.).

### Required Permissions

#### Fine-grained Personal Access Token (Recommended)

**Repository permissions:**

- **Contents**: Read and write ✅
- **Issues**: Read and write ✅
- **Pull requests**: Read and write ✅
- **Workflows**: Read and write ✅
- **Metadata**: Read ✅ (automatically included)

#### Classic Personal Access Token

If using a classic token:

- **`repo`** (Full control of private repositories) ✅

### Permissions NOT Required

- **Commit statuses**: ❌ Not needed (workflows don't create/update statuses)
- **Actions**: ❌ Not needed (for basic merge operations)

### How to Create/Update the Token

1. Go to **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
2. Click **Generate new token**
3. Configure:
   - **Token name**: `PROJECT_ACTIONS_GITHUB_TOKEN`
   - **Expiration**: Choose appropriate duration
   - **Repository access**: Select this repository
   - **Permissions**: Set as listed above
4. Generate and copy the token
5. Add to repository: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Name: `PROJECT_ACTIONS_GITHUB_TOKEN`
   - Value: Paste your token

## Troubleshooting

### Workflow fails with permission error

- Verify `PROJECT_ACTIONS_GITHUB_TOKEN` secret is configured
- Check token has correct permissions (Contents: Write, Pull requests: Read)
- Ensure token hasn't expired

### Other workflows not triggering after merge

- Confirm using `PROJECT_ACTIONS_GITHUB_TOKEN` (not `GITHUB_TOKEN`)
- Using the default `GITHUB_TOKEN` prevents triggering other workflows
