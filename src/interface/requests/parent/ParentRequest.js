const BaseRequest = require('../BaseRequest');

class ParentRequest extends BaseRequest {
  rules(body) {
    const schema = {
      nik: 'string|required|min:16|max:16|regex:/^[0-9]+$/',
      name: 'string|required|min:3|max:100|regex:/^[a-zA-Z ]+$/',
      address: 'string|required|min:3|max:200',
    };

    return this.validate(body, schema);
  }
}

module.exports = ParentRequest;
