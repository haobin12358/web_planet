import wx from 'weixin-js-sdk';
import axios from 'axios';
import api from '../../api/api';
import {Toast} from 'mint-ui';
const wxApi = {
  /**
   * [isweixin 判断是否微信浏览器]
   */
  isweixin () {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      this.$router.push({path: '/wxkj/isnotWechat'});
      return false
    }
  },
  isWxAuth () {
    let localUid = localStorage.getItem('localUid');
    let localToken = localStorage.getItem('localToken');
    if (!localToken) {
      let token = this.$route.query.token;
      let uid = this.$route.query.uid;
      if (token) {
        localStorage.setItem('localToken', token);
        localStorage.setItem('localUid', uid)
      } else {
        // 将url编码后传给后端，解决微信过滤Vue hash模式 #被过滤的问题
        var u = encodeURIComponent(window.location.href);
        window.location.href = hostName + '/wxpl/oauth?forwardUrl=' + u
      }
    }
  },
  wxRegister (callback) {
    axios.get(api.get_wxconfig, { params: { url: window.location.href }}).then((res) => {
      if(res.data.status == 200) {
        wx.config({
          debug: false,
          appId: res.data.data.appId,
          timestamp: Number(res.data.data.timestamp),
          nonceStr: res.data.data.noncestr,
          signature: res.data.data.sign,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline',
            'previewImage', 'downloadImage']
        });
      }
    }).catch((error) => {
      console.log(error ,'1111')
    });
    wx.ready(function() {
      /*wx.updateAppMessageShareData({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success () {
          // 设置成功
        }
      });
      wx.updateTimelineShareData({
        title: '', // 分享标题
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 设置成功
        }
      });*/
    });
  },
  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
  onMenuShareAppMessage(options) {
    console.log(options);
    wx.onMenuShareAppMessage({
      title: options.title, // 分享标题
      desc: options.desc, // 分享描述
      link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: options.imgUrl, // 分享图标
      // type: options.type, // 分享类型,music、video或link，不填默认为link
      // dataUrl: options.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
      success () {
        console.log('分享成功');
      }
    });
  },
  // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
  onMenuShareTimeline(options) {
    wx.onMenuShareTimeline({
      title: options.title, // 分享标题
      link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: options.imgUrl, // 分享图标
      success () {
        console.log('分享成功');
      }
    });
  },
  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  updateTimelineShareData(options) {
    wx.updateTimelineShareData({
      title: 'title', // 分享标题
      link: 'link', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'imgUrl', // 分享图标
      success () {
        console.log('分享成功');
      }
    });
  },
  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  updateAppMessageShareData(options) {
    // console.log(options);
    wx.updateAppMessageShareData({
      title: options.title, // 分享标题
      desc: options.desc, // 分享描述
      link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: options.imgUrl, // 分享图标
      success () {
        console.log('分享成功');
      }
    });
  },
  // 预览图片
  previewImage(options) {
    wx.previewImage({
      current: options.current, // 当前显示图片的http链接
      urls: options.urls, // 需要预览的图片http链接列表
      success() {
        console.log("success", options);
      },
      failed() {
        console.log("failed", options);
      }
    });
  }

};
export default wxApi
