// pages/treeDetail/treeDetail.js
var api = require('../../api/api.js');

Page({

   /**
    * 页面的初始数据
    */
   data: {
      active: 0,

      articleList: [],
      cid: 0,

      curPage: 0,
      hasMore: true,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      console.log(options)
      this.setData({
         cid: options.cid,
      })
      wx.setNavigationBarTitle({
         title: options.title
      })
      this.getArticleList()
   },


   getArticleList: function() {
      var that = this;
      var params = new Object();
      //   params.account = e.detail.value.username,
      api.treeArticle(that.data.curPage,that.data.cid,params).then(result =>{
        console.log(result.data)
        var lastArr = that.data.curPage == 0 ? [] : that.data.articleList;
        if (result.data.datas.length < result.data.size) {
           that.setData({
              articleList: lastArr.concat(result.data.datas),
              hasMore: false
           });
        } else {
           that.setData({
              articleList: lastArr.concat(result.data.datas),
              hasMore: true,
           });
        }
      });
   },

   itemClick: function(e) {
      console.log(e)
      wx.navigateTo({
         url: "/pages/web/web?url=" + e.currentTarget.dataset.link + "&title=" + e.currentTarget.dataset.title
      })
   },

   catchCollect: function(e) {
      console.log("catchCollect=",e)
      let id = e.currentTarget.dataset.id
      let collect = e.currentTarget.dataset.collect;
      let userInfo =wx.getStorageSync('userInfo');
      if(!userInfo){
        wx.showModal({
          title: '提示',
          content: "请先登录",
          confirmColor: "#4CAF50",
          showCancel: false,
          success: function(res) {
             wx.navigateTo({
                url: '../login/login'
             })
          }
       });
       return;
      }
      if (collect){
        this.doUnCollect(id,collect);
      }else{
        this.doCollect(id,collect);
      }
      // 局部更新 src 的值，可以像下面这样更新 src 属性
        let newSrc = collect ? '../../images/ic_collect.png':'../../images/ic_collect_d.png';
        // 更新数据源中的 collect 和 src
        let articleList = this.data.articleList;
        let index = articleList.findIndex(item => item.id === id);
        if (index !== -1) {
          articleList[index].collect = !collect;
          articleList[index].src = newSrc;
          // 触发页面数据更新
          this.setData({
            articleList: articleList
          });
         }
         //提示首页刷新文章列表
        getApp().globalData.needRefreshHomePage = true;
   },

   doCollect: function(id,collect) {
      api.collect(id).then(result=>{
        console.log(result)
           wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
           });
      });
   },

   doUnCollect: function(id,collect) {
    api.articleUncollect(id).then(result=>{
      console.log(result)
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success',
        duration: 1000
     });
    });

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

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      if (this.data.hasMore) {
         this.setData({
            curPage: this.data.curPage + 1,
         });
         this.getArticleList()
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})