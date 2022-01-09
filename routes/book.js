var express = require('express');
let  GetBookResponse  = require('../responses/GetBookResponse');
let  GetBooksResponse  = require('../responses/GetBooksResponse');


var router = express.Router();

router.get('/:id', function(req, res) {

	let response = new GetBookResponse()
	response.mock()
	response.book.id = Number(req.params.id)
	res.send(response);
});


router.get('/', function(req, res) {

	let response = new GetBooksResponse()
	response.mock()
	res.send(response);
});

module.exports = router;
