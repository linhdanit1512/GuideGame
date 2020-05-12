var princess = require('../static-data/princesses');
const path = require('path');
var fs = require('fs');
const manifest = require('../../manifest');
let heroImageLink = {
   1: '/images/princess/full/cooler/',
   2: '/images/princess/full/efreet/',
   3: '/images/princess/full/laiquendi/',
   4: '/images/princess/full/censu/',
   5: '/images/princess/full/soma/',
   6: '/images/princess/full/spirit/',
}
var result = `
.princess-card {
   width: 150px;
   height: 233px;
   margin-top: 0px;
   transform: scale(0.13);
   transform-origin: top left;
   cursor: pointer;
   display: inline-block;
}

.hero-card-gallery .princess-card:hover, .hero-card-gallery princess-card.active{
   animation: blink_select_hero 1.5s infinite;
}

.princess-card .princess-image{
   width: 970px;
   height: 1450px;
   background-position: top left;
}
`;
princess.forEach(item => {
   result += `
   .princess-${item.img}{
      background-image: url(${heroImageLink[item.elemental]}${item.figure});
   }
   `
});

fs.open(path.resolve(manifest.root_dir, 'src/css/princess-card.css'), 'w', function (err, fd) {
   fs.writeFile(path.resolve(manifest.root_dir, 'src/css/princess-card.css'), result, function (e) { if (e) throw e; });
});

module.exports = result;