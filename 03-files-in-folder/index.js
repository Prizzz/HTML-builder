const fs = require("fs");
const path = require('path');


fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
    if (err) throw err;
    files.forEach(item => {
        if (item.isFile()){
            let name = path.parse(item.name).name;
            let ext = path.extname(item.name).slice(1);
            fs.stat(`03-files-in-folder/secret-folder/${item.name}`, function(err, stats) {
                if (err) throw err;

                let size = stats.size / 1000;
                console.log(`${name} - ${ext} - ${size}kb`);
            });
        }
    });
});



