import setting from 'src/setting.json';
const NODE_ENV = process.env.NODE_ENV;
const development = NODE_ENV === 'development';
const path = development ? '' : setting.publicPath;
export const myIcons: { [key: string]: string } = {
  'app:developer': `${path}route-svg/developer.svg`,
  'app:developer-active': `${path}route-svg/developer-active.svg`,
  'app:esim': `${path}route-svg/esim.svg`,
  'app:esim-active': `${path}route-svg/esim-active.svg`,
  'app:organization': `${path}route-svg/organization.svg`,
  'app:organization-active': `${path}route-svg/organization-active.svg`,
  'app:record': `${path}route-svg/record.svg`,
  'app:record-active': `${path}route-svg/record-active.svg`,
  'app:navigation-arrow-left': `${path}svg/navigation-arrow-left.svg`,
  'app:navigation-arrow-right': `${path}svg/navigation-arrow-right.svg`,
  'app:navigation-close': `${path}svg/navigation-close.svg`,
  'app:my-checked': `${path}svg/my-checked.svg`,
  'app:topbar-arrow-bottom': `${path}svg/topbar-arrow-bottom.svg`,
  'app:banner-info': `${path}svg/banner-info.svg`,
  'app:text-to-input-close': `${path}svg/text-to-input-close.svg`,
  'app:text-to-input-confirm': `${path}svg/text-to-input-confirm.svg`,
  'app:collapse': `${path}svg/collapse.svg`,
  'app:expand': `${path}svg/expand.svg`,
  'app:dropdown': `${path}svg/dropdown.svg`,
  'app:upload': `${path}svg/upload.svg`,
  'app:complete': `${path}svg/complete.svg`,
  'app:countdown': `${path}svg/countdown.svg`,
  'app:clear': `${path}svg/clear.svg`,
  'app:add': `${path}svg/add.svg`,
  'app:delete': `${path}svg/delete.svg`,
  'app:speaker': `${path}svg/speaker.svg`,
};
