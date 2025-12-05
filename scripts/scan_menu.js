const Tesseract = require('tesseract.js');
const path = require('path');

async function scanMenu() {
    const menu1Path = path.join(__dirname, '../public/menu-items/Menu-1.jpeg');
    const menu2Path = path.join(__dirname, '../public/menu-items/Menu-2.jpeg');

    console.log('Scanning Menu-1.jpeg...');
    try {
        const result1 = await Tesseract.recognize(menu1Path, 'eng');
        console.log('--- Menu 1 Text ---');
        console.log(result1.data.text);
    } catch (error) {
        console.error('Error scanning Menu 1:', error.message);
    }

    console.log('\nScanning Menu-2.jpeg...');
    try {
        const result2 = await Tesseract.recognize(menu2Path, 'eng');
        console.log('--- Menu 2 Text ---');
        console.log(result2.data.text);
    } catch (error) {
        console.error('Error scanning Menu 2:', error.message);
    }
}

scanMenu();
