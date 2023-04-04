const express = require('express');

const router = express.Router();

const MeasurementController = require('../../../../interface/controllers/measurement/MeasurementController');
const VerifyToken = require('../../../../interface/middlewares/Middleware');

const middleware = new VerifyToken();
const measurementController = new MeasurementController();

router.get(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  measurementController.getAll,
);
router.get(
  '/:baby_id',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  measurementController.getMeasurementByBaby,
);
router.post(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['kader']),
  measurementController.create,
);

module.exports = router;
