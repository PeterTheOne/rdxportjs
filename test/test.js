// see: http://stackoverflow.com/a/26849194/782920
function parseParams(str) {
    return str.split('&').reduce(function (params, param) {
        var paramSplit = param.split('=').map(function (value) {
            return decodeURIComponent(value.replace('+', ' '));
        });
        params[paramSplit[0]] = paramSplit[1];
        return params;
    }, {});
};

QUnit.test('contruct', function(assert) {
    var username = 'hans';
    var token = 'tokener123';
    var endpoint = 'http://example/rd-bin/rdxport.cgi';
    var rdxport = new Rdxport.Rdxport(username, token, endpoint);

    assert.strictEqual(rdxport.username, username);
    assert.strictEqual(rdxport.token, token);
    assert.strictEqual(rdxport.endpoint, endpoint);
});

QUnit.module('Rdxport', {
    setup: function() {
        this.username = 'a';
        this.token = 'b';
        this.endpoint = 'b';
        this.rdxport = new Rdxport.Rdxport(this.username, this.token, this.endpoint);
        this.requests = [];
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = $.proxy(function(xhr) {
            this.requests.push(xhr);
        }, this);
    },
    teardown: function() {
        this.xhr.restore();
    }
});

QUnit.test('listLog', function(assert) {
    var name = 'log231';
    this.rdxport.listLog(name, function() {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 22, 'with valid command');
    assert.strictEqual(parseParams(request.requestBody).NAME, name);
});

QUnit.test('listLogs', function(assert) {
    var serviceName = 'service3245';
    var trackable = 1;
    this.rdxport.listLogs({
        SERVICE_NAME: serviceName,
        TRACKABLE: trackable
    }, function() {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 20, 'with valid command');
    assert.strictEqual(parseParams(request.requestBody).SERVICE_NAME, serviceName);
    assert.equal(parseParams(request.requestBody).TRACKABLE, trackable);
});

QUnit.test('listServices', function(assert) {
    var trackable = 1;
    this.rdxport.listServices({TRACKABLE: trackable}, function() {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 21, 'with valid command');
    assert.equal(parseParams(request.requestBody).TRACKABLE, trackable);
});

QUnit.test('listGroups', function(assert) {
    this.rdxport.listGroups(function() {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 4, 'with valid command');
});

QUnit.test('listGroup', function(assert) {
    var groupName = 'groupname1253';
    this.rdxport.listGroup(groupName, function() {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 5, 'with valid command');
    assert.strictEqual(parseParams(request.requestBody).GROUP_NAME, groupName);
});

QUnit.test('listCarts', function(assert) {
    var groupName = 'groupname320984';
    var filter = 'filter1234';
    var type = 'audio';
    var includeCuts = 1;
    this.rdxport.listCarts({
        GROUP_NAME: groupName,
        FILTER: filter,
        TYPE: type,
        INCLUDE_CUTS: includeCuts
    }, function() {});

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

QUnit.test('listCart', function(assert) {
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

QUnit.test('addCart', function(assert) {
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

/*
todo
 */

/*QUnit.test('editCart', function(assert) {
    this.rdxport.editCart(cartNumber, options, function () {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 14, 'with valid command');
});

QUnit.test('removeCart', function(assert) {
    this.rdxport.removeCart(cartNumber, function () {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 13, 'with valid command');
});

QUnit.test('listCuts', function(assert) {
    this.rdxport.listCuts(cartNumber, function () {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 9, 'with valid command');
});

QUnit.test('listCut', function(assert) {
    this.rdxport.listCut(cartNumber, cutNumber, function () {});

    var request = this.requests[0];
    assert.strictEqual(request.method, 'POST', 'Should send a POST');
    assert.strictEqual(parseParams(request.requestBody).LOGIN_NAME, this.username);
    assert.strictEqual(parseParams(request.requestBody).PASSWORD, this.token);
    assert.strictEqual(request.url, this.endpoint, 'to \'c\' endpoint');

    assert.equal(parseParams(request.requestBody).COMMAND, 8, 'with valid command');
});*/
