const express = require('express');

const router = express.Router();

const MeasurementController = require('../../../../interface/controllers/measurement/MeasurementController');
const VerifyToken = require('../../../../interface/middlewares/VerifyToken');

const middleware = new VerifyToken();
const measurementController = new MeasurementController();

router.get('/', middleware.verify, measurementController.getAll);
router.get('/:id', middleware.verify, measurementController.getOne);
router.post('/', middleware.verify, measurementController.create);
router.put('/:id', middleware.verify, measurementController.update);
router.delete('/:id', middleware.verify, measurementController.delete);

module.exports = router;
