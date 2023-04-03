const BabyRepository = require('../../repositories/baby/BabyRepository');
const ParentRepository = require('../../repositories/parent/ParentRepository');
const BaseUseCase = require('../BaseUseCase');
const Message = require('../../../constant/message');
const UploadFile = require('../../../infrastructure/component/aws/UploadFile');
const awsConfig = require('../../../constant/aws');

class BabyUseCase extends BaseUseCase {
  constructor(req) {
    super();
    this.babyRepository = new BabyRepository();
    this.parentRepository = new ParentRepository();
    this.upload = new UploadFile();
    this.req = req;
  }

  /**
   * register new baby
   * @returns {Promise<Response>}
   */
  async create() {
    try {
      const {
        parent_id,
        name,
        birth_date,
      } = this.req.body;
      const photo = this.req.file ? `${awsConfig.aws.S3_URL}/${this.req.file.originalname}` : null;
      const checkParent = await this.parentRepository.getOne({
        id: parent_id,
      });

      if (checkParent == null) return this.returnErrWithCustomMessage(`${Message.Common.notFound}`);

      const result = await this.babyRepository.create({
        parent_id,
        name,
        birth_date,
        photo,
      });

      if (result) {
        await this.upload.uploadFileToS3V3(this.req.file);
      }

      return this.returnCreated(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * update baby
   * @returns {Promise<Response>}
   */
  async update() {
    try {
      const {
        parent_id,
        name,
        birth_date,
      } = this.req.body;
      const { id } = this.req.params;
      const photo = this.req.file ? `${awsConfig.aws.S3_URL}/${this.req.file.originalname}` : null;
      const checkParent = await this.parentRepository.getOne({
        id: parent_id,
      });

      if (checkParent == null) return this.returnErrWithCustomMessage(`${Message.Common.notFound}`);
      const baby = await this.babyRepository.getOne({
        id,
      });

      if (baby == null) {
        return this.returnNotFound();
      }

      const result = await this.babyRepository.update({
        id,
      }, {
        parent_id,
        name,
        birth_date,
        photo,
      });

      if (result) {
        await this.upload.uploadFileToS3V3(this.req.file);
      }

      return this.returnOk({
        parent_id,
        name,
        birth_date,
        photo,
      });
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * delete baby
   * @returns {Promise<Response>}
   */
  async delete() {
    try {
      const { id } = this.req.params;
      const result = await this.babyRepository.getOne({
        id,
      });

      if (result == null) {
        return this.returnNotFound();
      }

      await this.babyRepository.delete({
        id,
      });
      return this.returnOk();
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get all baby
   * @returns {Promise<Response>}
   */
  async getAllBaby() {
    try {
      const result = await this.babyRepository.getAll();
      return this.returnOk(result);
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * get one baby
   * @returns {Promise<Response>}
   */
  async getOneBaby() {
    try {
      const { id } = this.req.params;
      const result = await this.babyRepository.getOne({
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

module.exports = BabyUseCase;
