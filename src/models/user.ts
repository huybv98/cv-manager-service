import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/connectDB'

export interface UserAttributes {
  id?: number
  email: string
  password: string
  fullName: string
  roleId: number
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number
  public email!: string
  public password!: string
  public fullName!: string
  public roleId!: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
)

export default User
