const url = require('url');

module.exports = reqUrl => url.parse(reqUrl, true);