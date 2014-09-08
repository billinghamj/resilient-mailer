module.exports = ResilientMailer;

/**
 * Creates an instance of the resilient mailer.
 *
 * @constructor
 * @this {ResilientMailer}
 */
function ResilientMailer() {
	this.providers = [];
}

/**
 * Attempts to send the message through the registered providers.
 *
 * @this {ResilientMailer}
 * @param {Provider} provider The provider to register.
 */
ResilientMailer.prototype.registerProvider = function (provider) {
	this.providers.push(provider);
}

/**
 * Indicates the outcome of a mail-sending attempt.
 * @callback ResilientMailer~onResult
 * @param {error} [error] A non-null value indicates failure.
 */

/**
 * Attempts to send the message through the registered providers.
 *
 * @this {ResilientMailer}
 * @param {Message} message The message to send.
 * @param {ResilientMailer~onResult} [callback] Notified when the attempt fails or succeeds.
 */
ResilientMailer.prototype.mail = function (message, callback) {
	this._attempt(0, message, callback);
}

ResilientMailer.prototype._attempt = function (index, message, callback) {
	var self = this; // any way around this?
	var provider = this.providers[index];

	provider.mail(message, function (error) {
		if (!error) {
			if (callback)
				callback();

			return;
		}

		index++;

		if (self.providers.length == index) {
			// todo: accumulate errors? maybe output one with an array of underlying

			if (callback)
				callback(error);

			return;
		}

		self._attempt(index, message, callback);
	});
}
