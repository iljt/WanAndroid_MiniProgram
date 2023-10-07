// app.js
App({
  /**
   * 当小程序初始化完成时，会触发onLaunch方法，全局只会触发一次
   */
  onLaunch(options) {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    console.log("app--onLaunch--", options);
  },
  /**
   * 当小程序启动，或者从后台进入前台，会触发onShow方法
   * onShow:function(options) {} 相当于 onShow(options) {} 其他函数也是类似
   */
  onShow:function(options) {
    console.log("app--onShow--", options);
  },
    /**
    * 当小程序从前台进入后台，会触发 onHide
    */
  onHide(){
    console.log("app--onHide--");
  },
  /**
   * 当小程序发生脚本错误，或者api调用失败时，会触发 onError方法并带上错误信息
   */
  onError(msg){
    console.log("app--onError msg==--",msg);
  },
  globalData: {
    userInfo: null,
    needRefreshHomePage:false
  }
})
