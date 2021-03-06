//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    items: [],
    motto: 'Hello World',
    userInfo: {},
    flag: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addnote: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../note/note'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(app.globalData.userInfo)
      wx.request({
        url: 'https://api.humanchan.me/v1/register',
        data: {
          openid: app.globalData.userInfo,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          language: userInfo.language,
          city: userInfo.city,
          province: userInfo.province,
          country: userInfo.country,
          avatarUrl: userInfo.avatarUrl
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res.data)
        }
        
      })
    })



  },
  bindscrolltoupper: function (e) {
    console.log('下拉')
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    wx.showNavigationBarLoading()
    console.log('index界面显示');

    var openid = wx.getStorageSync('openid')
    var that = this;

    if (openid) {
      console.log('已经有openid' + openid);
      wx.request({
        url: 'https://api.humanchan.me/v1/listnote',
        data: {
          uid: app.globalData.userInfo
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          wx.hideNavigationBarLoading()
          if (res.data == 0) {

            that.setData({
              items: res.data,
              flag: 1
            })



          } else {
            console.log(res.data)
            that.setData({
              items: res.data,
              flag: 0
            })

          }




        }
      })
    } else {
      console.log('走登录');
      wx.login({

        success: function (res) {
          console.log('登录成功' + res);

          if (res.code) {

            //发起网络请求
            wx.request({
              url: 'https://api.humanchan.me/v1/getopenid',
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data.data.openid);

                wx.request({
                  url: 'https://api.humanchan.me/v1/listnote',
                  data: {
                    uid: res.data.data.openid
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  success: function (res) {
                    wx.hideNavigationBarLoading()
                    if (res.data == 0) {

                      that.setData({
                        items: res.data,
                        flag: 1
                      })



                    } else {
                      console.log(res.data)
                      that.setData({
                        items: res.data,
                        flag: 0
                      })

                    }




                  }
                })
              }
            })
          } else {
            
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
   
  }
})







// function reloadIndex(){

//   wx.request({
//     url: 'https://api.humanchan.me/v1/listnote',
//     data: {
//       uid: app.globalData.userInfo
//     },
//     header: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     method: "POST",
//     success: function (res) {

//       that.setData({
//         items: res.data
//       })
//       //  console.log(that.data.items);
//     }
//   })
//     return;
// }

// module.exports = {
//   reloadIndex: reloadIndex
// }