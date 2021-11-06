const fs = require('fs');
const path = require('path');


fs.readdir('05-merge-styles/styles', {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
    if (err) throw err;
    fs.open('05-merge-styles/project-dist/bundle.css', 'w', (err) => {
        if(err) throw err;
    });
    files.forEach(item => {
        if (item.isFile() && path.extname(item.name) == '.css'){
            let readStream = fs.createReadStream(`05-merge-styles/styles/${item.name}`);
            readStream.on('data', (data) => { 
                fs.appendFile('05-merge-styles/project-dist/bundle.css', data.toString(), (err) => {
                    if(err) throw err;
                });
            });
            
        }
    });
});