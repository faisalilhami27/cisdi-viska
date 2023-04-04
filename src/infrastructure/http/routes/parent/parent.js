const express = require('express');

const router = express.Router();

const ParentController = require('../../../../interface/controllers/parent/ParentController');
const VerifyToken = require('../../../../interface/middlewares/Middleware');

const middleware = new VerifyToken();
const parentController = new ParentController();

router.get(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  parentController.getAll,
);
router.get(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  parentController.getOne,
);
router.post(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader']),
  parentController.create,
);
router.put(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader']),
  parentController.update,
);
router.delete(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin']),
  parentController.delete,
);

module.exports = router;
