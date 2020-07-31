/* eslint-disable */
const faker = require('faker');

const userList = [
  {
    id: 0,
    username: 'admin',
    password: '123456',
    name: 'admin',
    roles: ['admin'],
  },
  {
    id: 0,
    username: 'visitor',
    password: '123456',
    name: 'visitor',
    roles: ['visitor'],
  },
];
for (var i = 2; i < 10; i++) {
  userList.push({
    id: i,
    username: faker.random.alphaNumeric(6),
    password: faker.random.alphaNumeric(6),
    name: faker.name.findName(),
    roles: ['visitor'],
  });
}
let userInfo = [
  {
    id: 0,
    username: 'admin',
    avatar: faker.image.avatar(),
    introduction: faker.name.jobDescriptor(),
    email: faker.internet.email(),
    roles: ['admin'],
  },
  {
    id: 1,
    username: 'visitor',
    avatar: faker.image.avatar(),
    introduction: faker.name.jobDescriptor(),
    email: faker.internet.email(),
    roles: ['visitor'],
  },
];
for (var i = 2; i < 10; i++) {
  userInfo.push({
    id: i,
    username: faker.name.findName(),
    avatar: faker.image.avatar(),
    roles: faker.random.arrayElement(['visitor', 'admin']),
    introduction: faker.name.jobDescriptor(),
    email: faker.internet.email(),
  });
}
const login = ({ username, password }) => {
  let success = false;
  for (let item of userList) {
    if (username === item.username && password === item.password) {
      success = true;
      break;
    }
  }
  return new Promise((resolve, reject) => {
    resolve({ success });
  });
};
const getUserInfo = ({ username }) => {
  let cur = userInfo.find((item) => {
    return item.username === username;
  });

  let { roles, avatar, introduction, email } = cur;
  return new Promise((resolve, reject) => {
    resolve({ success: true, roles, avatar, introduction, email });
  });
};
const logOut = ({ username }) => {
  // ...
  return new Promise((resolve, reject) => {
    resolve({ success: true });
  });
};
module.exports = {
  login,
  getUserInfo,
  logOut,
};
