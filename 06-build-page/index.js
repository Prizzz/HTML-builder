const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;


fsPromises.mkdir('06-build-page/project-dist', {recursive: true});

//css
fs.readdir('06-build-page/styles', {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
    if (err) throw err;
    fs.open('06-build-page/project-dist/style.css', 'w', (err) => {
        if(err) throw err;
    });
    files.forEach(item => {
        if (item.isFile() && path.extname(item.name) == '.css'){
            let readStream = fs.createReadStream(`06-build-page/styles/${item.name}`);
            readStream.on('data', (data) => { 
                fs.appendFile('06-build-page/project-dist/style.css', data.toString(), (err) => {
                    if(err) throw err;
                });
            });
        }
    });
});

//html
let readStream = fs.createReadStream(`06-build-page/template.html`);
readStream.on('data', (data) => { 
    let html = data.toString();

    fs.readdir('06-build-page/components', {withFileTypes: true, encoding: 'utf8'}, (err, files) => {
        if (err) throw err;
        files.forEach(item => {
            let readStream = fs.createReadStream(`06-build-page/components/${item.name}`);
            let component = path.parse(item.name).name;
            readStream.on('data', (data) => { 
                html = html.replace(`{{${component}}}`, data.toString());
                fs.writeFile('06-build-page/project-dist/index.html', html, (err) => {
                    if (err) throw err;
                });
            });
        });
    });
});


//assets
const copy = async (src, dest) => {
    await fs.mkdir(dest, {recursive: true}, () => {});
    fs.readdir(src, {withFileTypes: true}, (err, files) => {
        files.forEach((file) => {
            let srcPath = path.join(src, file.name);
            let destPath = path.join(dest, file.name);
            if(file.isDirectory()) {
                copy(srcPath, destPath);
            } else {
                fs.copyFile(srcPath, destPath,() => {});
            }
        });
    });
};
  
const src = '06-build-page/assets';
const dest ='06-build-page/project-dist';
  
const copyDir = async (src, dest) => {
    await fs.mkdir(dest, {recursive: true}, () => {});
    const newDest = '06-build-page/project-dist/assets';
    await copy(src, newDest);
};
  
copyDir(src, dest);



