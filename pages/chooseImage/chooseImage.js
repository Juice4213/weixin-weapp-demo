// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '首页',
    imgSrc: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcMGgQibRJbxYibtXdodcIN0qic3dUUCOPGBwCqR425mpibWXcASIyQr8WSNDbAPxic2PXlYalZ2f8y3Q/0',
    imgSrcArr: [],
    screenHeight: '',
    screenWidth: '',
    delButton: false,
  },

  chooseImg() {
    let that = this;
    wx.chooseImage({
      count: 9,
      success: function (res) {
        console.log('图片路径：', res);
        var tempFilePaths = res.tempFilePaths
        let imgArr = that.data.imgSrcArr;
        tempFilePaths.map((item, index) => {
          imgArr.push(item);
        })

        that.setData({
          imgSrcArr: imgArr,
        }),

          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: function (res) {
              console.log('width:', res.width)
              console.log('height:', res.height)
            }
          })
      },
      fail: err => {
        console.log('choose image has a err : ', err);
      }
    })
  },


  removeImg() {
    let that = this;
    this.setData({
      delButton: !that.data.delButton,
    })
  },

  deleteImg(event) {
    console.log('event:', event);
    let imgArr = this.data.imgSrcArr;
    imgArr.splice(event.currentTarget.dataset.index, 1);
    this.setData({ imgSrcArr: imgArr })

  },

  previewImg(event) {
    console.log('event:', event);
    let that = this;
    wx.previewImage({
      current: event.currentTarget.dataset.preimg, // 当前显示图片的http链接
      urls: that.data.imgSrcArr // 需要预览的图片http链接列表
    })
  },

  
  

    
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('系统信息：', res);
        that.setData({
          screenHeight: res.screenHeight,
          screenWidth: res.screenWidth,
        })
      },
    })

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

  }
})