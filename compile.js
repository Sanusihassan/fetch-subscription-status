const fs = require('fs');
const path = require('path');

const directory = path.resolve(__dirname, './dist');

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        if (file.endsWith('.js')) {
            const newFullPath = fullPath.replace(/\.js$/, '.mjs');
            fs.rename(fullPath, newFullPath, renameErr => {
                if (renameErr) throw renameErr;
                console.log(`Renamed ${file} to ${path.basename(newFullPath)}`);
            });
        }
    });
});
