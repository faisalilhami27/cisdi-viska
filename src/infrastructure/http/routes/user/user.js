const express = require('express');

const router = express.Router();

const UserController = require('../../../../interface/controllers/user/UserController');
const VerifyToken = require('../../../../interface/middlewares/VerifyToken');

const middleware = new VerifyToken();
const userController = new UserController();

router.post('/login', userController.login);
router.post('/register', userController.create);
router.get('/', middleware.verify, userController.getAll);
router.get('/:id', middleware.verify, userController.getOneUser);
router.put('/:id', middleware.verify, userController.update);
router.delete('/:id', middleware.verify, userController.delete);

module.exports = router;
