//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //图片轮播器
    imgUrls: [{
      id:0,
      img: "../../images/scroll/IMG_01.jpg"
    }, {
        id: 1,
      img: "../../images/scroll/IMG_02.jpg"
    }, {
        id: 2,
      img: "../../images/scroll/IMG_03.jpg"
    }
    ],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,

    //音乐播放器
    musicSrc: "http://qqma.tingge123.com:83/123/2016/10/周杰伦%20-%20告白气球.mp3",
    posterSrc: "http://d.hiphotos.baidu.com/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=abfe5f62f3f2b211f0238d1cabe90e5d/fd039245d688d43f3c52a8e3751ed21b0ef43b23.jpg",
    name:'告白气球',
    author:"周杰伦",

    minNum:0,
    maxNum:100,
    showValue : false,
    minTime:"00:00",
    maxTime:"00:00",
    sliderValue:0,
    sliderStep:0.1,
    vertical:false,
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  audioPlay () {
    this.setData({
      action:{
        method:'play'
      }
    })
  },

  audioPause () {
    this.setData({
      action:{
        method:'pause',
      }
    })
  },

  audioPlaybackRateSpeedUp(){
    this.setData({
      action:{
        method:'setPlaybackRate',
        data:5,
      }
    })
  },

  audioPlaybackRateNormal () {
    this.setData({
      action:{
        method: 'setPlaybackRate',
        data:1
      }
    })
  },

  audioPlaybackRateSlowDown () {
    this.setData({
      action:{
        method:'setPlaybackRate',
        data:0.5
      }
    })
  },

  audioNext () {
    this.setData ({
      action:{
        method:'pause'
      }
    })
  },

  audio14 (time) {
    // this.setData({
    //   action:{
    //     method:'setCurrentTime',
    //     data: time
    //   }
    // })
    this.audioCtx.seek(time)
  },

  audioStart () {
    this.setData({
      action:{
        method:'setCurrentTime',
        data:0,
      }
    })
  },


  bindplay (e) {
    console.log('播放：：',e);
  },

  bindtimeupdate(audio) {
    // console.log('当前播放时间：', audio.detail.currentTime);
    // console.log('总时间：', audio.detail.duration);
    // 通过audio的属性秒数计算当前分钟和秒数
    let currentMin = Math.floor(audio.detail.currentTime / 60);
    var currentSec = Math.floor(audio.detail.currentTime % 60);
    // 异常处理
    if (currentSec < 10) {
      currentSec = "0" + currentSec;
    }
    if (currentMin < 10) {
      currentMin = "0" + currentMin;
    }
    // 拼接
    var currentTime = currentMin + ":" + currentSec;

    let maxMin = Math.floor(audio.detail.duration / 60);
    var maxSec = Math.floor(audio.detail.duration % 60);

    if (maxSec < 10) {
      maxSec = "0" + maxSec;
    }
    if (maxMin < 10) {
      maxMin = "0" + maxMin;
    }

    var maxTime = maxMin + ":" + maxSec;
    // 重新赋值data，然后小程序就会根据data读取数据，自动更新UI
    this.setData({
      minTime: currentTime,
      maxTime: maxTime,
      sliderValue: audio.detail.currentTime,
      maxNum: audio.detail.duration
    })
  },

  bindSliderChange (e) {
    console.log('滑动的值',e.detail.value);
    this.audio14(e.detail.value);
  },

  onReady () {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc(this.data.musicSrc);
  }
})
