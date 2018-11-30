// const title = 'http://10.0.0.197:7443/sharp/manager/';
// const title = 'http://120.79.182.43:7443/sharp/manager/';
const title ='https://planet.daaiti.cn/api/v1/';

const api={
  login: title + 'user/admin_login',//用户登录
  get_order_situation: title + 'order/get_order_situation',//获取订单概况
  get_all_order: title + 'order/order_list',//获取所有订单
  get_order_by_LOid: title + 'order/order_abo',//获取订单详情
  get_omfilter: title + 'order/get_omfilter',//获取订单filter
  update_order_status: title + 'order/update_order_status',//更新订单状态

}

export default api
