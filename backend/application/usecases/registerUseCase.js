const bcrypt = require('bcryptjs');
const userRepository = require('../../infrastructure/repositories/userRepository');

class RegisterUseCase {
  async execute(userData) {
    console.log(userData,"userData");
    
    const { username, email, password, role = 'User' } = userData;
         
    const exists = await userRepository.findByEmail(email);
    if (exists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
      name:username, email, password: hashedPassword, role
    });

    return user;
  }
}

module.exports = new RegisterUseCase();