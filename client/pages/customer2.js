// pages/customer2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    cardInfoList: [{
      cardUrl: 'http://dev.wemart.cn/console/images/card/card3.png',
      cardInfo: {
        cardTitle: '你不知道的花事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }, {
      cardUrl: 'http://dev.wemart.cn/console/images/card/card2.png',
      cardInfo: {
        cardTitle: '你不知道的花事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }, {
      cardUrl: 'http://dev.wemart.cn/console/images/card/card1.png',
      cardInfo: {
        cardTitle: '你不知道的花事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }]
  },
  slidethis:function(){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(0).translateX(500).step();
    this.animation.translateY(0).translateX(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 900);
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
  
  }
})