let request = (method,url,param) => new Promise((resolve,reject) => {
   // loading
    wx.showLoading({
      title: '加载中...',
        /** 是否显示透明蒙层，防止触摸穿透 */
      mask: true
    })
 
   //网络请求
   let requestUrl = 'https://www.wanandroid.com' + url;
   console.log('接口：' + requestUrl, '参数：', param);
   wx.request({
     url: requestUrl,
     method: method,
     data: param,
     header:{
      'content-type': "application/x-www-form-urlencoded",
      cookie: wx.getStorageSync("cookie")
     },    
     //网络请求成功
     success:(result) => {
      if (result.data.errorCode == 0) {
          if (url == "/user/login" || url == "/user/register") {
            wx.setStorageSync("cookie", result.header['Set-Cookie']);
          }
          console.log('接口：' + url, '参数：', param, '\n返回值：', result);
          wx.hideLoading();
          resolve(result.data);
        }else{
          wx.hideLoading();
          wx.showToast({
            title: result.data.errorMsg,
            icon: "none",
            duration: 2000
          })
          reject(result.data);
        }
     },
    //网络请求失败
     fail:function(err){
       wx.hideLoading();
       wx.showToast({
        title: 'error=== '+err.errMsg,
        icon: "none",
        duration: 2000
       })
       reject(err)
     }
   })

});

// 暴露接口
module.exports ={
  request
}
