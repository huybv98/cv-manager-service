import express from 'express'
import AuthController from '@src/controllers/AuthenticationController'
const router = express.Router()

const initWebRoutes = (app: express.Application) => {
  /**
   * @swagger
   * /example:
   *   get:
   *     description: Get all examples
   *     responses:
   *       200:
   *         description: Success
   */
  router.get('/example', (req, res) => {
    res.send('Hello World!')
  })
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Đăng nhập
   *     description: Đăng nhập bằng tài khoản và mật khẩu
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Địa chỉ email
   *               password:
   *                 type: string
   *                 description: Mật khẩu
   *     responses:
   *       '200':
   *         description: Đăng nhập thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: API000
   *                 message:
   *                   type: string
   *                   description: SUCCESS
   *                 body:
   *                   type: object
   *                   properties:
   *                       token:
   *                         type: string
   *                         description: JWT token
   *                       name:
   *                         type: string
   *                         description: Tên đăng nhập
   *                       email:
   *                         type: string
   *                         description: Địa chỉ email
   *       '400':
   *         description: Đăng nhập thất bại
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: API000
   *                 message:
   *                   type: string
   *                   description: Lỗi đăng nhập
   *       '500':
   *         description: Lỗi server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: API000
   *                 message:
   *                   type: string
   *                   description: Lỗi server
   * definitions:
   *   User:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   *   Error:
   *     type: object
   *     properties:
   *       message:
   *         type: string
   *       code:
   *         type: integer
   */
  router.post('/auth/login', AuthController.handleLogin)

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Đăng ký
   *     description: Register a new user
   *     tags:
   *       - Auth
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Địa chỉ email
   *               password:
   *                 type: string
   *                 description: Mật khẩu
   *               name:
   *                 type: string
   *                 description: tên đăng nhập
   *     responses:
   *       200:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: API000
   *                 message:
   *                   type: string
   *                   description: SUCCESS
   *                 body:
   *                   type: boolean
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: API000
   *                 message:
   *                   type: string
   *                   description: Lỗi đăng nhập
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 code:
   *                   type: string
   *                   description: API000
   *                 message:
   *                   type: string
   *                   description: Lỗi server
   * definitions:
   *   User:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   *   Error:
   *     type: object
   *     properties:
   *       message:
   *         type: string
   *       code:
   *         type: integer
   */
  router.post('/auth/register', AuthController.handleRegister)

  return app.use('/', router)
}

export default initWebRoutes
