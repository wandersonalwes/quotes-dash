export const paramString = (param: string | string[]) => {
  return Array.isArray(param) ? param[0] : param
}
