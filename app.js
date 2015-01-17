express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

var router = express.Router();
var iridium_blue = require('./IridiumBlue/main.js');


router.get('/about', function(req, res) {
    res.send('im the about page!'); 
});

router.route('/smudge/ins/:id')
  .get(function(req, res) {
    var result = 'Get!  '  +  iridium_blue.insert(id);
    console.log(req.query);
    res.send(result);
});

app.use('/', router);
app.use('/bottle', iridium_blue.routes);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

