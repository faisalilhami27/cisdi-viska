const express = require('express');

const router = express.Router();

const BabyController = require('../../../../interface/controllers/baby/BabyController');
const Multer = require('../../../../interface/middlewares/Multer');
const VerifyToken = require('../../../../interface/middlewares/Middleware');

const middleware = new VerifyToken();
const babyController = new BabyController();
const multer = new Multer();

router.get(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  babyController.getAll,
);
router.get(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  babyController.getOne,
);
router.post(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader']),
  multer.upload().single('photo'),
  babyController.create,
);
router.put(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader']),
  multer.upload().single('photo'),
  babyController.update,
);
router.patch(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['nakes']),
  babyController.isStunting,
);
router.delete(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin']),
  babyController.delete,
);

module.exports = router;
