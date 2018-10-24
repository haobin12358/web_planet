
// const title = 'http://10.0.0.63:7443';
// const title = 'http://120.79.182.43:7443';
const title = 'https://weidian.daaiti.cn';

const api={
  login: title + '/user/login',//用户登录
  wx_login:title + '/user/wx_login',//微信登录
  get_accesstoken : title + '/user/get_accesstoken',
  get_config: title + '/user/get_wx_config',//
};

export default api
