const ParentUseCase = require('../../../application/usecases/parent/ParentUseCase');
const BaseController = require('../BaseController');
const StatusCode = require('../../../utils/StatusCode');

class ParentController extends BaseController {
  async create(req, res) {
    const result = await new ParentUseCase(req).create();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async update(req, res) {
    const result = await new ParentUseCase(req).update();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async delete(req, res) {
    const result = await new ParentUseCase(req).delete();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getAll(req, res) {
    const result = await new ParentUseCase(req).getAllParent();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getOne(req, res) {
    const result = await new ParentUseCase(req).getOneParent();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }
}

module.exports = ParentController;
