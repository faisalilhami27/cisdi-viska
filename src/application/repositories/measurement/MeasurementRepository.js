const BaseRepository = require('../BaseRepository');
const { Measurement, Baby } = require('../../../domain/models');

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
   * Get all parent
   * @param params
   * @returns {Promise<*>}
   */
  async getAll(params = {}) {
    try {
      return await this.findAll({
        include: [
          {
            model: Baby,
            as: 'baby',
            attributes: ['id', 'name'],
          },
        ],
        where: params,
      });
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
        include: [
          {
            model: Baby,
            as: 'baby',
            attributes: ['id', 'name'],
          },
        ],
        where: params,
      });
    } catch (error) {
      this.logError(error);
      return error;
    }
  }
}

module.exports = MeasurementRepository;
