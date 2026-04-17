const loginUseCase = require('../../application/usecases/loginUseCase');
const registerUseCase = require('../../application/usecases/registerUseCase');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const logData = await loginUseCase.execute(email, password);
    console.log("result of login Data",logData);
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: logData.accessToken,
      refreshToken: logData.refreshToken,
      user: logData.user,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    console.log("hello i am signing here");
    
    const result = await registerUseCase.execute(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register
};