const MeasurementUseCase = require('../../../application/usecases/measurement/MeasurementUseCase');
const BaseController = require('../BaseController');
const StatusCode = require('../../../utils/StatusCode');

class MeasurementController extends BaseController {
  async create(req, res) {
    const result = await new MeasurementUseCase(req).create();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async update(req, res) {
    const result = await new MeasurementUseCase(req).update();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async delete(req, res) {
    const result = await new MeasurementUseCase(req).delete();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getAll(req, res) {
    const result = await new MeasurementUseCase(req).getAllMeasurement();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getOne(req, res) {
    const result = await new MeasurementUseCase(req).getOneMeasurement();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }
}

module.exports = MeasurementController;
