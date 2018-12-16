import {  logout, getInfo } from 'src/api/login'
import { getToken, setToken, removeToken } from 'src/utils/auth'
import {login,supplizerLogin} from 'src/service/index'
import Cookies from 'js-cookie'


const user = {
  state: {
    userInfo: {},
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    INIT_USER_INFO:(state)=>{
      let saveUserInfo = Cookies.get('User-Info');

      if (saveUserInfo){
        state.userInfo = JSON.parse(saveUserInfo);
        state.roles = [state.userInfo.level]
      }
    }
  },

  actions: {
    //  登录,整合下供应商和管理员的,字段也统一下
    //  role: supplizer,admin,super(在router的beforeEach中拿缓存的,避免刷新)
    //  router中配置好role
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        if(userInfo.userType == 1){ //  管理员
          login(userInfo.username, userInfo.password).then(response => {
            if(response.data.status == 200){
              let resData = response.data,
                data = resData.data;

              setToken(data.token)
              commit('SET_TOKEN', data.token)

              let cookieUserInfo = {
                username: data.admin.adname,
                personName: '',
                avatar: data.admin.adheader,
                level: data.admin.adlevel == '超级管理员'?'super':'admin'
              }
              Cookies.set('User-Info',cookieUserInfo)
              commit('SET_USER_INFO', cookieUserInfo)
              resolve()
            }else{
              reject();
            }
          }).catch(error => {
            reject(error)
          })
        }else{  //  供应商
          supplizerLogin(userInfo.username, userInfo.password).then(response => {
            if(response.data.status == 200){
              let resData = response.data,
                data = resData.data;

              setToken(data.token)
              commit('SET_TOKEN', data.token)

              let cookieUserInfo = {
                username: data.supplizer.sulinkphone,
                personName: data.supplizer.suname,
                avatar: data.supplizer.suheader,
                level: 'supplizer'
              }
              Cookies.set('User-Info',cookieUserInfo)
              commit('SET_USER_INFO', cookieUserInfo)
              resolve()
            }else{
              reject();
            }
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
