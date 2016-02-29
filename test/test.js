// see: http://stackoverflow.com/a/26849194/782920
function parseParams(str) {
  return str.split('&').reduce(function (params, param) {
    var paramSplit = param.split('=').map(function (value) {
      return decodeURIComponent(value.replace(/\+/g, ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}

QUnit.test('contruct', function (assert) {
  var username = 'hans';
  var token = 'tokener123';
  var endpoint = 'http://example/rd-bin/rdxport.cgi';
  var rdxport = new Rdxport.Rdxport(username, token, endpoint);

  assert.strictEqual(rdxport.username, username);
  assert.strictEqual(rdxport.token, token);
  assert.strictEqual(rdxport.endpoint, endpoint);
});

QUnit.module('Rdxport', {
  setup: function () {
    this.username = 'a';
    this.token = 'b';
    this.endpoint = 'b';
    this.rdxport = new Rdxport.Rdxport(this.username, this.token, this.endpoint);
    this.requests = [];
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = $.proxy(function (xhr) {
      this.requests.push(xhr);
    }, this);
  },
  teardown: function () {
    this.xhr.restore();
  }
});

QUnit.test('listLog', function (assert) {
  var name = 'log231';
  this.rdxport.listLog(name, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 22, 'with valid command');
  assert.strictEqual(parseParams(request.requestBody).NAME, name);
});

QUnit.test('listLogs', function (assert) {
  var serviceName = 'service3245';
  var trackable = 1;
  this.rdxport.listLogs({
    SERVICE_NAME: serviceName,
    TRACKABLE: trackable
  }, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 20, 'with valid command');
  assert.strictEqual(parseParams(request.requestBody).SERVICE_NAME, serviceName);
  assert.equal(parseParams(request.requestBody).TRACKABLE, trackable);
});

QUnit.test('listServices', function (assert) {
  var trackable = 1;
  this.rdxport.listServices({TRACKABLE: trackable}, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 21, 'with valid command');
  assert.equal(parseParams(request.requestBody).TRACKABLE, trackable);
});

QUnit.test('listGroups', function (assert) {
  this.rdxport.listGroups(function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 4, 'with valid command');
});

QUnit.test('listGroup', function (assert) {
  var groupName = 'groupname1253';
  this.rdxport.listGroup(groupName, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 5, 'with valid command');
  assert.strictEqual(parseParams(request.requestBody).GROUP_NAME, groupName);
});

QUnit.test('listCarts', function (assert) {
  var groupName = 'groupname320984';
  var filter = 'filter1234';
  var type = 'audio';
  var includeCuts = 1;
  this.rdxport.listCarts({
    GROUP_NAME: groupName,
    FILTER: filter,
    TYPE: type,
    INCLUDE_CUTS: includeCuts
  }, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 6, 'with valid command');
  assert.strictEqual(parseParams(request.requestBody).GROUP_NAME, groupName);
  assert.strictEqual(parseParams(request.requestBody).FILTER, filter);
  assert.strictEqual(parseParams(request.requestBody).TYPE, type);
  assert.equal(parseParams(request.requestBody).INCLUDE_CUTS, includeCuts);
});

QUnit.test('listCart', function (assert) {
  var cartNumber = '1923456';
  var includeCuts = 1;
  this.rdxport.listCart(cartNumber, {INCLUDE_CUTS: includeCuts}, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 7, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).INCLUDE_CUTS, includeCuts);
});

QUnit.test('addCart', function (assert) {
  var groupName = 'groupname324234';
  var type = 'audio';
  var cartNumber = '98243';
  this.rdxport.addCart(groupName, type, {CART_NUMBER: cartNumber}, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 12, 'with valid command');
  assert.equal(parseParams(request.requestBody).GROUP_NAME, groupName);
  assert.strictEqual(parseParams(request.requestBody).TYPE, type);
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
});

QUnit.test('editCart', function (assert) {
  var cartNumber = '128734';
  var includeCuts = 1;
  var groupName = 'groupname123896';
  var forcedLength = '123';
  this.rdxport.editCart(cartNumber, {
    INCLUDE_CUTS: includeCuts,
    GROUP_NAME: groupName,
    FORCED_LENGTH: forcedLength
  }, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 14, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).GROUP_NAME, groupName);
  assert.equal(parseParams(request.requestBody).FORCED_LENGTH, forcedLength);
});

QUnit.test('removeCart', function(assert) {
  var cartNumber = '6812';
  this.rdxport.removeCart(cartNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 13, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
});

QUnit.test('listCuts', function(assert) {
  var cartNumber = '8912';
  this.rdxport.listCuts(cartNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 9, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
});

QUnit.test('listCut', function(assert) {
  var cartNumber = '9832';
  var cutNumber = '231';
  this.rdxport.listCut(cartNumber, cutNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 8, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
});

QUnit.test('addCut', function(assert) {
  var cartNumber = '98342';
  this.rdxport.addCut(cartNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 10, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
});

QUnit.test('editCut', function(assert) {
  var cartNumber = '3423';
  var cutNumber = '843';
  var description = 'description bla bla';
  this.rdxport.editCut(cartNumber, cutNumber, {DESCRIPTION: description}, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 15, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
  assert.equal(parseParams(request.requestBody).DESCRIPTION, description);
});

QUnit.test('addAndEditCut', function(assert) {
  var endpoint = 'addAndEditCutResponse.xml';
  var rdxport = new Rdxport.Rdxport(this.username, this.token, endpoint);

  var cartNumber = '29348';
  var description = 'description blub blub';
  rdxport.addAndEditCut(cartNumber, {DESCRIPTION: description}, function () {});

  // addCut
  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 10, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);

  // todo: editCut
  /*request = this.requests[1];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 15, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
  assert.equal(parseParams(request.requestBody).DESCRIPTION, description);*/
});

QUnit.test('removeCut', function(assert) {
  var cartNumber = '7834';
  var cutNumber = '93405';
  this.rdxport.removeCut(cartNumber, cutNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 11, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
});

/*
todo: copyCut, moveCut
 */

QUnit.test('copyAudio', function(assert) {
  var sourceCartNumber = '125';
  var sourceCutNumber = '1234';
  var destinationCartNumber = '453';
  var destinationCutNumber = '9745';
  this.rdxport.copyAudio(
    sourceCartNumber, sourceCutNumber,
    destinationCartNumber, destinationCutNumber,
    function () {}
  );

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 18, 'with valid command');
  assert.equal(parseParams(request.requestBody).SOURCE_CART_NUMBER, sourceCartNumber);
  assert.equal(parseParams(request.requestBody).SOURCE_CUT_NUMBER, sourceCutNumber);
  assert.equal(parseParams(request.requestBody).DESTINATION_CART_NUMBER, destinationCartNumber);
  assert.equal(parseParams(request.requestBody).DESTINATION_CUT_NUMBER, destinationCutNumber);
});

QUnit.test('audioInfo', function(assert) {
  var cartNumber = '34';
  var cutNumber = '4654';
  this.rdxport.audioInfo(cartNumber, cutNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 19, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
});

QUnit.test('audioStore', function(assert) {
  this.rdxport.audioStore(function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 23, 'with valid command');
});

QUnit.test('import', function(assert) {
  var cartNumber = '34';
  var cutNumber = '4654';
  var channels = 4;
  var normalizationLevel = 7;
  var autotrimLevel = 8;
  var useMetadata = 1;
  var filename = 'file213434.mp3';
  this.rdxport.import(cartNumber, cutNumber, channels, normalizationLevel, autotrimLevel,
    useMetadata, filename, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 2, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
  assert.equal(parseParams(request.requestBody).CHANNELS, channels);
  assert.equal(parseParams(request.requestBody).NORMALIZATION_LEVEL, normalizationLevel);
  assert.equal(parseParams(request.requestBody).AUTOTRIM_LEVEL, autotrimLevel);
  assert.equal(parseParams(request.requestBody).USE_METADATA, useMetadata);
  assert.equal(parseParams(request.requestBody).FILENAME, filename);
});

QUnit.test('export', function(assert) {
  var cartNumber = '78';
  var cutNumber = '68';
  var format = 'asdf';
  var channels = 4;
  var sampleRate = 34;
  var bitRate = 43;
  var quality = 3;
  var startPoint = 6;
  var endPoint = 8;
  var normalizationLevel = 7;
  var enableMetadata = 1;
  this.rdxport.export(cartNumber, cutNumber, format, channels, sampleRate, bitRate,
    quality, startPoint, endPoint, normalizationLevel, enableMetadata, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 1, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
  assert.equal(parseParams(request.requestBody).FORMAT, format);
  assert.equal(parseParams(request.requestBody).CHANNELS, channels);
  assert.equal(parseParams(request.requestBody).SAMPLE_RATE, sampleRate);
  assert.equal(parseParams(request.requestBody).CHANNELS, channels);
  assert.equal(parseParams(request.requestBody).BIT_RATE, bitRate);
  assert.equal(parseParams(request.requestBody).QUALITY, quality);
  assert.equal(parseParams(request.requestBody).START_POINT, startPoint);
  assert.equal(parseParams(request.requestBody).END_POINT, endPoint);
  assert.equal(parseParams(request.requestBody).NORMALIZATION_LEVEL, normalizationLevel);
  assert.equal(parseParams(request.requestBody).ENABLE_METADATA, enableMetadata);
});

QUnit.test('exportPeaks', function(assert) {
  var cartNumber = '234';
  var cutNumber = '2345';
  this.rdxport.exportPeaks(cartNumber, cutNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 16, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
});

QUnit.test('trimAudio', function(assert) {
  var cartNumber = '234';
  var cutNumber = '2345';
  var trimLevel = 45;
  this.rdxport.trimAudio(cartNumber, cutNumber, trimLevel, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 17, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
  assert.equal(parseParams(request.requestBody).TRIM_LEVEL, trimLevel);
});

QUnit.test('deleteAudio', function(assert) {
  var cartNumber = '234';
  var cutNumber = '2345';
  this.rdxport.deleteAudio(cartNumber, cutNumber, function () {});

  var request = this.requests[0];
  assert.strictEqual(request.method, 'POST', 'Should send a POST');
  assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
  assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
  assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

  assert.equal(parseParams(request.requestBody).COMMAND, 3, 'with valid command');
  assert.equal(parseParams(request.requestBody).CART_NUMBER, cartNumber);
  assert.equal(parseParams(request.requestBody).CUT_NUMBER, cutNumber);
});
