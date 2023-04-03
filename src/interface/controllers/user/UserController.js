const UserUseCase = require('../../../application/usecases/user/UserUseCase');
const BaseController = require('../BaseController');
const StatusCode = require('../../../utils/StatusCode');

class UserController extends BaseController {
  async create(req, res) {
    const result = await new UserUseCase(req).create();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async update(req, res) {
    const result = await new UserUseCase(req).update();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async delete(req, res) {
    const result = await new UserUseCase(req).delete();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getAll(req, res) {
    const result = await new UserUseCase(req).getAllUser();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async getOneUser(req, res) {
    const result = await new UserUseCase(req).getOneUser();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }

  async login(req, res) {
    const result = await new UserUseCase(req).login();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }
}

module.exports = UserController;
