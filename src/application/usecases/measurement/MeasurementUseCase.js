const MeasurementRepository = require('../../repositories/measurement/MeasurementRepository');
const BabyRepository = require('../../repositories/baby/BabyRepository');
const BaseUseCase = require('../BaseUseCase');
const Message = require('../../../constant/message');

class MeasurementUseCase extends BaseUseCase {
  constructor(req) {
    super();
    this.measurementRepository = new MeasurementRepository();
    this.babyRepository = new BabyRepository();
    this.req = req;
  }

  /**
   * register new parent
   * @returns {Promise<Response>}
   */
  async create() {
    try {
      const {
        baby_id,
        is_stanting,
        body_weight,
        arm_circumference,
      } = this.req.body;
      const checkBaby = await this.babyRepository.getOne({
        id: baby_id,
      });

      if (checkBaby == null) return this.returnErrWithCustomMessage(`${Message.Common.notFound}`);

      const result = await this.measurementRepository.create({
        baby_id,
        is_stanting,
        body_weight,
        arm_circumference,
      });
      return this.returnCreated(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * update parent
   * @returns {Promise<Response>}
   */
  async update() {
    try {
      const {
        baby_id,
        is_stanting,
        body_weight,
        arm_circumference,
      } = this.req.body;
      const { id } = this.req.params;
      const checkBaby = await this.babyRepository.getOne({
        id: baby_id,
      });

      if (checkBaby == null) return this.returnErrWithCustomMessage(`${Message.Common.notFound}`);

      const result = await this.measurementRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.measurementRepository.update({
        id,
      }, {
        baby_id,
        is_stanting,
        body_weight,
        arm_circumference,
      });
      return this.returnOk({
        baby_id,
        is_stanting,
        body_weight,
        arm_circumference,
      });
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * delete parent
   * @returns {Promise<Response>}
   */
  async delete() {
    try {
      const { id } = this.req.params;
      const result = await this.measurementRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.measurementRepository.delete({
        id,
      });
      return this.returnOk();
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get all parent
   * @returns {Promise<Response>}
   */
  async getAllMeasurement() {
    try {
      const result = await this.measurementRepository.getAll();
      return this.returnOk(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get one parent
   * @returns {Promise<Response>}
   */
  async getOneMeasurement() {
    try {
      const { id } = this.req.params;
      const result = await this.measurementRepository.getOne({
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

module.exports = MeasurementUseCase;
