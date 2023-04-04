const BaseRequest = require('../BaseRequest');

class UserRequest extends BaseRequest {
  rules(body) {
    const schema = {
      name: 'string|required|regex:/^[a-zA-Z ]+$/|min:3|max:100',
      username: 'string|required|min:3|max:20',
      password: 'string|required',
      role: 'string|required|in:admin,kader,nakes|regex:/^[a-z]+$/',
    };

    return this.validate(body, schema);
  }
}

module.exports = UserRequest;
