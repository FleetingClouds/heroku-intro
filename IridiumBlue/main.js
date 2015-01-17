var router = express.Router();
var oauth = require('../utils/GoogleOAuth.js');

function insert(id) {
  return "Hello World - " + id;
};


router.param('id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
    console.log("handling id + " + id);
    req.bottle = {location : "asdfsdf"};
  next();
});


router.route('/:id')
  .get(function(req, res) {
    var result = 'IB Get!  '  +  insert(req.bottle.location);
    console.log("handling ins " + req.bottle.location);
    console.log(req.query);
    res.send(result);
  })
  .post(function(req, res) {
    var result = oauth.processTask("POST", {url : "an url"}, "constructConsentScreen");
    console.log("handling post " + req.bottle.location);
//    console.log(req);
    res.send(result);
  });


exports.routes = router;
exports.insert = insert;


