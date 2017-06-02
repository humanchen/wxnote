// note.js
// var index = require('../index/index.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nid:'',
    title: '',
    content: '',
    userInfo: {},
    needupdate : 1,//更新标记
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.title==undefined){
       options.title='';
       this.data.needupdate=0;
       console.log('更新吗' + this.data.needupdate)

    }

    if (options.content == undefined)
      options.content = '';

      this.setData({
        nid:options._id,
        title: options.title,
        content:options.content
      })
     
    console.log(this.data);

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
     
      title: this.data.title,
      content: this.data.content
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  bindTitle: function (e) {
    // console.log(e);
    this.setData({
      title: e.detail.value
    })
  },

  bindContent: function (e) {
     console.log(e);
    this.setData({
      content: e.detail.value
    })
  },

  primary: function (event) {
   
    //提交日记
    console.log(this.data);
    console.log('onLoad2' + app.globalData.userInfo);
    if(this.data.title==''){
      wx.showModal({
        title: '别忘了标题哦么么哒~😘',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }

    if(this.data.needupdate == 0){
      //提交新日记
      wx.request({
        url: "https://api.humanchan.me/v1/addnote",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" },  
        data: {
          uid: app.globalData.userInfo,
          title: this.data.title,
          content: this.data.content,
          nickName:this.data.userInfo.nickName,
          gender: this.data.userInfo.gender,
          language: this.data.userInfo.language,
          city: this.data.userInfo.city,
          province: this.data.userInfo.province,
          country: this.data.userInfo.country,
          avatarUrl: this.data.userInfo.avatarUrl,
          time: getNowFormatDate()
        },
        complete: function (res) {
          console.log(res.data);
          
          wx.navigateBack();
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
        }
      })
    
    }else{
      console.log('更新日记' + this.data.nid);

      wx.request({
        url: "https://api.humanchan.me/v1/updatenote",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" },  
        data: {
          _id: this.data.nid,
          title: this.data.title,
          content: this.data.content,
        },
        complete: function (res) {
          console.log(res.data);
          wx.navigateBack();
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
        }
      })
    }




  },

})

//获取格式化时间
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (minute >= 0 && minute <= 9) {
    minute = "0" + minute;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }

  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + hour + seperator2 + minute
    + seperator2 + second;
  return currentdate;

}