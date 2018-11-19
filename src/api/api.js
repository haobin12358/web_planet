
// const title = 'http://10.0.0.119:7443';
// const title = 'http://120.79.182.43:7443';
const title = 'https://planet.daaiti.cn/api/v1';

const api={
  login: title + '/user/login',//用户登录
  wx_login:title + '/user/wx_login',//微信登录
  get_accesstoken : title + '/user/get_accesstoken',
  get_config: title + '/user/get_wx_config',//
  get_inforcode: title + '/user/get_inforcode',//获取验证码

  category_list: title + '/category/list',//获取分类-装备首页商品列表页
  product_get: title +'/product/get',//获取单条商品-商品详情
  product_list: title +'/product/list',//获取商品列表
  brand_list: title +'/brand/list',//获取商品列表
  search_history: title + '/product/search_history',//用户搜索记录
  guess_search: title + '/product/guess_search',//推荐
  del_search_history: title + '/product/del_search_history',//删除搜索记录

  cart_create: title + '/cart/create',//添加购物车
  cart_update: title +'/cart/update',//更新购物车
  cart_list: title + '/cart/list',//购物车列表
  cart_destroy: title + '/cart/destroy',//清空购物车
  order_create: title + '/order/create',//创建订单
  order_list: title + '/order/list',//获取订单列表
  order_pay: title + '/order/pay',//订单支付
  order_get: title + '/order/get',//订单详情
  refund_create: title +'/refund/create',//申请退款
  order_count: title + '/order/count',//订单数量

  items_list: title + '/items/list',//获取标签列表
  scene_list: title + '/scene/list',//获取场景列表
  list_banner_index: title + '/index/list_banner',//获取首页轮播图
  list_brand_index: title + '/index/list_brand',//获取首页品牌
  list_product_index: title +'/index/list_product',//获取首页显示的品牌商品
  brand_recommend_index : title + '/index/brand_recommend',//获取首页品牌模块数据

  get_home : title + '/user/get_home',                            // 获取用户个人信息
  upgrade_agent : title + '/user/upgrade_agent',                  // 店主申请
  check_idcode : title + '/user/check_idcode',                    // 实名认证 - 身份证
  get_identifyinginfo : title + '/user/get_identifyinginfo',      // 获取个人身份证详情
  update_user : title + '/user/update_user',                      // 更新用户信息
  get_user_integral : title + '/user/get_user_integral',          // 获取积分列表
  user_sign_in : title + '/user/user_sign_in',                    // 用户签到

  get_all_news: title + '/news/get_all_news',//获取资讯列表
  get_news_content: title +'/news/get_news_content',//获取资讯详情
  list_with_group: title + '/brand/list_with_group',//获取品牌列表
  get_one_brand: title + '/brand/get',//获取一个品牌

  add_address: title + '/user/add_address',           // 添加用户收货地址
  get_all_address: title + '/user/get_all_address',   // 获取用户所有地址
  get_one_address: title + '/user/get_one_address',   // 获取单条地址记录
  update_address: title + '/user/update_address',     // 修改用户收货地址
  get_provinces: title + '/address/get_provinces',    // 获取所有省份
  get_citys: title + '/address/get_citys',            // 获取省份下城市
  get_areas: title + '/address/get_areas',            // 获取城市下的区县

  list_coupon: title + '/coupon/list',//获取下单优惠券
};

export default api
