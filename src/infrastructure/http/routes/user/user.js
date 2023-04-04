const express = require('express');

const router = express.Router();

const UserController = require('../../../../interface/controllers/user/UserController');
const VerifyToken = require('../../../../interface/middlewares/Middleware');

const middleware = new VerifyToken();
const userController = new UserController();

router.post('/login', userController.login);
router.post(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin']),
  userController.create,
);
router.get(
  '/',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  userController.getAll,
);
router.get(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin', 'kader', 'nakes']),
  userController.getOneUser,
);
router.put(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin']),
  userController.update,
);
router.delete(
  '/:id',
  middleware.verifyToken,
  middleware.checkRole(['admin']),
  userController.delete,
);

module.exports = router;
