const express = require('express');

const router = express.Router();

const BabyController = require('../../../../interface/controllers/baby/BabyController');
const Multer = require('../../../../interface/middlewares/Multer');
const VerifyToken = require('../../../../interface/middlewares/VerifyToken');

const middleware = new VerifyToken();
const babyController = new BabyController();
const multer = new Multer();

router.get('/', middleware.verify, babyController.getAll);
router.get('/:id', middleware.verify, babyController.getOne);
router.post('/', middleware.verify, multer.upload().single('photo'), babyController.create);
router.put('/:id', middleware.verify, multer.upload().single('photo'), babyController.update);
router.delete('/:id', middleware.verify, babyController.delete);

module.exports = router;
