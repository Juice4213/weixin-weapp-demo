// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth:180     //删除按钮宽度 单位（rpx）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面初始化， options为页面跳转所带来的参数
    this.initEleWidth();
    this.tempData();
  },

  getEleWidth (w) {
    let real = 0;
    try {
      let res = wx.getSystemInfoSync().windowWidth;
      let scale = (750/2)/(w/2);
      real = Math.floor(res/scale);
      return real;
    }catch(e){
      return false;
    }
  },

  initEleWidth () {
    let delBtnWidth = this.getEleWidth(this.data.deltnWidth);
    this.setData({
      delBtnWidth:delBtnWidth
    })
  },

  //测试临时数据
  tempData: function () {
    var list = [
      {
        txtStyle: "",
        icon: "/images/icon0.png",
        txt: "向左滑动可以删除"
      },
      {
        txtStyle: "",
        icon: "/images/icon6.png",
        txt: "微信小程序|联盟（wxapp-union.com）"
      },
      {
        txtStyle: "",
        icon: "/images/icon1.png",
        txt: "圣诞老人是爸爸，顺着烟囱往下爬，礼物塞满圣诞袜，平安糖果一大把"
      },
      {
        txtStyle: "",
        icon: "/images/icon2.png",
        txt: "圣诞到来，元旦还会远吗？在圣诞这个日子里"
      },
      {
        txtStyle: "",
        icon: "/images/icon3.png",
        txt: "圣诞节(Christmas或Cristo Messa ),译名为“基督弥撒”。"
      },
      {
        txtStyle: "",
        icon: "/images/icon4.png",
        txt: "一年一度的圣诞节即将到来,姑娘们也纷纷开始跑趴了吧!"
      },
      {
        txtStyle: "",
        icon: "/images/icon5.png",
        txt: "圣诞节(Christmas或Cristo Messa ),译名为“基督弥撒”。"
      },
      {
        txtStyle: "",
        icon: "/images/icon2.png",
        txt: "你的圣诞节礼物准备好了吗?"
      },
      {
        txtStyle: "",
        icon: "/images/icon3.png",
        txt: "一年一度的圣诞节即将到来,姑娘们也纷纷开始跑趴了吧!"
      },
      {
        txtStyle: "",
        icon: "/images/icon4.png",
        txt: "圣诞到来，元旦还会远吗？"
      },
      {
        txtStyle: "",
        icon: "/images/icon5.png",
        txt: "记下这一刻的心情"
      },

    ];

    this.setData({
      list: list
    });
  },

  //点击删除按钮事件
  delItem (e) {
    let index = e.target.dataset.index;
    let list = this.data.list;
    list.splice(index,1);
    this.setData({
      list:list  
    });
  },

  touchS (e ) {
    if(e.touches.length == 1){
      //手指移动时水平方向位置
      let moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      let disX = this.data.startX - moveX;
      let delBtnWidth = this.data.delBtnWidth;
      let txtStyle = "";
      if(disX == 0 || disX < 0){
        //如果移动距离小于等于0， 文本层位置不变
        txtStyle = "left:0px";
      }else if (disX > 0){
        //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if(disX >= delBtnWidth){
          //控制手指移动距离最大值为删除按钮的高度
          txtStyle = "left:-"+delBtnWidth+"px";
        }

        //获取手指触摸的是哪一项
        let index = e.target.dataset.index;
        let list = this.data.list;
        if(index){
          list[index].txtStyle = txtStyle;
          //更新列表的状态
          this.setData({
            list:list,
          })
        }
      }
    }
  }
})