'use strict';
// Creates an object with the response data and statusCode
module.exports = (data = {}, code = 200) => ({
  data,
  code
});