const userUseCase = require('../../application/usecases/userUseCase');
const { ROLES } = require('../../config/consonants');

const  getUsers = async (req, res, next) => {
  try {
    const users = await userUseCase.getUsers(req.query);
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const  getUser = async (req, res, next) => {
  try {
    const user = await userUseCase.getUserById(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const  createUser = async (req, res, next) => {
  try {
    const user = await userUseCase.createUser(req.body, req.user);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const  updateUser = async (req, res, next) => {
  try {
    
    if (req.user.role === ROLES.USER && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ success: false, message: "You can only update your own profile" });
    }
    
    const user = await userUseCase.updateUser(req.params.id, req.body, req.user);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const  deleteUser = async (req, res, next) => {
  try {
    const result = await userUseCase.deleteUser(req.params.id, req.user);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

const  getProfile = async (req, res) => {
  try {
    const profile = await userUseCase.getProfile(req.user._id);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports={
    getUsers,
    getUser,
    getProfile,
    createUser,
    updateUser,
    deleteUser
}