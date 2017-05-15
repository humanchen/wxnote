//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var openid = wx.getStorageSync('openid')
    var that = this;
    
    if (openid) {
      console.log('已经有openid'+openid);
      that.globalData.userInfo = openid;
    }else{
      wx.login({
        success: function (res) {


          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.humanchan.me/v1/getopenid',
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data.data.openid);
                wx.setStorageSync('openid', res.data.data.openid )
                that.globalData.userInfo = res.data.data.openid;
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})