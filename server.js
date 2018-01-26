const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const rutas = require('./routes');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', rutas)

app.listen(port, () =>{
	console.log(`server ${port}`);
})