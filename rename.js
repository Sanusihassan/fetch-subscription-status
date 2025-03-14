const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'dist');
fs.readdirSync(directory).forEach(file => {
    if (file.endsWith('.js')) {
        const oldPath = path.join(directory, file);
        const newPath = path.join(directory, file.replace('.js', '.mjs'));
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${file} to ${file.replace('.js', '.mjs')}`);
    }
});
