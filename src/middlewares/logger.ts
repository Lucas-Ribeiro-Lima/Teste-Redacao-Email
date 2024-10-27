import { loggerHandler } from '../lib/logger.ts'

export async function logger(err, req, res, next) {
  try {
    await loggerHandler(err)
  } catch (error) {
    next(error)
  }
}