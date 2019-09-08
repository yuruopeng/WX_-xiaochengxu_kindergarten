// pages/kindergarten/kindergarten.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    id:null,
    name:null
  },



  signup:function(){
    wx.navigateTo({
      url: '../signup/signup?id=' + this.id + '&name=' + this.name
    })
  },
  upload: function () {
    wx.navigateTo({
      url: '../Verification/uploadVerification'
    })
  },
  userCenter: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    console.log(options.name);
    this.id = options.id;
    this.name = options.name;
    this.initSelect(options);
  },

  //查找初始化列表
  initSelect: function (e) {
    var that = this
    wx.request({
      url: "http://127.0.0.1:8080/test/select",
      method: 'GET',
      data: {
        id: e.id
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        //console.log(res.header)
        //console.log(res.statusCode)
        that.setData({
          select: res.data
        })
      }
    });
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