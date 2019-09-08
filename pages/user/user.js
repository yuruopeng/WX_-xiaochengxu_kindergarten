// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //事件处理函数
  homePage: function () {
    /*1. navigateTo, redirectTo 只能打开非 tabBar 页面。
      2. switchTab 只能打开 tabBar 页面。
      3. reLaunch 可以打开任意页面。
    */
      wx.navigateTo({
        url: '../index/index'
      })
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