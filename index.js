module.exports.getInstance = function(isModule, options, callback) {  
  var mod = require( './api.js' );
  return new mod(isModule, options, callback);
};