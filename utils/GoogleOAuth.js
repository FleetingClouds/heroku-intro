var gcd = require('./GoogleGCD.js');
var request = require("request");

function processTask(apiTask, kwargs, consentScreen, optPackageName) {
  console.log("processTask_(apiTask, kwargs, consentScreen, optPackageName)", "kwargs :: " + JSON.stringify(kwargs));
  
  // set up authentication
  var authenticationPackage = getAuthenticationPackage_ (optPackageName);
  console.log("processTask_(apiTask, kwargs, consentScreen, optPackageName)", "clid :: " + JSON.stringify(authenticationPackage.clientId));
 
  if (   !   authenticationPackage  ) {
    throw "You need to set up your credentials one time.  ";
  }

  var fetchURL = "https://www.googleapis.com/datastore/v1beta2/datasets/iridblu/lookup";
  var token = "ya29._gBbc5Q7V3AxqIAhQv0Dz9gV1e1KMe1tn2Bqo0FkTdhGia4NMTHXuJFUCECQF17qq9J3RohIFRQciw";
  var fetchOpts = gcd.buildURLFetchOptions(
      token
    , '{"keys":' + gcd.newKeys("asset", "bottle", ["5629499534213120"]) + '}'
//    , '{"keys":' + gcd.newKeys(prms.ns, prms.kd, aPrms.i) + '}'
  );
  
  console.log("processTask_(apiTask, kwargs, consentScreen, optPackageName)", "fetchURL :: " + fetchURL);
  console.log("processTask_(apiTask, kwargs, consentScreen, optPackageName)\n === ", fetchOpts);
  var payload = {};
  var path = [{kind:"bottle",id:"5629499534213120"}]
  payload.keys = [{partitionId:{namespace:"asset"},path: path}]
  console.log("processTask_(apiTask, kwargs, consentScreen, optPackageName)\n === ", JSON.stringify(payload));
  
  var options = {
      method: "POST"
    , headers: { authorization: 'Bearer ya29._gC9zDpVtBlqzqfaQAJrTXO6vU_YJReJ5xGYqiDkNqWK4kIVXyzCksd6XKvMWGhulMiY0bDpxlay9Q'}
    , uri: fetchURL
    , body: payload
    , json: true
  };
  
  function callback(error, response, body) {
    if ( ! error && response.statusCode == 200) {
//      var info = JSON.parse(body);
      console.log(" Good " + response.statusCode);
      var rslt = body.found[0].entity.properties;
      console.log("Location : " + rslt.location.stringValue + ". S/N : " + rslt.serialNumber.stringValue);
    } else {
      console.log("  Bad.  Status : " + response.statusCode + "  Error : " + error);
      console.log(body);
    }
  }
  
  request.post (options, callback);

/*

fetchURL :: https://www.googleapis.com/datastore/v1beta2/datasets/iridblu/lookup
{
  method: 'POST',
  headers: { authorization: 'Bearer ya29._gBbc5Q7V3AxqIAhQv0Dz9gV1e1KMe1tn2Bqo0FkTdhGia4NMTHXuJFUCECQF17qq9J3RohIFRQciw' },
  muteHttpExceptions: true,
  contentType: 'application/json',
  payload: '{"keys":[{"partitionId":{"namespace":"asset"},"path":[{"kind":"bottle","id":"5629499534213120"}]}]}' 
}

*/
/*
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
//    console.log("processTask_(apiTask, kwargs, urlParameters)", "Task :: " + apiTask);

    return apiTask (authStatus.getAccessToken(), kwargs);
    
  }  else {

    console.log("processTask_(apiTask, kwargs)", " Authentication failed. ");
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
*/

	return "You need to run the initial consent sequence. " + process.env.TIMES;
}

/**
 * Gets the property key against which the authentication 
 * package will be stored
 *
 * @param {string} optPackageName - an optional package name suffix
 *
 * @return {object} authentication package
 */
function getAuthenticationPackage_ (optPackageName) {
  
  console.log("getAuthenticationPackage_(optPackageName)", optPackageName);
  var p = process.env.CREDS;
  p = p ? JSON.parse(p) : null;
//  console.log("getAuthenticationPackage_(optPackageName)", p[optPackageName]);
  return p[optPackageName] ? p[optPackageName] : p;
  
}



exports.processTask = processTask;


