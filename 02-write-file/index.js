const fs = require("fs");
const readline = require('readline');

const { stdin: input, stdout: output } = require('process');
const path = '02-write-file/text.txt';



const rl = readline.createInterface({ input, output });

function waitForUserInput() {
    rl.question('', (answer) => {
        if (answer == 'exit'){
            rl.close();
        } else {
            fs.appendFile(path, answer, (err) => {
                if(err) throw err;
            });
            waitForUserInput();
        }
    });
    rl.on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });
  }

fs.access(path, fs.F_OK, (err) => {
    if (err) {
        fs.open(path, 'w', (err) => {
            if(err) throw err;
        });
    }
    console.log('Enter text');
    waitForUserInput();
});