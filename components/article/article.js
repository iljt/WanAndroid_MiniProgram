const api =require("../../api/api.js");

Component({
    /**
   * 组件的属性列表
   */
  properties: {
    articleList:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
   pageLifetimes: {
      show: function() {
        console.log("----show-----");
    }
    }
,
  /**
   * 组件的方法列表
   */
  methods:{
     bindArticle:function(event){
       let url = event.currentTarget.dataset.url;
       wx.navigateTo({
        url: '/pages/web/web?url=' + url + '&title='+ "xxx",
       });
     },
     catchCollect:function(event){
      let id = event.currentTarget.dataset.id;
      let collect = event.currentTarget.dataset.collect;
      console.log("---------点击le收藏---------"," id= "+id+ " collect= "+collect);
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
      if(collect){
        api.articleUncollect(id).then(result =>{
          console.log("----articleUncollect-----", result.data);
        });
      }else{
        api.collect(id).then(result =>{
          console.log("----collect-----", result.data);
        });
      }
      // 局部更新 src 的值，可以像下面这样更新 src 属性
    let newSrc = collect ? '/images/collect.png' : '/images/collect_selector.png';
    // 更新数据源中的 collect 和 src
    let articleList = this.data.articleList;
    let index = articleList.datas.findIndex(item => item.id === id);
    if (index !== -1) {
      articleList.datas[index].collect = !collect;
      articleList.datas[index].src = newSrc;
      // 触发页面数据更新
      this.setData({
        articleList: articleList
      });
      }
 }
}
})