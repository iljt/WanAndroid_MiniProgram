// pages/about/about.js
const api = require("../../api/api.js");
Page({

   /**
    * 页面的初始数据
    */
   data: {
      collectList: [],
      originid: 0,
      curPage: 0,
      hasMore: false,
      emptyContent:""
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      this.requestCollectList();
   },
   bindLongClick:function(event){
     console.log(" bindLongClick "," event= "+event);
     var that = this;
     wx.showModal({
      title: '是否取消收藏?',
      content: event.currentTarget.dataset.title,
      confirmColor: "#4CAF50",
      showCancel: true,
      success: function(result) {
        //点击了确认按钮
        if(result.confirm){
          console.log(" showModal "," originId= "+event.currentTarget.dataset.originid);
          //data-originId 对应的originid注意小写，否则undefine
         that.uncollect(event.currentTarget.dataset.id,event.currentTarget.dataset.originid);
        }else if(result.cancel){

        }
      }
   });
   }, 
   uncollect:function(id,originid){
    var params = new Object();
    params.originId = originid;
    console.log(" uncollect "," params "+params);
    api.uncollect(id,params).then(result =>{
      console.log(" uncollect "," result= "+result.data);
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success',
        duration: 1000
     });
     //提示首页刷新文章列表
     getApp().globalData.needRefreshHomePage = true;
     //从列表中删除该id所在item
     let collectList =this.data.collectList;
     let index = collectList.findIndex(item => item.id === id);
     if(index!=-1){
      collectList.splice(index,1)
     }
     this.setData({
      collectList: collectList,
    });
    if(collectList.length==0){
      this.setData({
        emptyContent: ' 还没收藏哦，赶紧去收藏吧！',
     });
    }

    });
  },
  requestCollectList:function(){
    console.log(" requestCollectList ");
    let curPage = this.data.curPage;
    api.collectList(curPage).then(result =>{
      console.log(" requestCollectList "," result= "+result.data);
      var lastArr = this.data.curPage == 0 ? [] : this.data.collectList;
      if(result.data.datas.length < result.data.size){
        if(result.data.datas.length==0){
          this.setData({
            emptyContent: ' 还没收藏哦，赶紧去收藏吧！',
         });
        }
        this.setData({
          collectList: lastArr.concat(result.data.datas),
          hasMore: false,
       });
      }else{
        this.setData({
          collectList: lastArr.concat(result.data.datas),
          hasMore: true,
          curPage: this.data.curPage + 1
       });
      }
    });
  }, 
 
  itemClick: function(e) {
    console.log("itemClick",e)
    wx.navigateTo({
       url: "/pages/web/web?url=" + e.currentTarget.dataset.url 
    })
 },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {
    //重置分页
      this.setData({
        curPage: 0,
      });
     //重新加载一次
     this.onLoad()
     //停止下拉刷新
     wx.stopPullDownRefresh()
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
       if(this.data.hasMore){
        this.requestCollectList();
       }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {
       
   }
})