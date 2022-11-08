import { request } from 'src/boot/axios';

const api = {
  login: '/api/mock-api/v1/user/login',
  getUserInfo: '/api/mock-api/v1/user/info',
  getAllUser: '/api/mock-api/v1/table',
};
export const login = (data: any) =>
  request({
    url: api.login,
    method: 'post',
    data,
  });
export const getUserInfo = (data: any) =>
  request({
    url: api.getUserInfo,
    method: 'post',
    data,
  });
export const getAllUser = (data: any) =>
  request({
    url: api.getAllUser,
    method: 'get',
  });
