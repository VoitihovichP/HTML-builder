const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


async function copyDir() {
    fs.stat(path.join(__dirname, 'files-copy'), (err, stats) => {
        if(err) {
            createFolder();
        } else {
            console.log('Выполнено!');
        }
        copyFiles();
    })
}
copyDir();


async function createFolder() {
    fs.mkdir(path.join(__dirname, 'files-copy'), err => {
        if (err) throw err;
        console.log('Папка была создана');
    });
}

function copyFiles() {
    fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
        if(err) {
            console.log(err);
        } else {
            files.forEach(file => {
                let fileName = file.name;
                fsPromises.copyFile(path.join(__dirname, 'files', `${fileName}`), path.join(__dirname, 'files-copy', `${fileName}`));
            })
        }
    })
}