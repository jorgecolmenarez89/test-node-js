'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const rutas = require('./routes');
const Request = require("request");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/public', express.static(__dirname + '/public'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use('/api', rutas);

app.get('/', (req, res)=>{
	res.render('home')
});

app.get('/items', (req, res)=>{
	res.render('items');
});

app.get('/items/:id', (req, res) => {
	let id = req.params.id;

	var item;
	var description;
	
	Request.get(`https://api.mercadolibre.com/items/${id}`, (error, response, body) => {
	    if(error) {
	        res.send({ message: error});
	    }
	    item = JSON.parse(body);
	   
	    Request.get(`https://api.mercadolibre.com/items/${id}/description`, (error, response, body) => {
		    if(error) {
		        res.send({ message: error});
		    }
		    description = JSON.parse(body);
		    res.render('detalle', {item: item, description: description} );
		});	
	});	
})

module.exports = app
