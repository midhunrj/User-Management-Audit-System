const { verifyToken } = require('../../config/authConfig'); // Your existing JWT utility
const userRepository = require('../../infrastructure/repositories/userRepository');

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthHandler {

  constructor() {
    console.log("AuthHandler initialized");
  }

  // User Login Middleware
  async userLogin(req, res, next) {
    try {
      const token = req.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw new HttpError("No access token found", 403);
      }

      const decodeToken = verifyToken(token);   // Using your existing verifyToken

      if (!decodeToken) {
        throw new HttpError("Token is not valid", 401);
      }

      if (decodeToken.role !== 'User') {
        throw new HttpError("This route is not authorized for your role", 403);
      }

      // Attach user to request
      req.user = {
        id: decodeToken.id,
        role: decodeToken.role
      };

      // Check if user is active / not blocked
      const isUserValid = await userRepository.findById(decodeToken.id);
      
      if (!isUserValid || isUserValid.status === 'inactive') {
        throw new HttpError("Not Authorized. User has been blocked or inactive", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  // Admin Login Middleware
  async adminLogin(req, res, next) {
    try {
      const token = req.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw new HttpError("No access token found", 403);
      }

      const decodeToken = verifyToken(token);

      if (!decodeToken) {
        throw new HttpError("Token is not valid", 401);
      }

      if (decodeToken.role !== 'Admin') {
        throw new HttpError("This route is not authorized for your role", 403);
      }

      
      req.user = {
        id: decodeToken.id,
        role: decodeToken.role
      };

      next();
    } catch (error) {
      next(error);
    }
  }

  // manager Login Middleware (if you need it later)
  async managerLogin(req, res, next) {
    try {
      const token = req.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw new HttpError("No access token found", 403);
      }

      const decodeToken = verifyToken(token);

      if (!decodeToken) {
        throw new HttpError("Token is not valid", 401);
      }

      if (decodeToken.role !== 'manager') {   // Change according to your role name
        throw new HttpError("This route is not authorized for your role", 403);
      }

      req.user = {
        id: decodeToken.id,
        role: decodeToken.role
      };


      next();
    } catch (error) {
      next(error);
    }
  }
  async adminOrManager (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const decoded = require('../utils/jwt').verifyToken(token);

    if (decoded.role === 'Admin') {
      return authHandler.adminLogin(req, res, next);
    }

    if (decoded.role === 'Manager') {
      return authHandler.managerLogin(req, res, next);
    }

    return next(new Error("Forbidden: Admin or Manager access only"));
  } catch (error) {
    next(error);
  }
}
}

module.exports = new AuthHandler();