'use strict'

const app = require('./app');
const port = process.env.PORT || 3000;
const config = require('./config');

app.listen(config.port, () =>{
	console.log(`server ${config.port}`);
})