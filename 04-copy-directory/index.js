const fs = require('fs');
const fsPromises = fs.promises;
  
fsPromises.mkdir('04-copy-directory/files-copy', {recursive: true});

fs.readdir('04-copy-directory/files-copy', 'utf8', (err, files) => {
    if (err) throw err;
    files.forEach(item => {
        fs.unlink(`04-copy-directory/files-copy/${item}`, (err => {
            if (err) console.log(err);
        }));
    });
});

fs.readdir('04-copy-directory/files', 'utf8', (err, files) => {
    if (err) throw err;
    files.forEach(item => {
        fsPromises.copyFile(`04-copy-directory/files/${item}`, `04-copy-directory/files-copy/${item}`);
    });
});

