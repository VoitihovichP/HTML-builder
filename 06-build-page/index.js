const fs = require('fs');
const path = require('path');
const fsPrommises = require('fs/promises');

const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToDistIndex = path.join(__dirname, 'project-dist', 'index.html');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponentsHeader = path.join(__dirname, "components", 'header.html');
const pathToComponentsArticles = path.join(__dirname, "components", 'articles.html');
const pathToComponentsFooter = path.join(__dirname, "components", 'footer.html');
const pathToStyleFolder = path.join(__dirname, 'styles');
const pathToAssets = path.join(__dirname, 'assets');
const pathToDistAssets = path.join(__dirname, 'project-dist','assets');
const pathToDistStyleFile =  path.join(__dirname, 'project-dist', 'style.css');


fs.mkdir(pathToProjectDist, { recursive: true }, err => {
    if (err) throw err;
    console.log('Папка была создана');
});


fs.writeFile(pathToDistIndex, '', (err) => {
    if(err) throw err;
})


const input = fs.createReadStream(pathToTemplate, 'utf-8');
input.on('data', chunk => {
    if (chunk.indexOf("{{header}}")!==-1){
        const input2 = fs.createReadStream(pathToComponentsHeader, 'utf-8');
        const input3 = fs.createReadStream(pathToComponentsArticles, 'utf-8');
        const input4 = fs.createReadStream(pathToComponentsFooter, 'utf-8');

        const output = fs.createWriteStream(pathToDistIndex);

        input2.on('data', chunk2 => {
            newStr =  chunk.replace(/{{header}}/, chunk2);
            input3.on('data', chunk3 => {
                newStr =  newStr.replace(/{{articles}}/, chunk3);
            input4.on('data', chunk4 => {
                newStr =  newStr.replace(/{{footer}}/, chunk4);
                    output.write(newStr);  
                })
            }) 
        })
    }
})

input.on('error', error => {
    if(error) {
        console.log('Error', error.message);
    };
});


fs.mkdir(pathToDistAssets, {recursive: true}, err => {
    if (err) throw err;
    console.log('Папка была создана');
})


fs.promises.readdir(pathToAssets)
    .then(files => {
    for (let filename of files) {
        if (!path.parse(filename).ext){
            fs.mkdir(path.join(__dirname, 'project-dist','assets',filename),{ recursive: true }, err => {
                if (err) throw err;
            });

            fs.promises.readdir(path.join(__dirname,"assets",filename))
            .then(files2 => {
                    for (let filename2 of files2) {
                        function returnErr(err) {
                                if (err) throw err;
                            }
                            fs.copyFile(path.join(__dirname,"assets",filename,filename2), path.join(__dirname,'project-dist',"assets",filename,filename2), returnErr);
                    }})
            .catch(err => {
                console.log(err)
            })
        }
    }
})
    .catch(err => {
        console.log(err)
    })


fs.writeFile(
    pathToDistStyleFile, '', (err) => {
        if (err) throw err;
    }
);

fs.promises.readdir(pathToStyleFolder)
    .then(files => {
    for (let filename of files) {
        
        if (path.parse(filename).ext.substring(1)==="css"){
            const input = fs.createReadStream(path.join(__dirname, 'styles', filename), 'utf-8');

            input.on('data', chunk => {
                fs.appendFile(
                    pathToDistStyleFile, chunk, err => {
                        if (err) throw err;
                    }
                );
            });

            input.on('error', error => {
                if(error) {
                    console.log('Error', error.message);
                }
            });

        }
    }
})
    .catch(err => {
        console.log(err);
    })