const express = require('express');

const router = express.Router();

const ParentController = require('../../../../interface/controllers/parent/ParentController');
const VerifyToken = require('../../../../interface/middlewares/VerifyToken');

const middleware = new VerifyToken();
const parentController = new ParentController();

router.get('/', middleware.verify, parentController.getAll);
router.get('/:id', middleware.verify, parentController.getOne);
router.post('/', middleware.verify, parentController.create);
router.put('/:id', middleware.verify, parentController.update);
router.delete('/:id', middleware.verify, parentController.delete);

module.exports = router;
