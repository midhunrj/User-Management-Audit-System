const userRepository = require("../../infrastructure/repositories/userRepository");
const { authconfig } = require("../../config/authConfig");

class LoginUseCase {
  async execute(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await authconfig.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    if (user.status !== "active") {
      throw new Error("Account is inactive");
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = authconfig.generateAccessToken(payload);
    const refreshToken = authconfig.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  }
}

module.exports = new LoginUseCase();