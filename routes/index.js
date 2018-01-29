const express = require('express');
const router = express.Router();
const Request = require("request");



router.get('/', (req, res) => {
	res.render('home');
})

router.get('/items', (req, res) => {

	Request.get(`https://api.mercadolibre.com/sites/MLA/search?q=:query`, (error, response, body) => {
	    if(error) {
	        return console.dir(error);
	        res.send({ message: error});
	    }
	    res.send(JSON.parse(body));
	});
})


router.get('/items/:id', (req, res) => {
	let id = req.params.id;
	
	Request.get(`https://api.mercadolibre.com/items/${id}`, (error, response, body) => {
	    if(error) {
	        res.send({ message: error});
	    }
	    res.send(JSON.parse(body));
	});
})

router.get('/items/:id/description', (req, res) => {
	let id = req.params.id;
	
	Request.get(`https://api.mercadolibre.com/items/${id}/description`, (error, response, body) => {
	    if(error) {
	        res.send({ message: error});
	    }
	    res.send(JSON.parse(body));
	});
})


module.exports = router