const fs = require('fs');
const path = require('path');

function renamePNG_TXT(folder) {
   fs.readdir(folder, function (e, files) {
      if (e) return;
      else {
         files.forEach(file => {
            // if(file.endsWith('.png')){
            //    fs.rename(folder + file, folder + file.replace('.png.png.png', '.png'), function () { });

            // }
            let data = fs.readFileSync(folder + file, { encoding: 'UTF-8' });
            let readLine = data.split('\n');
            if (readLine[0] == '' && readLine[2]=='size: 1024,1024') {
               console.log(file + '   size: ' + readLine[2])
               // fs.rename(folder + file, folder + data.split('\n')[1].replace('.png', '.txt'), function () { });
            }
            //  else if (!readLine[0].includes('PNG')) {
            //    fs.rename(folder + file, folder + file.replace('.png', '.anim'), function () { });
            // } else {
            //    fs.rename(folder + file, folder + file.replace(/.png/g, '.png'), function () { });
            // }
         })
      }
   })
}

renamePNG_TXT('E:\\Entertaiment\\princess\\a0e1fdbf2b7b3e7236eb1e49f50924dc\\878d605dbb35c8cda7efcc09ea64c9b4\\4d9ac71116ebe5cad26a64b0ed154c4b\\')