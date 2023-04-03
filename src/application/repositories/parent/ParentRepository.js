const BaseRepository = require('../BaseRepository');
const { Parent } = require('../../../domain/models');

class ParentRepository extends BaseRepository {
  constructor() {
    super(Parent);
  }

  /**
   * Create new measurement
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
   * Update measurement
   * @param params
   * @param data
   * @returns {Promise<*>}
   */
  async update(params, data) {
    try {
      return await this.updateData({
        where: params,
      }, data);
    } catch (error) {
      this.logError(error);
      return error;
    }
  }

  /**
   * Delete measurement
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
   * Get all measurement
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
   * Get one measurement
   * @param params
   * @returns {Promise<*>}
   */
  async getOne(params) {
    try {
      const data = await this.findOne({
        where: params,
      });
      return data;
    } catch (error) {
      this.logError(error);
      return error;
    }
  }
}

module.exports = ParentRepository;
