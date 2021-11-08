const fs = require('fs');
const path = require('path');

async function createNewFolder() {
    fs.mkdir(path.join(__dirname, 'project-dist'), err => {
        if (err) throw err;
        console.log('Папка была создана');
    });
}
createNewFolder();