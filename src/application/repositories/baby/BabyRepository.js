const BaseRepository = require('../BaseRepository');
const { Baby } = require('../../../domain/models');

class BabyRepository extends BaseRepository {
  constructor() {
    super(Baby);
  }

  /**
   * Create new baby
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
   * Update baby
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
   * Delete baby
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
   * Get all baby
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
   * Get one baby
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

module.exports = BabyRepository;
