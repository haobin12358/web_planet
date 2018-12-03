// const title = 'http://10.0.0.197:7443/sharp/manager/';
// const title = 'http://120.79.182.43:7443/sharp/manager/';
const title ='https://planet.daaiti.cn/api/v1/';

const api={
  login: title + 'user/admin_login',//用户登录
  get_admin_list: title + 'user/get_admin_list',//获取管理员列表
  add_admin_by_superadmin: title + 'user/add_admin_by_superadmin',//添加啊管理员
  get_admin_all_type: title + 'user/get_admin_all_type',//获取管理员身份
  update_admin: title + 'user/update_admin',//更新管理员
  update_admin_password: title + 'user/update_admin_password',//修改密码
  product_list: title + 'product/list',//获取商品列表

  get_order_situation: title + 'order/get_order_situation',//获取订单概况
  get_all_order: title + 'order/order_list',//获取所有订单
  get_order_by_LOid: title + 'order/order_abo',//获取订单详情
  get_omfilter: title + 'order/get_omfilter',//获取订单filter
  update_order_status: title + 'order/update_order_status',//更新订单状态

}

export default api
