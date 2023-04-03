const BaseRepository = require('../BaseRepository');
const { User } = require('../../../domain/models');

class BabyRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /**
   * Create new user
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
   * Update user
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
   * Delete user
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
   * Get all user
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
   * Get one user
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
