import { Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import codeApi from '@src/constants/code'
import messageApi from '@src/constants/message'

const respond = (
  res: Response,
  code = '',
  message = '',
  data = null,
  httpCode: number = StatusCodes.OK
) => {
  const resBody = {
    code: code,
    message: message || getReasonPhrase(httpCode),
    body: undefined,
  }
  if (data) {
    resBody.body = data
  }
  return res.status(httpCode).json(resBody)
}

const responseFail = (res: Response, message: string = messageApi.CODE_FAIL, data = null) => {
  respond(res, codeApi.CODE_FAIL, message, data, StatusCodes.INTERNAL_SERVER_ERROR)
}

const responseSuccess = (
  res: Response,
  code: string = codeApi.CODE_OK,
  message: string = messageApi.CODE_OK,
  data = null
) => {
  respond(res, code, message, data, StatusCodes.OK)
}

const responseApi = {
  respond: respond,
  responseFail: responseFail,
  responseSuccess: responseSuccess,
}
export default responseApi
