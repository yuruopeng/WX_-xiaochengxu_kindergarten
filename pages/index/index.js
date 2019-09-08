//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 搜索框状态
    inputShowed: false,
    //显示结果view的状态
    viewShowed: false,
    // 搜索框值
    inputVal: "",
    //搜索渲染推荐数据
    list: null,
    selectAll:null
  },
  //事件处理函数
  bindViewTap: function() {
    /*1. navigateTo, redirectTo 只能打开非 tabBar 页面。
      2. switchTab 只能打开 tabBar 页面。
      3. reLaunch 可以打开任意页面。
    */
    wx.showToast(),//对勾
      wx.navigateTo({
      url: '../user/user'
    })
  },
  golog:function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    this.initSelectAll()
    // var third_Session = wx.getStorageSync('third_Session')
    // if (third_Session) {
    //   console.log("得到了cookie值，可以通过它来向服务器请求数据~~~")
    // }
  },
  //查找初始化列表
  initSelectAll:function(){
    var that = this
    wx.getStorage({
      key: 'third_Session',
      success: function (res) {
        wx.request({
          url: "http://127.0.0.1:8080/test/selectAll",
          method: 'GET',
          data: {

          },
          header: {
            'Content-type': 'application/json'
          },
          success: function (res) {
            //console.log(res.data)
            //console.log(res.header)
            //console.log(res.statusCode)
            that.setData({
              selectAll: res.data
            })
          }
        });
      }
    })
  },

  // 隐藏搜索框
  hideInput: function () {
    this.setData({
      inputVal: "",
      list:null
    });
    this.initSelectAll()
  },
  // 搜索
  searchInput: function () {
    //console.log(this.data.inputVal)
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8080/test/select",
      method: 'GET',
      data:{
        username: this.data.inputVal
      },
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        //console.log(res.header)
        //console.log(res.statusCode)
        if (res.data){
          that.setData({
            list: res.data,
            selectAll: null
          })
        }
      }
    });
  },
  // 搜索框 键盘抬起事件2
  inputTyping: function (e) {
    //console.log(e.detail.value)
    var that = this;
    if (e.detail.value == '') {
      return;
    }
    that.setData({
      inputVal: e.detail.value
    });
    // wx.request({
    //   url: "http://127.0.0.1:8080/test/selectAll",
    //   method: 'GET',
    //   header: {
    //     'Content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       list: res.data
    //     })
    //   }
    // });
  },
  // 获取选中推荐列表中的值
  btn_name: function (res) {
    //获取点击后的信息
    //console.log(res.currentTarget.dataset.index, res.currentTarget.dataset.name);
    //console.log(res.currentTarget.dataset.index, res.currentTarget.dataset.id);
    var that = this;
    var name = res.currentTarget.dataset.name;
    var id = res.currentTarget.dataset.id;
    //点击后让搜索框刷新
    that.hideInput();

    wx.navigateTo({
      url: '../kindergarten/kindergarten?id=' + id + '&name=' + name
    })

    that.setData({
      viewShowed: true,
      name: res.currentTarget.dataset.name,
      id: res.currentTarget.dataset.id
    });
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //授权后的页面刷新
    this.onShow();
  }
})
