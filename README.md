# resilient-mailer

`resilient-mailer` provides fault-tolerant email delivery, using failover email
providers.

[![NPM Version](https://img.shields.io/npm/v/resilient-mailer.svg?style=flat)](//www.npmjs.org/package/resilient-mailer)
[![Build Status](https://img.shields.io/travis/billinghamj/resilient-mailer.svg?style=flat)](//travis-ci.org/billinghamj/resilient-mailer)
[![Coverage Status](https://img.shields.io/coveralls/billinghamj/resilient-mailer.svg?style=flat)](//coveralls.io/r/billinghamj/resilient-mailer)

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

- [Mailgun](//github.com/billinghamj/resilient-mailer-mailgun)
- [Mailjet](//github.com/billinghamj/resilient-mailer-mailjet)
- [Mandrill](//github.com/billinghamj/resilient-mailer-mandrill)
- [SendGrid](//github.com/billinghamj/resilient-mailer-sendgrid)
- [AWS SES](//github.com/cuvva/resilient-mailer-ses)

## Future Improvements

At present, this library is quite limited. It attempts to send each message with
the providers in the order they were registered. If it is unable to use a
provider, it moves to the next one until it has tried with all of them - then it
returns a failure to the callback.

This behavior is obviously too primitive for use in real world scenarios. For
example - in the event that the primary provider goes down, it would be best to
remove it from the pool of active providers until it's available again.
Continuing to try to use it in that time is inefficient.

New concepts will be introduced to make the library more useful:

### Queuing

Right now, the library immediately attempts to send messages, without trying to
coordinate them in any way.

In the event that there is a lot of email, it may be better to hold all messages
in a queue until they're sent, and limit the number which can be sent
simultaneously to apply more consistent load on the providers.

### Provider Selection Strategy

The current behavior is to loop through the list of providers attempting to send
each message - a simple failover arrangement. Other appropriate strategies could
be round robin, load balancing, randomly choosing, etc.

This functionality would accept an object to handle the selection, allowing for
custom implementations if desired. The default would continue to be failover.

### Provider Failure Handling

Presently, if a provider is down or malfunctioning, nothing is done to prevent
its continued attempted use. Obviously there are many problems this could cause.

This feature would allow for provider instances to be designated as being
suspended - preventing their use. Similarly to the provider selection,
suspension status would be controlled by the object provided - allowing for
custom implementations if needed.

### Multiple Attempts

There may be cases where it is desired that, even after all providers have
failed, emails should be attempted again. This would allow for a number of
retries to be designated (default 1), and a time period to wait between tries.

### Provider Result Reporting

Many providers only indicate that a message has been successfully queued - not
that the message has been sent. In some cases, the message may fail to be sent
after being accepted. Presently, these events are unknown to the mailer system.

A solution could be to set up callback URLs from the providers back to the
system, allowing for the delayed notification of failures. The message would
then be requeued.

### Attachments

There is currently no support for attachments.

## Support

Please open an issue on this repository.

## Authors

- James Billingham <james@jamesbillingham.com>

## License

MIT licensed - see [LICENSE](LICENSE) file
