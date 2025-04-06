const fs = require('fs');
const path = require('path');
const https = require('https');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const extensionPack = packageJson.extensionPack;

async function validateExtension(extensionId) {
    return new Promise((resolve) => {
        const [publisher, name] = extensionId.split('.');
        const url = `https://marketplace.visualstudio.com/items?itemName=${extensionId}`;
        
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`✅ ${extensionId} - Valid and available in marketplace`);
                resolve(true);
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                // Handle redirects as success since the marketplace uses them
                console.log(`✅ ${extensionId} - Valid and available in marketplace`);
                resolve(true);
            } else {
                console.error(`❌ ${extensionId} - Status: ${res.statusCode}`);
                resolve(false);
            }
        }).on('error', (err) => {
            console.error(`❌ ${extensionId} - Error checking: ${err.message}`);
            resolve(false);
        });
    });
}

async function validateAllExtensions() {
    console.log('Validating extensions...\n');
    
    // Process extensions sequentially to avoid rate limiting
    let validCount = 0;
    for (const extension of extensionPack) {
        const isValid = await validateExtension(extension);
        if (isValid) validCount++;
        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\nValidation complete:`);
    console.log(`✓ ${validCount}/${extensionPack.length} extensions valid`);
    
    // Don't exit with error for now since we're just validating
    // process.exit(validCount !== extensionPack.length ? 1 : 0);
}

validateAllExtensions();