function parseBody(body) {
  try {
    return JSON.parse(body || '[]');
  } catch (e) {
    return body;
  }
}

module.exports = parseBody;