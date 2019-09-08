// pages/uploadVerification/uploadVerification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false,
    warn: ""
  },

  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {username, password, phone} = e.detail.value;
    if (!username || !password) {
      that.setData({
        warn: "账号或密码为空！",
        isSubmit: true
      })
      return;
    }
    that.setData({
      warn: "  ",
      isSubmit: true,
      username,
      password,
      phone
    })
    wx.request({
      url: "http://127.0.0.1:8080/login/verificationUser",
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200){
          console.log("200")
          wx.navigateTo({
            url: '../logs/logs'
          })
        } else if (res.data.code == 201){
          console.log("201")
          that.setData({
            warn: "账号密码有无！！！",
            isSubmit: true
          })
        }
      }
    });
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