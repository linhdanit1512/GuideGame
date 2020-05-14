'use strict'
require('dotenv').config();
var express = require('express'),
   session = require('express-session'),
   bodyParser = require('body-parser'),
   path = require('path'),
   app = express(),
   http = require('http'),
   server = http.createServer(app),
   io = require('socket.io')(server),
   fs = require('fs'),
   manifest = require('./manifest'),
   port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/dist')));
app.use(session({ secret: 'ld_1512', resave: true, saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 300 } }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)
app.set('views', [path.join(__dirname + '/views')]);

// var userRouter = require('./app/routes');

// app.use('/', userRouter);

// require('./app/sockets')(io);

server.listen(port, function () {
   console.log('Waiting statement at port '+ port);
});

app.get('/', (req, res) => {
   res.render('index', { req: req, res: res });
});

app.get('/util', (req, res) => {
   res.render('util', { req: req, res: res });
});

app.get('/:file', (req, res) => {
   res.render('general/' +req.params.file, { req: req, res: res });
})

app.get('/general/:folder/:file', (req, res) => {
   let folder = req.params.folder;
   let file = req.params.file;
   let files = fs.readdirSync(path.resolve(manifest.root_dir, 'views/general'));
   if (files.includes(folder) || files.includes(folder + '.html')) {
      if (!file || file == '') {
         res.render('general/' + folder + (folder.endsWith('.html') ? '' : '.html'), { req: req, res: res });
      } else {
         let files2 = fs.readdirSync(path.resolve(manifest.root_dir, 'views/general/' + folder));
         if (files2.includes(file) || files2.includes(file + '.html')) {
            res.render('general/' + folder + '/' + (file.endsWith('.html') ? file : file + '.html'), { req: req, res: res });
         } else {
            res.send('The file is not exists');
         }
      }
   } else {
      res.send('The file is not exists');
   }
});

app.use('/admin', require('./src/routes/admin'));