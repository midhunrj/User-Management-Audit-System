const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authHandler = require('../middlewares/userRoleMiddleware');

// Import new combined middleware (created below)


const authController = require('../controllers/authController');
// const { validateRegister, validateLogin } = require('../middlewares/validate');

router.post('/signup', authController.register);
router.post('/login', authController.login);

router.get('/me', authHandler.userLogin, userController.getProfile);

router.get('/', authHandler.adminOrManager, userController.getUsers);

router.post('/create-user', authHandler.adminLogin, userController.createUser);

router.get('/:id', authHandler.adminOrManager, userController.getUser);

router.put('/:id', authHandler.userLogin, userController.updateUser);

router.delete('/:id', authHandler.adminLogin, userController.deleteUser);

module.exports = router;