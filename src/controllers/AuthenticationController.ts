import AuthService from '@src/services/AuthService'
import { Request, Response } from 'express'
import responseApi from '@src/utils/supports/responseApi'

const handleLogin = async (req: Request, res: Response) => {
  console.log('req.body', req.body)
  // const email = req.body.email
  // const password = req.body.password
  // if (!email || !password) {
  //   return responseApi.responseFail(res, ' Missing input parameter')
  // }
  // const userData: any = await AuthService.handleUserLogin(email, password)
  // return responseApi.responseSuccess(res, userData.code, userData.message, userData.body)
}

const handleRegister = async (req: Request, res: Response) => {
  console.log('req.body', req.body)
  // const name = req.body.name
  // const email = req.body.email
  // const password = req.body.password
  // if (!name || !email || !password) {
  //   return responseApi.responseFail(res, ' Missing input parameter')
  // }
  // const userData: any = await AuthService.handleUserRegister(name, email, password)
  // return responseApi.responseSuccess(res, userData.code, userData.message, userData.body)
}

const AuthController = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
}
export default AuthController
