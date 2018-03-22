var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));

var NewsAPI = require('newsapi');
var newsapi = new NewsAPI('6f5a2f938dbf4e4a989f610f2807d69f');

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.everything({
    from:2017-03-01,
    to:2018-03-01,
    q:'singapore'
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });

module.exports = router;