//index.js
var config = require('../../utils/config/config.js');
var configUrl = require('../../utils/config/configUrl.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
      result:[],
      slides:['',''],
      id: '',
      freshFlag: false,
      firstFlag: true,
      inputValue:'',
      pageNo: 1,
      pageSize: 10,
      moreflag:true,
      resultex:true
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      var that = this;
      

      wx.request({
        url: configUrl.httpsUrl + '/VicmobMINA/minaAPI/carAPI/mabCardetail/getSlides',
        data: {
          minaId: config.minaId,
          appId: config.appId,
          inputValue:''
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          console.log(res.data);
        
          that.setData({
            slides: res.data
          })
          wx.hideLoading();
          if (that.data.freshFlag) {
            wx.showToast({
              title: '刷新成功',
            })
          }
        },
        fail: function (res) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
        }
      })
      this.searchCarinfo();
    },
    consultt(e) {
      //跳转幻灯片
      wx.navigateTo({
        url: '../mvpAppointment/mvpAppointment?carId=' + this.data.id,
      })
    },
    consultdetail(e){
      var carId = e.currentTarget.dataset.id;
      //跳转汽车详情
      wx.navigateTo({
        url: '../cardetail/cardetail?carId=' + carId,
      })
    },
    searchCarinfo:function(){
      var that=this;
      //查询页面
      wx.request({
        url: configUrl.httpsUrl + '/VicmobMINA/minaAPI/carAPI/mabCardetail/getCars',
        data: {
          minaId: config.minaId,
          appId: config.appId,
          pageNo: that.data.pageNo,
          pageSize: that.data.pageSize,
          inputValue: that.data.inputValue
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          console.log(res.data);
          if (!that.data.moreflag){
            return;
          }
          if (res.data.totalPage > that.data.pageNo){
            var pagenum=that.data.pageNo+1;
            that.setData({
              result: that.data.result.concat(res.data.list),
              pageNo:pagenum
            })
          }else{
            that.setData({
              result: that.data.result.concat(res.data.list),
              moreflag:false
            })
          }
          if (that.data.firstFlag) {
            that.setData({
              firstFlag: false
            })
            if (res.data.count <= 0) {
              that.setData({
                resultex: false
              })
            }
          }
         
         
        },
        fail: function (res) {
         
        }
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
    onsearch:function(event){
      console.log('触发查询事件');
      var content=event.detail.value;
      this.setData({
        result: [],
        freshFlag: true,
        inputValue: content,
        pageNo: 1,
        pageSize: 10,
        moreflag: true
      })
      this.searchCarinfo()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      console.log('下拉事件');
      this.setData({
        result:[],
        freshFlag: true,
        slides: [],
        inputValue: '',
        pageNo: 1,
        pageSize: 10,
        moreflag: true
      })
      this.onLoad();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(!this.data.moreflag){
          return;
        }
        this.searchCarinfo();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
