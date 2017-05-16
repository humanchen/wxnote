// note.js
// var index = require('../index/index.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



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
    // status = false
    // this.setData({ status: status })　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果

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
        content: this.data.content
      },
      complete: function (res) {
        console.log(res.data);
        // index.reloadIndex();
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
      }
    })

  },

})