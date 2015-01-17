var express = require('express');
var app = express();
var router = express.Router();

var cool = require('cool-ascii-faces');
var iridium_blue = require('./iridiumBlue.js');



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var result = ''
  var times = process.env.TIMES || 5
  for (i=0; i < times; i++)
    result += cool();
  response.send(result);
});


//var modules = {};
//modules['iridblu']  = new iridblu();

router.route('/iridblu/ins/:id')
  .get(function(req, res) {
    var result = 'Hee hooo!  '  +  iridium_blue.funcname();
    console.log(req.query);
    res.send(result);
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
