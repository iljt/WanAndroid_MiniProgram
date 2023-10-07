// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
    console.log("logs--onLoad--")
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },
   /**
   *  生命周期函数--监听页面显示
   */
  onShow(){
    console.log("logs--onShow--")
  },
  /**
   *  生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    console.log("logs--onReady--")
  },
    /**
    *  生命周期函数--监听页面隐藏
    */
  onHide(){
    console.log("logs--onHide--")
  },
   /**
   *-监听用户下拉动作
   */
  onPullDownRefresh(){
    console.log("logs--onPullDownRefresh--");
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(){
    console.log("logs--onReachBottom--");
  },
})
