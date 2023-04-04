const BaseRequest = require('../BaseRequest');

class LoginRequest extends BaseRequest {
  rules(body) {
    const schema = {
      username: 'string|required',
      password: 'string|required',
    };

    return this.validate(body, schema);
  }
}

module.exports = LoginRequest;
