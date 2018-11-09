
// const title = 'http://10.0.0.63:7443';
// const title = 'http://120.79.182.43:7443';
const title = 'https://planet.daaiti.cn/api/v1';

const api={
  login: title + '/user/login',//用户登录
  wx_login:title + '/user/wx_login',//微信登录
  get_accesstoken : title + '/user/get_accesstoken',
  get_config: title + '/user/get_wx_config',//

  category_list: title + '/category/list',//获取分类-装备首页商品列表页
  product_get: title +'/product/get',//获取单条商品-商品详情
  product_list: title +'/product/list',//获取商品列表
  brand_list: title +'/brand/list',//获取商品列表

  cart_create: title + '/cart/create',//添加购物车
  cart_update: title +'/cart/update',//更新购物车
  cart_list: title + '/cart/list',//购物车列表
  cart_destroy: title + '/cart/destroy',//清空购物车
  order_create: title + '/order/create',//创建订单
  order_list: title + '/order/list',//获取订单列表
  order_pay: title + '/order/pay',//订单支付
  order_get: title + '/order/get',//订单详情
  refund_create: title +'/refund/create',//申请退款
};

export default api
