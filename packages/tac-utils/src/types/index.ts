export interface CustomError extends Error {
  code?: null | number | string,
}