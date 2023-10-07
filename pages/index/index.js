// index.js
// 获取应用实例
const app = getApp()
const api = require('../../api/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'xxxxxxxxxx',
    imageUrls: [],
    bannerosition: 0,
    swiperHeight: 0,
    swiperWidth: 0,

    articleList:{
      datas: [],
      curPage: 0,//当前页
      pageCount: 0,//总页数
    },
    scrollDuration: 500,
  },
  onSearchClick(event){
    console.log(event)
    wx.navigateTo({
      url: '../search/search',
    })
  },
  bindClick(event){
    console.log(this.data.motto)
  },
  //banner点击
  swiperItemClick(event) {
    console.log(event)
     // 获取点击的swiper-item的data-url属性值
    const url = event.currentTarget.dataset.url;
    // 获取点击的swiper-item的data-title属性值
    const title = event.currentTarget.dataset.title;
    console.log('url== ' + url, '  title== ', title);
    wx.navigateTo({
    //  url:"/pages/web/web?url=" + url + "&title=" + title, // 使用后台返回的item.url进行页面跳转
      url:"/pages/web/web?url=" + url , // 使用后台返回的item.url进行页面跳转
    });
  },
  /**
   * 生命周期函数，监听页面加载
   */
  onLoad(options) {
    console.log("index--onLoad--",options);
    var that = this;
    wx.getSystemInfo({
      success:function(result){
        that.setData({
          swiperWidth: result.screenWidth,
          swiperHeight: result.screenWidth/2
        });
      }
    });
    //获取首页banner
    this.requestBanner();
    //获取文章列表
    this.requestArticleList();
  },
  requestBanner: function() {
    // 使用 => 后不用使用 var that = this; function()函数需要
    api.banner().then(result =>{
      console.log(result);
      this.setData({
        imageUrls: result.data
      });
    }).catch(e =>{
      console.log(e);
    }
    );
  },
  requestArticleList: function() {
    let curPage = this.data.articleList.curPage;
    api.articleList(curPage).then(result =>{
      console.log(result);
      this.data.articleList.datas.push(...result.data.datas);
      this.data.articleList.curPage = result.data.curPage;
      this.data.articleList.pageCount = result.data.pageCount;
      this.setData({
        articleList: this.data.articleList
      });
      wx.stopPullDownRefresh();
    });
  },
  /**
   *  生命周期函数--监听页面显示
   */
  onShow(){
    console.log("index--onShow--")
    //收藏页取消收藏后刷新页面
    if(getApp().globalData.needRefreshHomePage == true){
      getApp().globalData.needRefreshHomePage = false;
      this.onPullDownRefresh();
    }
  },
  /**
   *  生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    console.log("index--onReady--")
  },
    /**
    *  生命周期函数--监听页面隐藏
    */
  onHide(){
    console.log("index--onHide--")
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("index--onUnload--");
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(){
   console.log("index--onShareAppMessage--");
  },
  /**
  *-监听用户下拉动作
  */
 onPullDownRefresh(){
   console.log("index--onPullDownRefresh--");
   this.data.articleList={
    datas: [],
    curPage: 0,
    pageCount: 0,
   };
   this.requestBanner();
   this.requestArticleList();
 },
 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom(){
   console.log("index--onReachBottom--");
   if(this.data.articleList.curPage < this.data.articleList.pageCount){
    this.requestArticleList();
  }
 },
})
