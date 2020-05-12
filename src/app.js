let url = 'E:/Entertaiment/princess/a0e1fdbf2b7b3e7236eb1e49f50924dc/e5576dca73e73fa7d20d617d7d7fcfaf/';

var fs = require('fs');

var extractFile = (link) => {
   fs.readdir(link, function (e, filenames) {
      if (!e) {
         console.log(filenames);
         filenames.forEach((filename) => {
            fs.readFile(link + filename, function (e, data) {
               if (e) {
                  extractFile(link + filename + '/');
               } else if (!filename.endsWith('.png')) {
                  fs.rename(link + filename, link + filename + '.png', function () { });

               }
            })
            // var stat = fs.lstatSync(link + filename);
            // if (!stat.isDirectory()) {
            // } else {
            //    extractFile(link + filename + '//')
            // }

         })
      }
   });
}

var rename = (link) => {
   fs.readdir(link, function (e, filenames) {
      if (!e) {
         filenames.forEach((filename) => {
            if (filename.length > 10) {
               fs.rename(link + filename, link + filename.split('.').shift() + '.h', function () { });
            }
         })
      }
   });
}

// rename(url);
// fs.readdir(url, function (e, filenames) {
//    if (!e) {
//       filenames.forEach((filename) => {
//          // if (filename.endsWith('.png') && filename.length>10) {
//             console.log(parseInt(filename, 2) + '   '+filename);
//             // fs.rename(url + filename, url + parseInt(filename, 10) + '.png', function () {
//             // });
//          // }
//       })
//    }
// });


//sy_cue_icon_1 
// console.log(parseInt('sy_cue_icon_1.png', 8));

// var md5 = require('md5');

// // console.log(md5('sy_cue_icon_1'));

// var text = 'c3lfY3VlX2ljb25fMQ==';
// var arr = text.split('');
// var rrr = '';
// for (var i = arr.length - 1; i >= 0; i--) {
//    rrr = rrr + '' + arr[i];
// }
// console.log(md5(rrr));
