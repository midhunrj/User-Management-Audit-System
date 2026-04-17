const userModel=require('../models/userModel')
class UserRepository {
  async findByEmail(email) {

    return await userModel.findOne({email})


  }

  async createUser(userData) {

    const newUser=await userModel.create(userData)

  }

  async getUsers(fetchQuery) {
   
    return await userModel.find(fetchQuery)
   
  }

  async getUserById(id) {

    return await userModel.findById(id)

  }

  async updateUser(id, data) {

    const updatedUser=await userModel.updateOne(id,data)
    return updatedUser
  }

  async deleteUser(id) {

    return await userModel.deleteOne(id)
  }
}

module.exports = new UserRepository();