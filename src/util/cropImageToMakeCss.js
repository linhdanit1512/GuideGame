const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const manifest = require('../../manifest');
var parser = new xml2js.Parser();

function makeCss(link, callback) {
   let fileCrop = fs.readFileSync(link, { encoding: 'UTF-8' });
   parser.parseString(fileCrop, function (err, result) {
      if (err) {
         console.error(err);
         return;
      }

      if (result && result.plist && result.plist.dict && result.plist.dict[0] && result.plist.dict[0].dict && result.plist.dict[0].dict[0]) {
         var item = result.plist.dict[0].dict[0].key;
         var value = result.plist.dict[0].dict[0].dict;
         var imageSize = result.plist.dict[0].dict[1].string[2].replace(/{|}/g, '').split(',');

         let folder = path.dirname(link);
         let filename = path.basename(link);
         let imgSource = manifest.host + folder.substring(folder.indexOf('dist') + 5) + '/' + filename.replace(/.txt|.xml/g, '.png');
         let fileNameNoExtend = filename.replace(/.txt|.xml/g, '');

         let cssText = '';
         let htmlText = `
         <h2>${link} - ${imgSource}</h2>`;

         for (var i = 0; i < item.length; i++) {
            let className = item[i].replace(/\/|\\| |,|.png/g, '');
            if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(className.split('').shift())) {
               className = '_' + className;
            }
            let offset = (value[i].string[1].replace(/{|}/g, '')).split(',');
            let frame = (value[i].string[0].replace(/{|}/g, '')).split(',');
            let rotated = value[i].true !== undefined;
            let sourceColorRect = (value[i].string[2].replace(/{|}/g, '')).split(',');
            let sourceSize = (value[i].string[3].replace(/{|}/g, '')).split(',');

            let x = imageSize[0] - frame[0];
            let y = imageSize[1] - frame[1];

            if (rotated === true) {
               cssText += `
.${className} {
   width: ${frame[3]}px;
   height: ${frame[2]}px;
   background-color: transparent;
   background: url('${imgSource}') ${x}px ${y}px;
   transform: rotate(-90deg);
}
.${className}.left {
   padding-left: ${frame[3]}px;
   padding-bottom: ${frame[2]}px;
}
`;
            } else {
               cssText += `
.${className} {
   width: ${frame[2]}px;
   height: ${frame[3]}px;
   background-color: transparent;
   background: url('${imgSource}') ${x}px ${y}px;
}
.${className}.left {
   padding-left: ${frame[2]}px;
   padding-bottom: ${frame[3]}px;
}\n`;
            }

            /**
             write guild file
             */
            htmlText += `<div class="${className}"></div> .${className}\n`;
         }


         // console.log(htmlText);

         console.log(cssText);
         let returnData = { css: cssText, filename: fileNameNoExtend, htmlText: htmlText };

         console.log(htmlText);
         if (callback) {
            callback(returnData)
         }

         return returnData;

      }
   });
}

function makeCssByFolder(folderSource) {
   fs.readdir(folderSource, { encoding: 'utf-8' }, function (e, files) {
      let cssText = '';
      let htmlText = '';
      if (e) {
         console.error(e);
      } else {
         let folder_name = folderSource.split('/').pop();
         for (let file of files) {
            if (file.endsWith('.txt')) {
               makeCss(folderSource + '/' + file, function (data) {


                  // let saveCssPath = path.resolve(manifest.root_dir, 'dist/css/' + folder_name);
                  // let saveHtmlPath = path.resolve(manifest.root_dir, 'views/general/' + folder_name)

                  // let cssFile = path.resolve(saveCssPath, data.filename + '.css');
                  // let htmlFile = path.resolve(saveHtmlPath, data.filename + '.html');

                  // fs.open(cssFile, 'w', function (err, fd) {
                  //    fs.writeFile(cssFile, data.css, function (e) { if (e) throw e; });
                  // });
                  // fs.open(htmlFile, 'w', function (err, fd) {
                  //    fs.writeFile(htmlFile, data.htmlText, function (e) { if (e) throw e; });
                  // });

                  cssText += data.css;
                  htmlText += data.htmlText;
               });
            }
         }

         fs.open(path.resolve(manifest.root_dir, 'dist/css/' + folder_name + '.css'), 'w', function (err, fd) {
            fs.writeFile(path.resolve(manifest.root_dir, 'dist/css/' + folder_name + '.css'), cssText, function (e) { if (e) throw e; });
         });
         fs.open(path.resolve(manifest.root_dir, 'views/general/' + folder_name + '.html'), 'w', function (err, fd) {
            fs.writeFile(path.resolve(manifest.root_dir, 'views/general/' + folder_name + '.html'), htmlText, function (e) { if (e) throw e; });
         });

         try {
         } catch (e) {
            throw e
         }
      }
   });
}


// var folderSource = 'E:/Workspace/GuideGame/dist/images/feature';
// // var folderSource = 'E:/Workspace/GuideGame/dist/images/item';
// var folderSource='E:/Entertaiment/princess/a0e1fdbf2b7b3e7236eb1e49f50924dc/878d605dbb35c8cda7efcc09ea64c9b4/4d9ac71116ebe5cad26a64b0ed154c4b/086a6a1fa44fda6e6f9be42ec0727d93.txt'
// makeCssByFolder(folderSource);

// makeCss(folderSource);