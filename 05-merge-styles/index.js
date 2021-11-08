const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;
    console.log('Файл был создан');
});

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if(err) {
        console.log(err);
    } else {
        const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
        files.forEach(file => {
            let fileName = file.name;
            if(file.isFile() && path.extname(file.name) === '.css') {
                const input = fs.createReadStream(path.join(__dirname, 'styles', `${fileName}`), 'utf-8');
                input.pipe(output);
            }
        })
    }
})