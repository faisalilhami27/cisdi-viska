const moment = require('moment');
const MeasurementRepository = require('../../repositories/measurement/MeasurementRepository');
const BabyRepository = require('../../repositories/baby/BabyRepository');
const BaseUseCase = require('../BaseUseCase');
const MeasurementRequest = require('../../../interface/requests/measurement/MeasurementRequest');
const Message = require('../../../constant/message');

class MeasurementUseCase extends BaseUseCase {
  constructor(req) {
    super();
    this.measurementRepository = new MeasurementRepository();
    this.babyRepository = new BabyRepository();
    this.measurementRequest = new MeasurementRequest();
    this.req = req;
    this.user = this.req.user.data;
  }

  /**
   * register new parent
   * @returns {Promise<Response>}
   */
  async create() {
    try {
      const validate = await this.measurementRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const {
 baby_id, height, weight, arm_circumference,
} = this.req.body;
      const userId = this.user.id;
      const checkBaby = await this.babyRepository.getOne({
        id: baby_id,
      });

      if (checkBaby == null) return this.returnErrWithCustomMessage(`${Message.Common.notFound}`);

      if (checkBaby.is_stunting === 0) return this.returnErrWithCustomMessage('Baby must be stunting status');

      const result = await this.measurementRepository.create({
        baby_id,
        last_height: height,
        last_weight: weight,
        last_arm_circumference: arm_circumference,
        created_by: userId,
        date: moment().format('YYYY-MM-DD'),
      });

      await this.babyRepository.update(
        { id: baby_id },
        {
          height,
          weight,
          arm_circumference,
        },
      );
      return this.returnCreated(result);
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
  async getMeasurementByBaby() {
    try {
      const { baby_id } = this.req.params;
      const result = await this.measurementRepository.getOne({
        baby_id,
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
