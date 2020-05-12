var fs = require('fs');
var path = require('path');

function extend(folder) {
   fs.readdir(folder, { encode: 'utf-8' }, function (e, files) {
      for (let file of files) {
         let stat = fs.lstatSync(folder + file);
         if (!stat.isDirectory() && stat.size > 2 * 1024) {
            let data = fs.readFileSync(folder + file, { encoding: 'UTF-8' });
            let readLine = data.split('\n');
            let extendTemp = '.anim';
            if (file.endsWith(extendTemp)) {
               if (readLine[0] == '') {
                  fs.rename(folder + file, folder + file.replace(extendTemp, '.txt'), function () { });
               } else if (readLine[0].includes('xml')) {
                  fs.rename(folder + file, folder + file.replace(extendTemp, '.xml'), function () { });
               } else if (readLine[0].includes('#')) {
                  fs.rename(folder + file, folder + file.replace(extendTemp, '.h'), function () { });
               } else if (readLine[0].includes('PNG')) {
                  fs.rename(folder + file, folder + file.replace(extendTemp, '.png'), function () { });
               } else if(readLine[0].includes('9e5dEKTQTuYkjrdAH')){
                  fs.rename(folder + file, folder + file.replace(extendTemp, '.png'), function () { });
               }
            }
         } else {
            extend(folder + file + '/');
         }
      }
   })
}

var stream = require('stream');
function decodeFile(file) {
   let target = 'E:/Entertaiment/princess/main.121.com.soco.princess.obb/a0e1fdbf2b7b3e7236eb1e49f50924dc/7c4584366f93d629bec18b6627229840/test.png';
   let data = fs.readFileSync(file);
   const inputStream = fs.createReadStream(file);
   const outputStream = fs.createWriteStream(target);

   let text = '9e5dEKTQTuYkjrdAH';
   let total = 0;
   text.split('').map((c=>{
      total+= c.codePointAt(0);
   }));
   
}

decodeFile('E:/Entertaiment/princess/main.121.com.soco.princess.obb/a0e1fdbf2b7b3e7236eb1e49f50924dc/7c4584366f93d629bec18b6627229840/5a646ad8fb3e45dde26e8afb7d5ea7ff.png')

// extend('E:/Entertaiment/princess/main.121.com.soco.princess.obb/a0e1fdbf2b7b3e7236eb1e49f50924dc/')