const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../repositories/user/UserRepository');
const BaseUseCase = require('../BaseUseCase');
const UserRequest = require('../../../interface/requests/user/UserRequest');
const LoginRequest = require('../../../interface/requests/auth/LoginRequest');
const Message = require('../../../constant/message');
const config = require('../../../constant/common');

class UserUseCase extends BaseUseCase {
  constructor(req) {
    super();
    this.userRepository = new UserRepository();
    this.userRequest = new UserRequest();
    this.loginRequest = new LoginRequest();
    this.req = req;
  }

  /**
   * register new user
   * @returns {Promise<Response>}
   */
  async create() {
    try {
      const validate = await this.userRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const {
 name, username, password, role,
} = this.req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const checkUsername = await this.userRepository.getOne({
        username,
      });

      if (checkUsername != null) {
        return this.returnErrWithCustomMessage(
          `Username ${Message.Common.exist}`,
        );
      }

      const result = await this.userRepository.create({
        name,
        username,
        password: passwordHash,
        role,
      });
      return this.returnCreated(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * update user
   * @returns {Promise<Response>}
   */
  async update() {
    try {
      const validate = await this.userRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const {
 name, username, password, role,
} = this.req.body;
      const { id } = this.req.params;
      const passwordHash = await bcrypt.hash(password, 10);
      const result = await this.userRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.userRepository.update(
        {
          id,
        },
        {
          name,
          username,
          password: passwordHash,
          role,
        },
      );
      return this.returnOk({
        name,
        username,
        role,
      });
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * delete user
   * @returns {Promise<Response>}
   */
  async delete() {
    try {
      const { id } = this.req.params;
      const result = await this.userRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.userRepository.delete({
        id,
      });
      return this.returnOk();
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get all user
   * @returns {Promise<Response>}
   */
  async getAllUser() {
    try {
      const result = await this.userRepository.getAll();
      return this.returnOk(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get one user
   * @returns {Promise<Response>}
   */
  async getOneUser() {
    try {
      const { id } = this.req.params;
      const result = await this.userRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      return this.returnOk(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  async login() {
    try {
      const validate = await this.loginRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const { username, password } = this.req.body;
      const result = await this.userRepository.getOne({
        username,
      });

      if (result == null) {
        return this.returnNotFoundWithCustomMessage('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, result.password);
      if (!passwordMatch) {
        return this.returnErrWithCustomMessage('Wrong password');
      }

      const data = {
        id: result.id,
        username: result.username,
        role: result.role,
        password: result.password,
      };
      const token = jwt.sign({ data }, config.common.JWT_SECRET, {});
      return this.returnOk(data, token);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }
}

module.exports = UserUseCase;
