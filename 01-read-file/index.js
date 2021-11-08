const fs = require('fs');
const path = require('path');
const resultPath = path.join(__dirname, 'text.txt');

async function readText() {
    const readableStream = fs.createReadStream(resultPath);
    readableStream.on('data', chunk => console.log(chunk.toString()));
}

readText();