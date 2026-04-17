const bcrypt = require('bcryptjs');
const userRepository = require('../../infrastructure/repositories/userRepository');
const { ROLES } = require('../../config/consonants');

class UserUseCase {
  
  // Fetch all users (with pagination, filter, search)
  async getUsers(query = {}) {
    const { page = 1, limit = 10, role, search } = query;
    
    const filter = {};
    if (role) filter.role = role;
    if (search) filter.name = { $regex: search, $options: 'i' };

    return await userRepository.findAll(filter, parseInt(page), parseInt(limit));
  }

  // Fetch single user by ID
  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  // Create new user (Admin only)
  async createUser(userData, createdBy) {
    const { name, email, password, role } = userData;

    const exists = await userRepository.existsByEmail(email);
    if (exists) throw new Error('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password || 'Default@123', 10);

    return await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || ROLES.USER,
      createdBy: createdBy._id,
      updatedBy: createdBy._id
    });
  }

  // Update user (Own profile or by Admin/Manager)
  async updateUser(id, updateData, updatedBy) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await userRepository.update(id, {
      ...updateData,
      updatedBy: updatedBy._id
    });

    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  // Soft Delete / Deactivate user (Admin only)
  async deleteUser(id, deletedBy) {
    const user = await userRepository.deactivate(id);
    if (!user) throw new Error('User not found');
    return { message: 'User deactivated successfully' };
  }

  // Get current user profile
  async getProfile(userId) {
    return await userRepository.findById(userId);
  }
}

module.exports = new UserUseCase();