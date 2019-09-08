//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // wx.getStorage({
        //   key: 'third_Session',
        //   success: function(res) {
        //     console.log("third_Session:----" + res.data)
        //   },
        // })
        var third_Session = wx.getStorageSync('third_Session')
        console.log(res)
        console.log("到后台换取 openId, sessionKey, unionId=====" + res.code)
        console.log("得到了cookie值，可以通过它来向服务器请求数据~~~" + third_Session)
        if (third_Session){
          console.log("得到了cookie值，可以通过它来向服务器请求数据~~~" + third_Session)
        }else{
          //发送 res.code 到后台换取 openId, sessionKey, unionId
          //console.log("到后台换取 openId, sessionKey, unionId=====" + res.code)
          if (res.code) {
            wx.request({
              url: 'http://127.0.0.1:8080/login/loginByCode',
              method: 'POST',
              data: {
                code: res.code
              },
              header: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data.token)
                wx.setStorage({
                  key: "third_Session",
                  data: res.data.token
                })
              },
              fail: function (res) {

              }
            })
          } else {
            console.log('获取code失败' + res.errMsg)
          }
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        //getSetting:ok
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              var third_Session = wx.getStorageSync('third_Session')
              // 可以将 res 发送给后台解码出 unionId
              //console.log(res)
              console.log("getUserInfo"+third_Session)
              this.globalData.userInfo = res.userInfo
              wx.request({
                url: 'http://127.0.0.1:8080/login/loginAndAddUserInfo',
                method: 'POST',
                data: {
                  res: JSON.stringify(res),
                  thirdSession: third_Session
                },
                header: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res)
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              //wx.clearStorage()
            }
          })
        }
      }
    })
  },
  //全局变量
  globalData: {
    userInfo: null,
    login_state: false
  }
})