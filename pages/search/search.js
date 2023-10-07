// pages/about/about.js
const api = require("../../api/api.js");

Page({

   /**
    * 页面的初始数据
    */
   data: {
     content:'',
     showSearchResult:false,
     searchHistoryList:[],
     hotkeyList: [],
     searchList:{
       curPage:0,
       pageCount:0,
       datas:[]
     }
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     this.requestHotkey();
     wx.getStorage({
      key: 'searchHistoryList',
      success: res => {
        this.setData({
          searchHistoryList: res.data
        });
      },
    })
   },
   requestHotkey:function(){
     api.hotkey().then(result =>{
      this.setData({
        hotkeyList:result.data
      });
     });
   },
   requestSearch:function(){
     let curPage =this.data.searchList.curPage;
     api.search(curPage,{k:this.data.content}).then(result =>{
        this.data.searchList.datas.push(...result.data.datas);
        this.data.searchList.curPage = result.curPage;
        this.data.searchList.pageCount = result.pageCount;
        if(this.data.searchList.datas.length == 0){
          wx.showToast({
            title: '没有找到相关数据',
            icon: 'none'
          })
        }
        this.setData({
          searchList: this.data.searchList,
          showSearchResult:true
        });
     });
     this.saveHistory();
   },
   saveHistory: function(){
     let searchHistoryList = this.data.searchHistoryList;
     searchHistoryList.forEach((item,index) => {
         if(item.name == this.data.content){
           // 判断如果有就删掉
          searchHistoryList.splice(index,1);
         }
     });
     let history = {};
     history.name =this.data.content;
     console.log("---history---"," history= "+history);
       // 在添加元素到数组首部
     searchHistoryList.unshift(history);
     //最多存20个历史记录
     if (searchHistoryList.length > 20) {
      searchHistoryList.splice(20, 1);
    }
    this.setData({
      searchHistoryList:searchHistoryList
    });
    wx.setStorage({
      key: 'searchHistoryList',
      data: searchHistoryList
    });
   },
   bindInput: function(event) {
      let content =event.detail.value;
      this.setData({
        content:content
      });
  }, 
  bindSearch: function(event) {
    if (this.data.content.length == 0) {
      wx.showToast({
        title: '请输入关键字',
        icon: 'none'
      });
      return;
    }
    this.setData({
      searchList: {
        curPage: 0,
        pageCount: 0,
        datas: []
      }
    });
    this.requestSearch();
  }, 
  bindDelete: function(event) {
    this.setData({
      content:''
    });
  }, 
   bindCancel: function(event) {
    this.setData({
      showSearchResult:false
    });
   },
   bindClearRecord: function(event) {
    wx.removeStorage({
      key: 'searchHistoryList',
      success:result =>{
        this.setData({
          searchHistoryList: []
        });
      }
    });
   },
   bindRecord:function(event){
     this.setData({
      content:event.detail.dataset.content,
      searchList:{
        curPage:0,
        pageCount:0,
        datas:[]
      }
     });
     this.requestSearch();
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
    if(this.data.showSearchResult){
      if(this.data.searchList.curPage < this.data.searchList.pageCount){
        this.requestSearch();
      }
    }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})