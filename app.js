const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const http =require('http'),
busboy = require("then-busboy"),
fileUpload = require('express-fileupload'),
mysql      = require('mysql');

const errorController = require('./controllers/error');

const db = require('./util/database');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const profileRouter = require('./routes/profile');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '753951',
	database : 'reads4u'
});

connection.connect();

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(profileRouter);

app.use(errorController.get404);

app.listen(3000);
