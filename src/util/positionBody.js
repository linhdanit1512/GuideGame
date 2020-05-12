
const fs = require('fs');
const path = require('path');

var getIndex = function(link){
   let fileCrop = fs.readFileSync(link, { encoding: 'binary' });
   let folder = path.dirname(link);
   let filename = path.basename(link);
   
   let data = fileCrop.split('║');
   console.log(data)
}

// let url = 'E:/Workspace/GuideGame/dist/images/princess/censu/untext/0f6737223617cf4845a78e88a4c68daa.txt';
// getIndex(url);