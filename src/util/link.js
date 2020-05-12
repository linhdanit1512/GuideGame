
let { encode } = require('./encript');

module.exports = {
   add_princess: '/' + encode('add-princess'),
   get_princess: '/' + encode('get-princess'),
   list_princess: '/' + encode('list-princess'),
   check_princess_exist_image: '/' + encode('check-princess-img'),
   update_princess: '/' + encode('update-princess'),
   add_skill: '/' + encode('add-skill'),
   update_skill: '/' + encode('update-skill'),
   get_skill: '/' + encode('get-skill')
}