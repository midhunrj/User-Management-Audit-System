

export interface IUserRepository {
  findByEmail(email)
  createUser(data)
  getUsers(query)
  getUserById(id)
  updateUser(id, data)
  deleteUser(id) 
}