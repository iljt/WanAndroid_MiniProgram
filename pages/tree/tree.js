const api = require("../../api/api.js");

// pages/tree/tree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeDataList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.requestTree();
  },
  requestTree:function(){
    api.tree().then(result =>{
     this.setData({
      treeDataList:result.data
     });
    });
  },
  bindTree:function(event){
    console.log("bindTree");
   let cid =  event.currentTarget.dataset.cid;
   wx.navigateTo({
     url: "/pages/treeDetail/treeDetail?cid=" + cid ,
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})