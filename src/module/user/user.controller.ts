// req and res manage

import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body

    const result = await userService.createUser(payload)

    // res.json({
    //   status: true,
    //   message: 'User created successfully',
    //   data: result,
    // })

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
    // res.json({
    //   status: false,
    //   message: 'Something went wrong',
    //   error,
    // })
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getUser()

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Users getting successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params)
    const userId = req.params.userId

    const result = await userService.getSingleUser(userId)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Users getting successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    const body = req.body
    const result = await userService.updateUser(userId, body)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    await userService.deleteUser(userId)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User deleted successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}