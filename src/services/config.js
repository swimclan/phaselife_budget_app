var {get} = require('lodash');
var config = require('../globals/json/config.json');

module.exports.get = function(path) {
  return get(config, path, null);
}
