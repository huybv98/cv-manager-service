import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserData } from '@src/types/user'
import db from '@src/models/index'
import codeApi from '@src/constants/code'

const handleUserLogin = (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData: UserData = {
        code: codeApi.CODE_OK,
        message: '',
        body: undefined,
      }
      const isExist = await checkUserEmail(email)
      if (!isExist) {
        userData.code = codeApi.CODE_FAIL
        userData.message = `Email hoặc mật khẩu không đúng.`
        resolve(userData)
        return
      }
      const user = await db.User.findOne({
        where: { email: email },
        attributes: ['email', 'roleId', 'password'],
        raw: true,
      })
      if (user) {
        const hash = await handleHashPassword(password)
        const check = bcrypt.compareSync(password, hash)
        if (!check) {
          userData.code = codeApi.CODE_FAIL
          userData.message = `Email hoặc mật khẩu không đúng.`
          resolve(userData)
        } else {
          const payload = {
            user: {
              id: user.id,
            },
          }

          const token: string = jwt.sign(payload, process.env.SERVICE_APP_JWT_SECRET!) || ''
          userData.code = codeApi.CODE_OK
          userData.message = `Đăng nhập thành công`
          userData.body = {
            email: user.email,
            fullName: user.fullName,
            token: token,
          }
        }
      } else {
        userData.code = codeApi.CODE_FAIL
        userData.message = `Email hoặc mật khẩu không đúng.`
      }
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}

const handleUserRegister = (fullName: string, email: string, password: string, roleId = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData: UserData = {
        code: codeApi.CODE_OK,
        message: '',
        body: undefined,
      }
      const isExist = await checkUserEmail(email)
      if (isExist) {
        userData.code = codeApi.CODE_FAIL
        userData.message = `Email đã được đăng ký`
        resolve(userData)
        return
      }
      // hash password
      password = await handleHashPassword(password)
      // Tạo người dùng mới
      const newUser = {
        fullName: fullName,
        email: email,
        password: password,
        roleId: roleId,
      }
      await db.User.create(newUser)
        .then(() => {
          userData.code = codeApi.CODE_OK
          userData.message = `Đăng ký thành công`
          userData.body = true
        })
        .catch((error) => {
          console.log('Error saving user', error)
          userData.code = codeApi.CODE_FAIL
          userData.message = `Đăng ký thất bại`
        })
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}

const checkUserEmail = (email: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: email },
      })
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
}
const handleHashPassword = (password: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const saltRounds = parseInt(process.env.SERVICE_APP_SALT!)
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      resolve(hash)
    } catch (e) {
      reject(e)
    }
  })
}

const AuthService = {
  handleUserLogin: handleUserLogin,
  handleUserRegister: handleUserRegister,
}
export default AuthService
