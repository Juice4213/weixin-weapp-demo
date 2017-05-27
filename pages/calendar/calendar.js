// calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: true
  },

  //获取每月的1号为周几
  getFirstDayOfWeek (year,month) {
    return new Date(Date.UTC(year,month-1,1)).getDay();
  },
  calculateEmptyGrids (year,month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year,month);
    console.log('firstDayOfWeek:',firstDayOfWeek);
    let emptyGrids = [];
    if(firstDayOfWeek > 0){
      for(let i =0;i< firstDayOfWeek;i++){
        emptyGrids.push(i);
      }
      this.setData({
        hasEmptyGrid:true,
        emptyGrids,
      });
    }else {
      this.setData({
        hasEmptyGrid:false,
        emptyGrids:[],
      })
    }
  },

  getThisMonthDays (year,month) {
    return new Date(year,month,0).getDate();
  },

  calculateDays (year,month) {
    let days =[];
    const thisMonthDays = this.getThisMonthDays(year,month);
    console.log('thisMonthDays:',thisMonthDays);
    for(let i = 1;i <= thisMonthDays; i++){
      days.push(i);
    }

    this.setData({
      days
    })

  },

  getSystemInfo () {
    try {
      const res = wx.getSystemInfoSync();
      this.setData({
        scrollViewHeight:res.windowHeight * res.pixelRatio || 667
      });
    } catch (e){
      console.log('err_01:',e);
    }
  },

  handleCalendar (calendar) {
    const handle = calendar.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() +1;
    const weeks_ch = ['日','一','二','三','四','五','六'];
    console.log('当前日期：',date);
    console.log('当前年份：',cur_year);
    console.log('当前月份：',cur_month);
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year,cur_month);
    this.getSystemInfo();
    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
    })
  },

})