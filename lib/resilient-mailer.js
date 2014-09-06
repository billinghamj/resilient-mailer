module.exports = ResilientMailer;

/**
 * Creates an instance of the resilient mailer.
 *
 * @constructor
 * @this {ResilientMailer}
 */
function ResilientMailer() {
}

/**
 * Attempts to send the message through the registered providers.
 *
 * @this {ResilientMailer}
 * @param {Provider} provider The provider to register.
 */
ResilientMailer.prototype.registerProvider = function (provider) {
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
}
