const BaseRepository = require('../BaseRepository');
const { Measurement } = require('../../../domain/models');

class MeasurementRepository extends BaseRepository {
  constructor() {
    super(Measurement);
  }

  /**
   * Create new parent
   * @param data
   * @returns {Promise<*>}
   */
  async create(data) {
    try {
      return await this.createData(data);
    } catch (error) {
      this.logError(error);
      return error;
    }
  }

  /**
   * Update parent
   * @param params
   * @param data
   * @returns {Promise<*>}
   */
  async update(params, data) {
    try {
      console.log(data);
      return await this.updateData({
        where: params,
      }, data);
    } catch (error) {
      this.logError(error);
      return error;
    }
  }

  /**
   * Delete parent
   * @param params
   * @returns {Promise<*>}
   */
  async delete(params) {
    try {
      return await this.deleteData({
        where: params,
      });
    } catch (error) {
      this.logError(error);
      return error;
    }
  }

  /**
   * Get all parent
   * @param params
   * @returns {Promise<*>}
   */
  async getAll(params = null) {
    try {
      return await this.findAll(params);
    } catch (error) {
      this.logError(error);
      return error;
    }
  }

  /**
   * Get one parent
   * @param params
   * @returns {Promise<*>}
   */
  async getOne(params) {
    try {
      return await this.findOne({
        where: params,
      });
    } catch (error) {
      this.logError(error);
      return error;
    }
  }
}

module.exports = MeasurementRepository;
