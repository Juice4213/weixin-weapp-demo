// shoppingCart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountNum:0,
    allPrice:0,
    checkAll:0,
    itemlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let shopCartApi = 'cartItem/itemCartsNewList';
    app.util.fetchApi(shopCartApi, { userId: 1025, userkey: '24c0b8bc993b0c835cb965d8899bb900'},false,res=>{
      console.log('shopcart data:',res);
      that.setData({
        accountNum: res.data.data.accountNum,
        allPrice: res.data.data.allPrice,
        checkAll: res.data.data.checkAll,
        itemlist: res.data.data.itemlist,
        })
    },err=>{
      console.log('shopcart data err :',err);
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
  
  }
})