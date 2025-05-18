import CryptoJS from 'crypto-js'

// 加密密钥
const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || 'default-key-123456'

/**
 * AES 加密
 * @param text 需要加密的文本
 * @returns 加密后的字符串
 * 使用 AES 算法对输入的文本进行加密
 */
export function encrypt(text: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY)
  return encrypted.toString()
}

/**
 * AES 解密
 * @param cipherText 加密的密文
 * @returns 解密后的原文
 * 使用 AES 算法对输入的密文进行解密
 */
export function decrypt(cipherText: string): string {
  const decrypted = CryptoJS.AES.decrypt(cipherText, SECRET_KEY)
  return decrypted.toString(CryptoJS.enc.Utf8)
}

/**
 * MD5 哈希(用于不可逆加密，如密码存储)
 * @param text 需要哈希的文本
 * @returns MD5 哈希值
 * 对输入的文本进行 MD5 哈希处理，常用于密码存储等不可逆加密场景
 */
export function md5(text: string): string {
  return CryptoJS.MD5(text).toString()
}

/**
 * Base64 编码
 * @param text 需要编码的文本
 * @returns Base64 编码后的字符串
 * 对输入的文本进行 Base64 编码
 */
export function encodeBase64(text: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}

/**
 * Base64 解码
 * @param base64Text Base64 编码的字符串
 * @returns 解码后的原文
 * 对输入的 Base64 编码字符串进行解码
 */
export function decodeBase64(base64Text: string): string {
  return CryptoJS.enc.Base64.parse(base64Text).toString(CryptoJS.enc.Utf8)
}
