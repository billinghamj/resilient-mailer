# resilient-mailer

`resilient-mailer` provides fault-tolerant email delivery, using failover email
providers.

[![NPM Version](https://img.shields.io/npm/v/resilient-mailer.svg?style=flat)](https://www.npmjs.org/package/resilient-mailer)
[![Build Status](https://img.shields.io/travis/billinghamj/resilient-mailer.svg?style=flat)](https://travis-ci.org/billinghamj/resilient-mailer)
[![Coverage Status](https://img.shields.io/coveralls/billinghamj/resilient-mailer.svg?style=flat)](https://coveralls.io/r/billinghamj/resilient-mailer)

```js
var ResilientMailer = require('resilient-mailer');

var provider; // email provider instance

var mailer = new ResilientMailer();
mailer.registerProvider(provider);
```

## Description

`resilient-mailer` enables fault tolerance by allowing the registration of
multiple email providers. Priority is the order in which they're registered. It
tries to send the message using the first registered provider; if that fails, it
then moves to the next one and tries with that. This process continues until the
email has been successfully sent - or failed with all providers.

## Installation

```bash
$ npm install resilient-mailer
```

## Usage

Create an instance of the mailer:

```js
var ResilientMailer = require('resilient-mailer');

var mailer = new ResilientMailer();
```

Register providers to it: ([see below](#providers))

```js
var provider; // email provider instance
mailer.registerProvider(provider);
```

Send messages:

```js
var message = {
	from: 'no-reply@example.com',
	to: ['user@example.net'],
	subject: 'Testing my new email provider',
	textBody: 'Seems to be working!',
	htmlBody: '<p>Seems to be working!</p>'
};

mailer.send(message, function (error) {
	if (error)
		console.log('All providers failed - ' + error.message);
});
```

## Testing

Install the development dependencies first:

```bash
$ npm install
```

Then the tests:

```bash
$ npm test
```

## Providers

For any email service you want to use, you need to use a provider designed for
use with it. This is a list of known providers:

- [Mailgun](https://github.com/billinghamj/resilient-mailer-mailgun)
- [Mailjet](https://github.com/billinghamj/resilient-mailer-mailjet)
- [Mandrill](https://github.com/billinghamj/resilient-mailer-mandrill)
- [SendGrid](https://github.com/billinghamj/resilient-mailer-sendgrid)

## Support

Please open an issue on this repository.

## Authors

- James Billingham <james@jamesbillingham.com>

## License

MIT licensed - see [LICENSE](LICENSE) file
