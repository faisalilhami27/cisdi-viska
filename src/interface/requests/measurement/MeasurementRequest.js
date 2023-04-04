const BaseRequest = require('../BaseRequest');

class MeasurementRequest extends BaseRequest {
  rules(body) {
    const schema = {
      baby_id: 'integer|required|regex:/^[0-9]+$/',
      height: 'integer|required|regex:/^[0-9]+$/',
      weight: 'numeric|required|regex:/^[0-9]+$/',
      arm_circumference: 'numeric|required|regex:/^[0-9]+$/',
    };

    return this.validate(body, schema);
  }
}

module.exports = MeasurementRequest;
