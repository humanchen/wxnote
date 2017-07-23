//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    path: [],
    size:'width: 0px; height: 0px;'
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },
  bindViewTap: function () {
    var that =this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.setData({
           path: tempFilePaths,
          // size: 'width: 200px; height: 200px;'
        })
      }
    })
  },
  bindViewTap2: function () {
    var that = this
    wx.previewImage({
      current: this.data.path[0], // 当前显示图片的http链接
      urls: this.data.path // 需要预览的图片http链接列表
    })
  },
  bindViewTap3: function () {
    var that = this
     for (var i=0;i<this.data.path.length;i++){
     console.log(i)
      var count=0
      wx.uploadFile({
        url: 'http://192.168.73.24:7001/upload', //仅为示例，非真实的接口地址
        filePath: that.data.path[i],
        name: 'file',
        // formData: {
        //   'user': 'test'
        // },
        success: function (res) {
          var data = res.data
          //do something
          console.log(data)

          count++
          if(count==that.data.path.length)
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
        }
      })

     }
    


  }
})
