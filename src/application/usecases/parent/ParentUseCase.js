const ParentRepository = require('../../repositories/parent/ParentRepository');
const BaseUseCase = require('../BaseUseCase');
const ParentRequest = require('../../../interface/requests/parent/ParentRequest');
const Message = require('../../../constant/message');

class ParentUseCase extends BaseUseCase {
  constructor(req) {
    super();
    this.parentRepository = new ParentRepository();
    this.parentRequest = new ParentRequest();
    this.req = req;
    this.user = this.req.user.data;
  }

  /**
   * register new measurement
   * @returns {Promise<Response>}
   */
  async create() {
    try {
      const validate = await this.parentRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const { nik, name, address } = this.req.body;
      const checkNIK = await this.parentRepository.getOne({
        nik,
      });

      if (checkNIK != null) return this.returnErrWithCustomMessage(`NIK ${Message.Common.exist}`);

      const result = await this.parentRepository.create({
        nik,
        name,
        address,
        created_by: this.user.id,
      });
      return this.returnCreated(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * update measurement
   * @returns {Promise<Response>}
   */
  async update() {
    try {
      const validate = await this.parentRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const { nik, name, address } = this.req.body;
      const { id } = this.req.params;
      const result = await this.parentRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.parentRepository.update(
        {
          id,
        },
        {
          nik,
          name,
          address,
          updated_by: this.user.id,
        },
      );
      return this.returnOk({
        nik,
        name,
        address,
      });
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * delete measurement
   * @returns {Promise<Response>}
   */
  async delete() {
    try {
      const { id } = this.req.params;
      const result = await this.parentRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.parentRepository.delete({
        id,
      });
      return this.returnOk();
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get all measurement
   * @returns {Promise<Response>}
   */
  async getAllParent() {
    try {
      const result = await this.parentRepository.getAll();
      return this.returnOk(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get one measurement
   * @returns {Promise<Response>}
   */
  async getOneParent() {
    try {
      const { id } = this.req.params;
      const result = await this.parentRepository.getOne({
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
}

module.exports = ParentUseCase;
