export const paramNumber = (param: string | string[]) => {
  return Array.isArray(param) ? parseInt(param[0]) : parseInt(param)
}
