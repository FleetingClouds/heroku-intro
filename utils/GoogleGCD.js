/**
* build URL Fetch options
*
* @param {string} consentUrl the url to click to provide user consent
* @return {string} the html for the consent screen
*/
function buildURLFetchOptions (accessToken, payload) {
  console.log("buildURLFetchOptions (accessToken, payload)", "Token : " + accessToken + "\nPayload : " + payload);
  return {
      method: "POST"
    , headers: {
        authorization: "Bearer " + accessToken
      }
    , muteHttpExceptions : true
    , contentType: 'application/json'
    , payload: payload
  };
}


/**
* A utility for centralize the task of defining new 
*   Cloud Datastore query criteria
*
* @param {big integer} id_ the G.C.D. defined id number
*
* @return {object} a query key object
*/
function newKeys(namespace_, kind_, aryIds_) {
  var queryKeys = [];
  for (ent in aryIds_) {
    console.log("newKeys(namespace_, kind_, aryIds_)", "URL entity id " + aryIds_[ent]);
    queryKeys[ent] = newKey(namespace_, kind_, aryIds_[ent]);
    console.log("newKeys(namespace_, kind_, aryIds_)", "New entity key id " + queryKeys[ent].path[0].id);
  }
  
  return JSON.stringify(queryKeys);
};

function newKey(namespace_, kind_, id_) {
  
  var key = {};
  key['partitionId'] = { namespace: namespace_};
  key['path'] = [{'kind': kind_}];
  if (id_) key['path'][0]['id'] = id_;
  
  return key;
}
function testNewKeys() {
  console.log("testNewKeys()", "New keys " + newKeys("aNamespace", "aKind", [444, 555]));
}

exports.newKeys = newKeys;
exports.newKey = newKey;
exports.buildURLFetchOptions = buildURLFetchOptions;

