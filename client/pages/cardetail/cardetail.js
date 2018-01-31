// pages/cardetail/cardetail.js
var config=require('../../utils/config/config.js');
var configUrl=require('../../utils/config/configUrl.js');
var WxParse=require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'',
    id:'',
    freshFlag:false,
    firstFlag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(that.data.firstFlag){
      var id=options.carId;
      console.log(id);
      that.setData({
        id:id,
        firstFlag:false
      })
    }

  var id=that.data.id;

  wx.request({
    url: configUrl.httpsUrl +'/VicmobMINA/minaAPI/carAPI/mabCardetail/getDetail',
    data:{
      minaId:config.minaId,
      appId:config.appId,
      carId:id
    },
    method:'post',
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    success:function(res){
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      console.log(res.data);
      if (res.data.detail){
        WxParse.wxParse('detail', 'html', res.data.detail.replace(/<\/?script>/g, ''), that, 5)
      }
      that.setData({
        result:res.data
      })
      wx.hideLoading();
      if (that.data.freshFlag) {
        wx.showToast({
          title: '刷新成功',
        })
        that.setData({
          freshFlag:false,
        })
      }
    },
    fail:function(res){
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    }
  })


  },
  /**预约看馆 */
  consultt(e) {
    console.log('-----------------------电话咨询------------------')
    wx.navigateTo({
      url: '../mvpAppointment/mvpAppointment?carId='+this.data.id,
    })
  },
  consulto(e) {
    console.log('-----------------------预约试驾------------------')
    wx.navigateTo({
      url: '../mvpAppointment/mvpAppointment?carId=' + this.data.id,
    })
  },
  consolesearch(event){
    console.log('搜索')
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
    console.log('下拉事件');
    var that=this;
    WxParse.wxParse('detail', 'html', '', that, 5);
    this.setData({
      result: '',
      freshFlag: true
    })
    this.onLoad();
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