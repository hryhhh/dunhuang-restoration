/**
 * 路径匹配器
 * @param pattern 匹配模式
 * @param path 路径
 * @returns 是否匹配
 */
export function isPathMatch(pattern: string, path: string): boolean {
  const regexPattern = pattern.replace(/\//g, '\\/').replace(/\*\*/g, '.*').replace(/\*/g, '[^\\/]*')
  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(path)
}

/**
 * 判断value字符串是否为空
 * @param value
 * @returns 是否为空
 */
export function isEmpty(value: string | null | undefined): boolean {
  return value == null || value === '' || value === undefined || value === 'undefined'
}

/**
 * 判断url是否是http或https
 * @param url
 * @returns 是否为http(s)
 */
export function isHttp(url: string): boolean {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

/**
 * 判断path是否为外链
 * @param path
 * @returns 是否为外链
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验用户名
 * @param str
 * @returns 是否为有效用户名
 */
export function validUsername(str: string): boolean {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 校验URL
 * @param url
 * @returns 是否为有效URL
 */
export function validURL(url: string): boolean {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 校验小写字母
 * @param str
 * @returns 是否全为小写
 */
export function validLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 校验大写字母
 * @param str
 * @returns 是否全为大写
 */
export function validUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 校验字母
 * @param str
 * @returns 是否全为字母
 */
export function validAlphabets(str: string): boolean {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 校验邮箱
 * @param email
 * @returns 是否为有效邮箱
 */
export function validEmail(email: string): boolean {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * 判断是否为字符串
 * @param str
 * @returns 是否为字符串
 */
export function isString(str: unknown): boolean {
  return typeof str === 'string' || str instanceof String
}

/**
 * 判断是否为数组
 * @param arg
 * @returns 是否为数组
 */
export function isArray(arg: unknown): boolean {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
