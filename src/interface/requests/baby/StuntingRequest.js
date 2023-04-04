const BaseRequest = require('../BaseRequest');

class StuntingRequest extends BaseRequest {
  rules(body) {
    const schema = {
      is_stunting: 'boolean|required',
    };

    return this.validate(body, schema);
  }
}

module.exports = StuntingRequest;
