//Import JS Client
module.exports = require('../node_modules/twitter-node-client/lib/Twitter');


// Variables declaration
var express = require('express');
var OAuth2 = require('oauth').OAuth2; 
var https = require('https');
var app = express();
var bodyParser = require('body-parser');
var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

// Consumer Keys & Tokens
var config = {
    "consumerKey": "gtMH8M9GQj5Fa6aJDeDNNhkEu",
    "consumerSecret": "Qjgfl8wgtViKKvLcJa3yBuBRUiB9LK9HUADUApxJJZwo6XAIcM",
    "accessToken": "302658613-j4PbW6zEPKHn1PYFHPdp8ufbJzhFbSE6oArvXEv0",
    "accessTokenSecret": "Tr3MgYPM60lQu5cJ2qe21fDoyHNPqkOhC6TxnFuwS3Cqt"
};
var twitter = new module.exports.Twitter(config);
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Server running on port ' + port);
});

//TWITTER AUTHENICATION
var token = null;
var oauth2 = new OAuth2(config.consumerKey, config.consumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);
oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
  }, function (e, access_token) {
        token = access_token;
});


//APP CONFIG
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//public is the folder application is in. - Handles routing
app.use(express.static('public'));


//ENDPOINTS
//authenticated request using my account 
//posts that I can see are posts that this app can see as well
app.post('/twitter/user/somebearcub', function (req, res) {
    var username = req.body.username;
    var options = {
        hostname: 'api.twitter.com',
        path: '/1.1/search/tweets.json?q=somebearcub%3A' + username,
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
        https.get(options, function(result){
          var buffer = '';
          result.setEncoding('utf8');
          result.on('data', function(data){
            buffer += data;
          });
          result.on('end', function(){
            var tweets = JSON.parse(buffer);
            res.send(tweets);
          });
        });

});

twitter.getCustomApiCall('/trends/place.json',{ id: '23424948'}, error, success);