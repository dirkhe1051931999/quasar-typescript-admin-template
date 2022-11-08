import Cookies from 'js-cookie';
import setting from 'src/setting.json';
const infiniteTime = new Date(new Date().getTime() + 999999999 * 60 * 1000);
const config = {
  path: '/',
  expires: infiniteTime,
};
// lang
const languageKey = `${setting.title}Jalen_Brunson`;
export const getLanguage = () => Cookies.get(languageKey) ?? '';
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, String(language), config);
