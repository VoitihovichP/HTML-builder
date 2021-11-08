const fs = require('fs');
const readdir = require('fs/promises');
const path = require('path');


async function readFiles() {
  fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        let nameResult = file.name.match(/[\d\D\w\s][^.]+/g);
        nameResult.pop();
        if(file.isFile()) {
          fs.stat(path.join(__dirname, 'secret-folder' ,`${file.name}`), (err, stats) => {
            if(err) {
              console.log(err);
            } else {
              console.log(nameResult.join('') + ' - ' + path.extname(file.name) + ' - ' + stats['size'] + ' Bytes');
            }
          })
        }
      })
    }
  })
}

 readFiles();