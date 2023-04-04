const BaseRequest = require('../BaseRequest');

class BabyRequest extends BaseRequest {
  rules(body, isUpdate = false) {
    let schema;
    if (isUpdate) {
      schema = {
        parent_id: 'integer|required|regex:/^[0-9]+$/',
        name: 'string|required|min:3|max:100|regex:/^[a-zA-Z ]+$/',
        birth_date: 'string|required|date',
        photo: 'string',
        height: 'integer|required|regex:/^[0-9]+$/',
        weight: 'numeric|required|regex:/^[0-9]+$/',
        arm_circumference: 'numeric|required|regex:/^[0-9]+$/',
      };
    } else {
      schema = {
        parent_id: 'integer|required|regex:/^[0-9]+$/',
        name: 'string|required|min:3|max:100|regex:/^[a-zA-Z ]+$/',
        birth_date: 'string|required|date',
        photo: 'string|required',
        height: 'integer|required|regex:/^[0-9]+$/',
        weight: 'numeric|required|regex:/^[0-9]+$/',
        arm_circumference: 'numeric|required|regex:/^[0-9]+$/',
      };
    }

    return this.validate(body, schema);
  }
}

module.exports = BabyRequest;
