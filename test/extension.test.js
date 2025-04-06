const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('Extension Pack Tests', () => {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    it('should have a valid package.json', () => {
        assert.ok(packageJson.name, 'Package name is required');
        assert.ok(packageJson.publisher, 'Publisher is required');
        assert.ok(packageJson.version, 'Version is required');
        assert.ok(packageJson.engines.vscode, 'VS Code engine version is required');
    });

    it('should have required extension pack fields', () => {
        assert.ok(Array.isArray(packageJson.extensionPack), 'extensionPack should be an array');
        assert.ok(packageJson.extensionPack.length > 0, 'extensionPack should not be empty');
    });

    it('should have valid extension IDs', () => {
        packageJson.extensionPack.forEach(extension => {
            assert.match(extension, /^[^.]+\.[^.]+$/, `Invalid extension ID format: ${extension}`);
        });
    });

    it('should have all required files', () => {
        const requiredFiles = [
            'README.md',
            'CHANGELOG.md',
            'LICENSE',
            'package.json'
        ];

        requiredFiles.forEach(file => {
            assert.ok(
                fs.existsSync(path.join(__dirname, '..', file)),
                `Required file ${file} is missing`
            );
        });
    });

    it('should have valid categories', () => {
        const validCategories = [
            'Extension Packs',
            'Programming Languages',
            'Data Science',
            'Machine Learning',
            'Testing',
            'Snippets'
        ];

        assert.ok(Array.isArray(packageJson.categories), 'categories should be an array');
        packageJson.categories.forEach(category => {
            assert.ok(
                validCategories.includes(category),
                `Invalid category: ${category}`
            );
        });
    });
});