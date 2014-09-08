var test = require('tape');
var ResilientMailer = require('../lib/resilient-mailer');

test('correct types exported', function (t) {
	t.equal(typeof ResilientMailer, 'function');
	t.equal(typeof ResilientMailer.prototype.registerProvider, 'function');
	t.equal(typeof ResilientMailer.prototype.mail, 'function');

	t.end();
});

test('correct types after initialization', function (t) {
	var mailer = new ResilientMailer();

	t.assert(mailer instanceof ResilientMailer);
	t.equal(typeof mailer.registerProvider, 'function');
	t.equal(typeof mailer.mail, 'function');

	t.end();
});

test('uses providers in correct order', function (t) {
	t.plan(3);

	var mailer = new ResilientMailer();
	mailer.registerProvider(successProvider);
	mailer.registerProvider(failureProvider);

	mailer.mail({}, function (error) {
		t.equal(typeof error, 'undefined');
	});

	var mailer2 = new ResilientMailer();
	mailer2.registerProvider(failureProvider);
	mailer2.registerProvider(failureProvider2);

	mailer2.mail({}, function (error) {
		t.notEqual(typeof error, 'undefined');
		t.equal(error.message, 'different generic failure');
	});
});

test('uses secondary as backup', function (t) {
	t.plan(1);

	var mailer = new ResilientMailer();
	mailer.registerProvider(failureProvider);
	mailer.registerProvider(successProvider);

	mailer.mail({}, function (error) {
		t.equal(typeof error, 'undefined');
	});
});

var successProvider = {
	mail: function (message, callback) {
		callback();
	}
};

var failureProvider = {
	mail: function (message, callback) {
		callback(new Error('generic failure'));
	}
};

var failureProvider2 = {
	mail: function (message, callback) {
		callback(new Error('different generic failure'));
	}
};
