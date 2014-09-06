var test = require('tape');
var ResilientMailer = require('../lib/mailgun-provider');

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
