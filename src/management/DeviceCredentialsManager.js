var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;
var utils = require('../utils');


/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class DeviceCredentialsManager
 * Manages Auth0 Device Credentials.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var DeviceCredentialsManager = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  /**
   * Options object for the RestClient instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 DeviceCredentialsManagers endpoint]{@link https://auth0.com/docs/api/v2#!/Device_Credentials}.
   *
   * @type {external:RestDeviceCredentialsManager}
   */
  this.resource = new RestClient(options.baseUrl + '/device-credentials/:id', clientOptions);
};


/**
 * Create an Auth0 credential.
 *
 * @method    create
 * @memberOf  DeviceCredentialsManager
 *
 * @param   {Object}    data     The device credential data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(DeviceCredentialsManager, 'createPublicKey', 'resource.create');


/**
 * Get all Auth0 credentials.
 *
 * @method  getAll
 * @memberOf  DeviceCredentialsManager
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(DeviceCredentialsManager, 'getAll', 'resource.getAll');


/**
 * Delete an Auth0 device credential.
 *
 * @method    delete
 * @memberOf  DeviceCredentialsManager
 *
 * @param   {Object}    params          Credential parameters.
 * @param   {String}    params.id       Device credential ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(DeviceCredentialsManager, 'delete', 'resource.delete');


module.exports = DeviceCredentialsManager;