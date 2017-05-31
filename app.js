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
      console.log('走登录');
      wx.login({
        
        success: function (res) {
          console.log('登录成功'+res.code);

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
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userin2) {
      typeof cb == "function" && cb(this.globalData.userin2)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userin2 = res.userInfo
              typeof cb == "function" && cb(that.globalData.userin2)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userin2:null
  }
})