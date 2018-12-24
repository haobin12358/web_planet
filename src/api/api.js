const title = 'https://planet.daaiti.cn/api/v1/'

const api = {
  login: title + 'user/admin_login',                                      // 用户登录
  add_admin_by_superadmin: title + 'user/add_admin_by_superadmin',        // 添加管理员
  update_admin: title + 'user/update_admin',                              // 更新管理员信息
  get_admin_list: title + 'user/get_admin_list',                          // 获取管理员列表
  get_admin_all_status: title + 'user/get_admin_all_status',              // 获取所有管理员的状态
  get_admin_all_type: title + 'user/get_admin_all_type',                  // 获取管理员所有的身份
  update_admin_password: title + 'user/update_admin_password',            // 管理员更新密码

  supplizer_login: title + 'user/supplizer_login',                        //供应商登录
  update_supplizer_password: title + 'supplizer/change_password',         //供应商修改密码

  product_list: title + 'product/list',                                   //获取商品列表
  product_get: title + 'product/get',                                     //获取商品详情
  off_shelves_product: title + 'product/off_shelves_list',                //批量下架商品
  delete_product: title + 'product/delete_list',                          //删除商品
  create_product: title + 'product/create',                               //添加商品
  update_product: title + 'product/update',                               //修改商品

  category_list: title + 'category/list',                                 //获取类目
  create_category: title + 'category/create',                             //新增类目
  update_category: title + 'category/update',                             //修改类目
  delete_category: title + 'category/delete',                             //删除类目

  scene_list: title + 'scene/list',                                       //获取场景
  create_scene: title + 'scene/create',                                   //新增场景
  update_scene: title + 'scene/update',                                   //编辑场景


  brand_list: title + 'brand/list',                                       //获取品牌
  create_brand: title + 'brand/create',                                   //新增品牌
  update_brand: title + 'brand/update',                                   //修改品牌
  off_shelves_brand: title + 'brand/off_shelves',                         //下架品牌


  items_list: title + 'items/list',                                       //获取标签  0: 商品, 10:资讯, 20:优惠券, 40 品牌标签
  create_items: title + 'items/create',                                   //创建标签
  update_items: title + 'items/update',                                   //修改标签


  get_order_situation: title + 'order/get_order_situation',               //获取订单概况
  get_all_order: title + 'order/list',                                    //获取所有订单
  get_order_by_LOid: title + 'order/get',                                 //获取订单详情
  order_count: title + 'order/count',                                     //获取订单数量
  get_omfilter: title + 'order/get_omfilter',                             //获取订单filter
  update_order_status: title + 'order/update_order_status',               //更新订单状态


  supplizer_list: title + 'supplizer/list',                               //供应商列表
  create_supplizer: title + 'supplizer/create',                           //新增
  update_supplizer: title + 'supplizer/update',                           //修改
  get_supplizer: title + 'supplizer/get',                                 //获取供应商



  //  审批
  agree_product: title + 'product/agree_product',                         // 同意上架商品

  get_all_qa: title + 'qa/get_all',                                       //获取所有问题
  add_questanswer: title + 'qa/add_questanswer',                          //添加问题
  add_questoutline: title + 'qa/add_questoutline',                        //添加问题类型
  delete_questoutline: title + 'qa/delete_questoutline',                  //删除问题分类
  delete_question: title + 'qa/delete_question',                          //删除问题
  upload_file: title + 'file/upload?token=',                              //上传图片


  activity_list: title + 'activity/list',                                 // 获取正在进行中的活动
  activity_update: title + 'activity/update',                             // 修改活动基础信息
  commodity_add: title + 'commodity/add',                                 // 添加试用商品

  get_all_news: title + 'news/get_all_news',                              // 获取资讯列表
  get_news_content: title + 'news/get_news_content',                      // 获取资讯详情
  create_news: title + 'news/create_news',                                // 发布资讯
  update_news: title + 'news/update_news',                                // 修改资讯
  del_news: title + 'news/del_news',                                      // 删除资讯
  coupon_list: title + 'coupon/list',                                     // 获取平台优惠券列表

  list_user_commison: title + 'user/list_user_commison',                  // 销售商列表(后台佣金)
  act_code_get_rule: title + 'act_code/get_rule',                                 // 设置激活码规则
  act_code_set_rule: title + 'act_code/rule',                                 // 设置激活码规则
};

export default api
