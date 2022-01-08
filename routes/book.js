var express = require('express');
let  GetBookResponse  = require('../responses/GetBookResponse');
let  GetBooksResponse  = require('../responses/GetBooksResponse');


var router = express.Router();

router.get('/:id', function(req, res, next) {

	let response = new GetBookResponse()
	response.mock()
	response.book.id = req.params.id
	res.send(response);
});


router.get('/', function(req, res, next) {

	let response = new GetBooksResponse()
	response.mock()
	res.send(response);
});

module.exports = router;
