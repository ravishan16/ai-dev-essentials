const fs = require('fs');
const path = require('path');
const https = require('https');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const extensionPack = packageJson.extensionPack;

// Retry configuration
const MAX_RETRIES = 5;
const BASE_DELAY = 1000; // 1 second
const BATCH_SIZE = 3; // Reduced batch size
const BATCH_DELAY = 3000; // Increased delay between batches

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function validateExtensionWithRetry(extensionId, retries = 0) {
    return new Promise(async (resolve) => {
        try {
            // Exponential backoff delay
            if (retries > 0) {
                const delay = BASE_DELAY * Math.pow(2, retries - 1);
                await sleep(delay);
            }

            const url = `https://marketplace.visualstudio.com/items?itemName=${extensionId}`;
            
            const req = https.get(url, {
                headers: {
                    'User-Agent': 'VSCode-Extension-Validator',
                    'Accept': 'text/html',
                    'Connection': 'keep-alive'
                },
                timeout: 15000, // Increased timeout
                keepAlive: true,
                maxSockets: 1
            }, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
                        console.log(`✅ ${extensionId} - Valid and available in marketplace`);
                        resolve(true);
                    } else {
                        console.error(`❌ ${extensionId} - Status: ${res.statusCode}`);
                        if (retries < MAX_RETRIES) {
                            validateExtensionWithRetry(extensionId, retries + 1).then(resolve);
                        } else {
                            resolve(false);
                        }
                    }
                });
            });

            req.on('error', async (err) => {
                if (retries < MAX_RETRIES) {
                    console.log(`⚠️ ${extensionId} - Retry ${retries + 1}/${MAX_RETRIES} (${err.message})`);
                    resolve(await validateExtensionWithRetry(extensionId, retries + 1));
                } else {
                    console.error(`❌ ${extensionId} - Failed after ${MAX_RETRIES} retries: ${err.message}`);
                    resolve(false);
                }
            });

            req.on('timeout', () => {
                req.destroy();
                if (retries < MAX_RETRIES) {
                    console.log(`⚠️ ${extensionId} - Timeout, retry ${retries + 1}/${MAX_RETRIES}`);
                    validateExtensionWithRetry(extensionId, retries + 1).then(resolve);
                } else {
                    console.error(`❌ ${extensionId} - Timeout after ${MAX_RETRIES} retries`);
                    resolve(false);
                }
            });
        } catch (err) {
            if (retries < MAX_RETRIES) {
                console.log(`⚠️ ${extensionId} - Unexpected error, retry ${retries + 1}/${MAX_RETRIES}`);
                resolve(await validateExtensionWithRetry(extensionId, retries + 1));
            } else {
                console.error(`❌ ${extensionId} - Unexpected error after ${MAX_RETRIES} retries: ${err.message}`);
                resolve(false);
            }
        }
    });
}

async function validateExtensionsInBatches() {
    console.log('Validating extensions...\n');
    
    let validCount = 0;
    let results = [];
    let failedExtensions = [];

    // Process extensions in batches
    for (let i = 0; i < extensionPack.length; i += BATCH_SIZE) {
        const batch = extensionPack.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
            batch.map(async extension => {
                const isValid = await validateExtensionWithRetry(extension);
                if (!isValid) {
                    failedExtensions.push(extension);
                }
                return isValid;
            })
        );
        
        results = results.concat(batchResults);
        validCount += batchResults.filter(Boolean).length;

        // Increased delay between batches
        if (i + BATCH_SIZE < extensionPack.length) {
            console.log(`\nWaiting ${BATCH_DELAY/1000}s before next batch...\n`);
            await sleep(BATCH_DELAY);
        }
    }
    
    console.log('\nValidation complete:');
    console.log(`✓ ${validCount}/${extensionPack.length} extensions valid`);
    
    if (failedExtensions.length > 0) {
        console.error('\nFailed extensions:');
        failedExtensions.forEach(ext => console.error(`- ${ext}`));
        console.error('\nPossible reasons for failure:');
        console.error('1. Temporary network issues - try running the validation again');
        console.error('2. Rate limiting from the marketplace - try again in a few minutes');
        console.error('3. Extensions might have been removed or renamed');
        process.exit(1);
    }
}

validateExtensionsInBatches();