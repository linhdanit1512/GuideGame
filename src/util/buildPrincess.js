const fs = require('fs');
const path = require('path');

function princess(cropLink) {
   let fileCrop = fs.readFileSync(cropLink, { encoding: 'UTF-8' });
   let folder = path.dirname(cropLink);
   let filename = path.basename(cropLink);
   // let fileslug = filename.split('.').shift().replace(' ', '-');
   // let images = [];
   // fs.readdir(folder, function (e, filenames) {
   // images = filenames.filter(img => img.endsWith('.png'));
   // })
   let data = fileCrop.split('\n');
   let object = {
      imgLink: data[1],
      size: data[2].split(': ').pop().split(','),
      colorFormat: data[3].split(': ').pop(),
      element: {}
   };

   // var svg = `<svg width="${object.size[1]}" height="${object.size[0]}" style="position:absolute; overflow:hidden; display:block">`;
   var svg = '<div class="princess" style="margin-left:400px">';
   for (let i = 6; i < data.length; i++) {
      if (data[i] && data[i] != '') {
         object.element[data[i]] = {};
         for (let j = 1; j < 6; j++) {
            if (data[i + j]) {
               let tmp = data[i + j].split(': ');
               if (tmp[1].includes(',')) {
                  object.element[data[i]][tmp[0].trim()] = tmp[1].split(', ');
               } else {
                  object.element[data[i]][tmp[0].trim()] = tmp[1];
               }
            }
         }


         let x = object.size[0] - object.element[data[i]].xy[0];
         let y = object.size[1] - object.element[data[i]].xy[1];
         if (object.element[data[i]].rotate == 'true') {
            svg += `<div class="${data[i]}" style="transform: rotate(90deg); position: absolute; width: ${object.element[data[i]].size[1]}px; height: ${object.element[data[i]].size[0]}px; display:block; background: url('./${folder.substring(folder.indexOf('images')).replace(/\\/g, '/')}/${object.imgLink}') ${x}px ${y}px;"></div>\n`;
         } else {
            svg += `<div class="${data[i]}" style="position: absolute; width: ${object.element[data[i]].size[0]}px; height: ${object.element[data[i]].size[1]}px; display:block; background: url('./${folder.substring(folder.indexOf('images')).replace(/\\/g, '/')}/${object.imgLink}') ${x}px ${y}px;"></div>\n`;
         }
         //${object.element[data[i]].rotate == 'true' ? 'transform: rotate(90deg); ' : ''}
         // svg += `<figure style="overflow:hidden; width:${object.element[data[i]].size[1]}px; height: ${object.element[data[i]].size[0]}px; margin-top: ${object.element[data[i]].xy[1]}px; margin-left: ${object.element[data[i]].xy[0]}px;"><img src="${folder}/${object.imgLink}" class="${data[i].toLowerCase()}" /></figure>\n`
      }




      i += 6;
   }

   svg += '</div>'

   // svg += '</svg>';
   console.log(JSON.stringify(object));

   console.log(svg);

   fs.writeFile('./views/logo.html', svg, function(e){
      console.log(e);
   });

}

// princess('E:\\Workspace\\GuideGame\\dist\\images\\favicon\\logo\\text.txt');

module.exports = princess;