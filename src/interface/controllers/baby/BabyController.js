const BabyUseCase = require('../../../application/usecases/baby/BabyUseCase');
const BaseController = require('../BaseController');
const StatusCode = require('../../../utils/StatusCode');

class BabyController extends BaseController {
  async create(req, res) {
    const result = await new BabyUseCase(req).create();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async update(req, res) {
    const result = await new BabyUseCase(req).update();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async delete(req, res) {
    const result = await new BabyUseCase(req).delete();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getAll(req, res) {
    const result = await new BabyUseCase(req).getAllBaby();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getOne(req, res) {
    const result = await new BabyUseCase(req).getOneBaby();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }
}

module.exports = BabyController;
