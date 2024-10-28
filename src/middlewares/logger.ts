import { routeLogger } from "../lib/loggerHandler.ts"

export async function logger(err, req, res, next) {
  try {
    routeLogger.error(err)
    next(err)
  } catch (error) {
    next(error)
  }
}