import { sequelize } from '../config/connectDB'
import User from './user'

// Tạo bảng trong CSDL
sequelize
  .sync({ force: false })
  .then(() => console.log('Tables have been created'))
  .catch((err) => console.log('Error while creating tables', err))

const db = {
  User,
}
export default db
