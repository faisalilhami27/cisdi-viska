const BabyRepository = require('../../repositories/baby/BabyRepository');
const ParentRepository = require('../../repositories/parent/ParentRepository');
const BaseUseCase = require('../BaseUseCase');
const Message = require('../../../constant/message');
const UploadFile = require('../../../infrastructure/component/aws/UploadFile');
const BabyRequest = require('../../../interface/requests/baby/BabyRequest');
const StuntingRequest = require('../../../interface/requests/baby/StuntingRequest');
const awsConfig = require('../../../constant/aws');

class BabyUseCase extends BaseUseCase {
  constructor(req) {
    super();
    this.babyRepository = new BabyRepository();
    this.parentRepository = new ParentRepository();
    this.upload = new UploadFile();
    this.req = req;
    this.babyRequest = new BabyRequest();
    this.stuntingRequest = new StuntingRequest();
    this.user = this.req.user.data;
  }

  /**
   * register new baby
   * @returns {Promise<Response>}
   */
  async create() {
    try {
      const { body } = this.req;
      body.photo = this.req.file.originalname;
      const validate = await this.babyRequest.rules(body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const {
        parent_id, name, birth_date, height, weight, arm_circumference,
      } = this.req.body;
      const photo = this.req.file
        ? `${awsConfig.aws.S3_URL}/${this.req.file.originalname}`
        : null;
      const checkParent = await this.parentRepository.getOne({
        id: parent_id,
      });

      if (checkParent == null) return this.returnErrWithCustomMessage('Parent not found');

      const result = await this.babyRepository.create({
        parent_id,
        name,
        birth_date,
        photo,
        height,
        weight,
        arm_circumference,
        created_by: this.user.id,
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
      const { body } = this.req;
      const photo = this.req.file
        ? `${awsConfig.aws.S3_URL}/${this.req.file.originalname}`
        : null;
      body.photo = photo;
      const validate = await this.babyRequest.rules(body, true);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const {
        parent_id, name, birth_date, height, weight, arm_circumference,
      } = this.req.body;
      const { id } = this.req.params;
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

      let newPhoto;
      if (this.req.file != null) {
        newPhoto = photo;
      } else {
        newPhoto = baby.photo;
      }
      const result = await this.babyRepository.update(
        {
          id,
        },
        {
          parent_id,
          name,
          birth_date,
          newPhoto,
          height,
          weight,
          arm_circumference,
          updated_by: this.user.id,
        },
      );

      if (result && this.req.file != null) {
        await this.upload.uploadFileToS3V3(this.req.file);
      }

      return this.returnOk({
        parent_id,
        name,
        birth_date,
        newPhoto,
      });
    } catch (err) {
      return this.returnErrOnCatch(err);
    }
  }

  /**
   * update baby is stunting or not
   * @returns {Promise<Response>}
   */
  async isStunting() {
    try {
      const validate = await this.stuntingRequest.rules(this.req.body);

      if (validate.fails()) {
        return this.returnErrValidation(validate.errors.errors);
      }

      const { baby_id, is_stunting } = this.req.body;
      const baby = await this.babyRepository.getOne({
        id: baby_id,
      });

      if (baby == null) {
        return this.returnNotFoundWithCustomMessage('Baby not found');
      }

      await this.babyRepository.update(
        {
          id: baby_id,
        },
        {
          is_stunting,
          updated_by: this.user.id,
        },
      );

      return this.returnOk({
        is_stunting,
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
