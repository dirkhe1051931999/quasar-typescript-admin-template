import Cookies from 'js-cookie';
import setting from 'src/setting.json';
const infiniteTime = new Date(new Date().getTime() + 999999999 * 60 * 1000);
const config = {
  path: '/',
  expires: infiniteTime,
};
// lang
const languageKey = `${setting.title}-Jalen_Brunson`;
export const getLanguage = () => Cookies.get(languageKey) ?? '';
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, String(language), config);
const sizeKey = 'size';
export const getSize = () => Cookies.get(sizeKey);
export const setSize = (size: string) => Cookies.set(sizeKey, size, config);

// User
const tokenKey = `${setting.title}-token`;
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token, config);
export const removeToken = () => Cookies.remove(tokenKey);

const usernameKey = `${setting.title}-username`;
export const getUsername = (): any => Cookies.get(usernameKey);
export const setUsername = (username: string) =>
  Cookies.set(usernameKey, username, config);
export const removeUsername = () => Cookies.remove(usernameKey);
