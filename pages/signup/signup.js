// pages/signup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcData: "data:image/png;base64,",
    id:null,
    image:null,
    isSubmit: false,
    warn: "",
    phone: "",
    pwd: "",
    isPub: false,
    sex: "男"
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { phone, pwd, isPub, sex,username,password,openid } = e.detail.value;
    if (!phone || !pwd) {
      this.setData({
        warn: "手机号或密码为空！",
        isSubmit: true
      })
      return;
    }
    this.setData({
      warn: "",
      isSubmit: true,
      phone,
      pwd,
      isPub,
      sex,
      username,
      password,
      openid
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    console.log(options.name);
    this.data.id = options.id;
  },

  initSelect: function (e) {
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8080/test/select",
      method: 'GET',
      data: {
        id: this.data.id
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data[0].image)
        //console.log(res.header)
        //console.log(res.statusCode)
        that.setData({
          //srcData:this.srcData + res.data.image,
          //wx.arrayBufferToBase64(res.data[0].image),
          select: that.data.srcData + res.data[0].image
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
    this.initSelect(this.id);
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