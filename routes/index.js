const express = require('express');
const router = express.Router();
const Request = require("request");


router.get('/items', (req, res) => {

	let query = req.query;
	let params = '';

	for (var q in query){
    params += `${q}=${query[q]}&`;
	}

	Request.get(`https://api.mercadolibre.com/sites/MLA/search?${params}`, (error, response, body) => {
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