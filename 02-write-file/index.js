const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
)

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    ``,
    (err) => {
        if (err) throw err;
    }
);

rl.question('Привет, введи свой текст:', input => {
    rl.on('line', input => {
        if(input === 'exit') {
            console.log('Уже уходишь? Ну пока :(');
            process.exit();
        }
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            `\n${input}`,
            err => {
                if (err) throw err;
            }
        );
    })
})

process.on('exit', () => console.log('\nДо новых встречь'));