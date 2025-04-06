# Development Guide

This document provides detailed information about developing, testing, and publishing the AI Dev Essentials extension pack.

## 📁 Project Structure

```
ai-dev-essentials/
├── images/                  # Extension icons and images
├── test/                   # Test files
│   ├── extension.test.js   # Extension manifest tests
│   └── validateExtensions.js # Extension validation tests
├── package.json           # Extension manifest
├── README.md             # Main documentation
├── CHANGELOG.md          # Version history
└── .github/             # GitHub workflows
```

## 🛠 Development Setup

1. **Prerequisites**
   - Node.js (>= 18)
   - VS Code
   - Git

2. **Clone and Install**
   ```bash
   git clone https://github.com/ravishan16/ai-dev-essentials.git
   cd ai-dev-essentials
   npm install
   ```

## 🧪 Testing

### Running Tests
```bash
npm test
```

This will:
1. Run extension validation tests (`validateExtensions.js`)
2. Verify all extensions exist in VS Code marketplace
3. Check package.json manifest validity
4. Validate extension IDs format

### Test Files
- `test/extension.test.js`: Tests package.json manifest
- `test/validateExtensions.js`: Validates extension availability

### Manual Testing
1. Press `F5` in VS Code to launch extension development host
2. Verify extensions are listed in Extensions view
3. Check installation of individual extensions
4. Test key features of major extensions

## 📦 Packaging

### Creating VSIX Package
```bash
npm run package
```

This creates a `.vsix` file that can be installed locally:
```bash
code --install-extension ai-dev-essentials-x.x.x.vsix
```

### Package Validation
1. Icon size (should be < 200KB)
2. README formatting
3. Extension manifest validity
4. Dependencies and devDependencies

## 📤 Publishing

### Prerequisites
1. VS Code Publisher Account
2. Personal Access Token (PAT)
3. `vsce` CLI tool installed globally

### Publishing Steps

#### Automated (via GitHub Actions)
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit changes
4. Create and push a tag:
   ```bash
   git tag vx.x.x
   git push origin vx.x.x
   ```
5. GitHub Action will:
   - Run tests
   - Create package
   - Publish to marketplace

#### Manual Publishing
```bash
vsce publish
```

### Troubleshooting
- Check PAT expiration
- Verify marketplace permissions
- Review GitHub Actions logs
- Validate extension IDs

## 🔄 Version Management

### Version Numbering
- MAJOR.MINOR.PATCH
- Example: 1.0.0

### Creating a Release
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release notes
4. Tag version in git
5. Push changes and tag

## 📋 Checklists

### Pre-release Checklist
- [ ] All tests passing
- [ ] Version updated
- [ ] Changelog updated
- [ ] README accurate
- [ ] Icons optimized
- [ ] Extensions validated
- [ ] GitHub workflows working

### Publishing Checklist
- [ ] Clean git status
- [ ] Dependencies up to date
- [ ] Tests passing
- [ ] Valid marketplace token
- [ ] Release notes ready

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

1. Fork repository
2. Create feature branch
3. Make changes
4. Run tests
5. Create pull request

## 🔑 Environment Setup

### Required Tokens
- VS Code Marketplace PAT
  - Scope: All accessible organizations
  - Permission: Marketplace > Manage

### GitHub Secrets
- `VSCE_PAT`: VS Code Marketplace PAT
  - Used by GitHub Actions for automated publishing