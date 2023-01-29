/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}
/**
 * @description 获取本地时间
 */
export let useTime = () => {
  let year = 0; // 年份
  let month = 0; // 月份
  let week = ''; // 星期几
  let day = 0; // 天数
  let hour = <number | string>0; // 小时
  let minute = <number | string>0; // 分钟
  let second = <number | string>0; // 秒
  let nowTime = <string>''; // 当前时间

  // 更新时间
  let updateTime = () => {
    let date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    week = '日一二三四五六'.charAt(date.getDay());
    day = date.getDate();
    hour =
      String(date.getHours()).padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getHours()
      );
    minute =
      String(date.getMinutes()).padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getMinutes()
      );
    second =
      String(date.getSeconds())?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getSeconds()
      );
    nowTime = `${year}年${month}月${day} ${hour}:${minute}:${second}`;
  };

  updateTime();

  return { year, month, day, hour, minute, second, week, nowTime };
};
