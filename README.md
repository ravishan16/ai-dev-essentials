# AI Dev Essentials

[![Version](https://img.shields.io/visual-studio-marketplace/v/ravishan16.ai-dev-essentials)](https://marketplace.visualstudio.com/items?itemName=ravishan16.ai-dev-essentials)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/ravishan16.ai-dev-essentials)](https://marketplace.visualstudio.com/items?itemName=ravishan16.ai-dev-essentials)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/ravishan16.ai-dev-essentials)](https://marketplace.visualstudio.com/items?itemName=ravishan16.ai-dev-essentials)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/ravishan16.ai-dev-essentials)](https://marketplace.visualstudio.com/items?itemName=ravishan16.ai-dev-essentials)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A curated VS Code extension pack for modern AI-powered development across Python, web, data, and cloud.

## 🚀 Features

This extension pack includes carefully selected tools for:

- 🤖 AI-Powered Development
- 🐍 Python & Data Science
- 💾 Database Management
- 🌐 Web Development
- ☁️ Cloud & DevOps
- 🔧 Developer Productivity

## 📦 Included Extensions

### AI & Code Assistance
- GitHub Copilot - AI pair programmer
- GitHub Copilot Chat - AI chat interface
- Google Gemini Code Assist - Code generation and assistance

### Python & Jupyter
- Python Extension (ms-python.python)
- Pylance - Fast Python language support
- Black Formatter - Code formatting
- Debugpy - Debugging support
- Jupyter Notebook Support & Extensions:
  - Jupyter Core
  - Jupyter Keymap
  - Jupyter Renderers
  - Jupyter Cell Tags
  - Jupyter Slideshow
- Data Wrangler - Data manipulation and visualization

### Databases & Data Tools
- SQLite Viewer (alexcvzz.vscode-sqlite)
- PostgreSQL (ms-ossdata.vscode-postgresql)
- Prisma - Modern database toolkit
- Supabase - Open source Firebase alternative
- CSV Tools:
  - Edit CSV (janisdd.vscode-edit-csv)
  - Rainbow CSV - Enhanced CSV/TSV viewing

### Cloud & DevOps
- Docker integration
- Remote Containers
- AWS Toolkit
- Google Cloud Code
- GitHub Pull Requests & Issues
- GitHub Actions
- GitLens - Git supercharged
- Kubernetes Tools
- Redis
- YAML Support

### Web Development
- HTML/CSS Support
- Prettier - Code formatting
- Live Server
- Tailwind CSS
- React/JS Snippets
- Auto Rename & Close Tags
- ESLint Integration

### Testing & API Development
- Jest Runner
- Playwright - E2E testing
- Thunder Client - REST API client
- REST Client - HTTP request testing
- ESLint - Code quality

### Developer Utilities
- EditorConfig
- TODO Tree
- VS Code Icons
- Makefile Tools
- dotenv Support

## 🛠️ Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "AI Dev Essentials"
4. Click Install

Or install via command line:
```bash
code --install-extension ravishan16.ai-dev-essentials
```

## ⚙️ Configuration

Most extensions work out of the box, but some may require additional setup:

1. **GitHub Copilot & GitHub Features**
   - Requires GitHub account
   - Copilot requires active subscription
   - Configure GitHub authentication for PR/Issues features

2. **Cloud Tools**
   - AWS Toolkit: Configure AWS credentials
   - Google Cloud: Install gcloud CLI
   - Docker: Install Docker Desktop
   - Kubernetes: Configure kubectl

3. **Database Tools**
   - PostgreSQL: Configure connection strings
   - Supabase: Set up project keys
   - Redis: Configure server connection

4. **Testing Tools**
   - Playwright: Run `npx playwright install` after installation
   - Jest: Configure test scripts in package.json

5. **Code Quality Tools**
   - ESLint: Create appropriate .eslintrc configuration
   - Prettier: Set up .prettierrc for consistent formatting
   - EditorConfig: Configure .editorconfig

## 📦 Publishing

### Prerequisites

1. **VS Code Publisher Account**
   - Create a publisher account on [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
   - Keep your Personal Access Token (PAT) handy

2. **Install Required Tools**
   ```bash
   npm install -g @vscode/vsce
   ```

### Publishing Steps

#### Automated Publishing (Recommended)

This extension uses GitHub Actions for automated publishing. To publish:

1. **Set up GitHub Secret**
   - Go to your repository Settings > Secrets and Variables > Actions
   - Add a new secret named `VSCE_PAT` with your VS Code Marketplace PAT

2. **Create a Release**
   - Update version in `package.json`
   - Update CHANGELOG.md
   - Create and push a new tag:
     ```bash
     git tag v1.x.x
     git push origin v1.x.x
     ```
   - The GitHub Action will automatically build and publish

#### Manual Publishing

1. **Package the Extension**
   ```bash
   vsce package
   ```
   This creates a `.vsix` file

2. **Publish to Marketplace**
   ```bash
   vsce publish
   ```
   Or publish a specific version:
   ```bash
   vsce publish x.x.x
   ```

3. **Publishing Privately**
   - Package the extension: `vsce package`
   - Share the `.vsix` file
   - Users can install it via:
     ```bash
     code --install-extension my-extension-x.x.x.vsix
     ```

### Troubleshooting

- Ensure your `package.json` has a valid `publisher` field
- Verify all repository links are correct
- Make sure you have the right permissions in the marketplace
- Check GitHub Actions logs for automated publishing issues

## 🧪 Testing

### Local Testing

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Tests**
   ```bash
   npm test
   ```

3. **Test in VS Code**
   - Press `F5` to open a new VS Code window with the extension loaded
   - Check that all extensions are listed in the Extensions view
   - Verify that the extensions install correctly
   - Test key features of major extensions

### Manual Testing Checklist

1. **Extension Pack Installation**
   - [ ] All extensions install without errors
   - [ ] No conflicts between extensions
   - [ ] Extension versions are compatible

2. **Key Features**
   - [ ] GitHub Copilot suggestions work
   - [ ] Python development tools load correctly
   - [ ] Database connections can be established
   - [ ] Docker integration functions properly
   - [ ] Git features are accessible

3. **Performance**
   - [ ] VS Code starts up normally
   - [ ] No significant lag in editor response
   - [ ] Memory usage is reasonable

### Automated Tests

The extension pack includes automated tests that verify:
- Extension manifest validity
- Extension ID correctness
- Version compatibility
- Package integrity

Run automated tests with:
```bash
npm run test
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This extension pack is licensed under the [MIT License](LICENSE).

## 📮 Feedback & Issues

- 🐛 Report bugs or issues on our [GitHub Issues](https://github.com/ravishan16/ai-dev-essentials/issues)
- 💡 Submit feature requests
- ⭐ Star the repository if you find it useful!

## 🔄 Updates

See our [CHANGELOG](CHANGELOG.md) for latest updates and changes.

---

**Happy Coding! 🚀**