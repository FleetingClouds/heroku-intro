var router = express.Router();
var oauth = require('./utils/GoogleOAuth.js');

function insert(id) {
  return "Hello World - " + id;
};

function processTask_(meth, url, consent) {
  return "processTask_ - " + url.url;
};


router.param('id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
    console.log("handling id + " + id);
    req.bottle = {location : "asdfsdf"};
  next();
});


//router.route('/iridblu/bottle/:id')
router.route('/:id')
  .get(function(req, res) {
    var result = 'IB Get!  '  +  insert(req.bottle.location);
    console.log("handling ins " + req.bottle.location);
    console.log(req.query);
    res.send(result);
  })
  .post(function(req, res) {
    var result = processTask_("POST", {url : "an url"}, "constructConsentScreen");
    console.log("handling post " + req.bottle.location);
    console.log(req);
    res.send(result);
  });


exports.routes = router;
exports.insert = insert;



/// Google OAuth stuff

/*
function processTask_(apiTask, kwargs, consentScreen, optPackageName) {
  logToSheet("processTask_(apiTask, kwargs, urlParameters)", "kwargs :: " + JSON.stringify(kwargs));

  var pkg = kwargs.url.parameter.k;
  // set up authentication
  var authenticationPackage = getAuthenticationPackage_ (pkg);
  logToSheet("processTask_(apiTask, kwargs, urlParameters)", "pkg :: " + JSON.stringify(authenticationPackage));
 
  if (   !   authenticationPackage  ) {
    throw "You need to set up your credentials one time.  ";
  }

  var authStatus = new cEzyOauth2.EzyOauth2 ( 
      authenticationPackage
    , "getAccessTokenCallback"
    , undefined
    , {
          work         : apiTask.name
        , package_name : pkg
      }
    );

  // authStatus will have checked for an unexpired access code, 
  // or got a new one with a refresh code if it was possible, 
  // and we'll already have it
  if (  authStatus.isOk()  ) {
    
    // should save the updated properties for next time
    setAuthenticationPackage_ (authenticationPackage);
    // good to do whatever we're here to do
//    logToSheet("processTask_(apiTask, kwargs, urlParameters)", "Task :: " + apiTask);

    return apiTask (authStatus.getAccessToken(), kwargs);
    
  }  else {

    logToSheet("processTask_(apiTask, kwargs)", " Authentication failed. ");
    if (kwargs.url) {
      // start off the oauth2 dance
      //  - you'll want to pretty this up probably
      return HtmlService.createHtmlOutput (
        consentScreen(authStatus.getUserConsentUrl())
      );
    } else {
      //  - you'll want to pretty this up probably
      return "You need to run the initial consent sequence.";
    }
  }
}
*/



