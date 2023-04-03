const sentry = require('@sentry/node');
const env = require('../../constant/common');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async createData(data) {
    return await this.model.create(data);
  }

  async updateData(params, data) {
    return await this.model.update(data, { ...params });
  }

  async deleteData(params) {
    return await this.model.destroy({ ...params });
  }

  async findAll(params = null) {
    let data;
    if (params != null) {
      data = await this.model.findAll({ ...params });
    } else {
      data = await this.model.findAll();
    }
    return data;
  }

  async findOne(params) {
    return await this.model.findOne({ ...params });
  }

  logError(error) {
    if (env.common.APP_ENV !== 'local') {
      sentry.captureException(error);
    } else {
      console.log(error);
    }
  }
}

module.exports = BaseRepository;
