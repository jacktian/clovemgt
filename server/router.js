'use strict';

var express = require('express'),
	request = require('request'),
    router = express.Router();


 router.get('/', function (req, res, next) {
     req.url = router.options.index || '/';
     next();
 });

/*
 router.get('/api/xxx', function (req, res, next) {
     request('http://localhost:8081/app/api/testserver.php?type=select&project_id=3',function(error, response, body){
     		res.send(body)
     })
 });
*/

module.exports = function (options) {
    router.options = options || {};
    return router;
};
