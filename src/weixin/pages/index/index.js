//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    registerInfoStr:'',
    hasRegisterInfo: false,
    isTeacher:false,
    hasTest:false,
    clickTest: false,
    test:[],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  change:function(e){
    switch (e.target.id){
      case "1":
//        console.log(e.detail.value);
        app.globalData.registerInfo.userRole = e.detail.value;
        break;
      case "2":
        app.globalData.registerInfo.userNum = e.detail.value;
        break;
      case "3":
        app.globalData.registerInfo.userClass = e.detail.value;
        break;
      case "4":
        app.globalData.registerInfo.userName = e.detail.value;
        break;
    }
  },
  beginTest: function (e) {
    app.globalData.items=[];
    app.globalData.items_index = 0;
    app.globalData.items_len = 0;
    console.log('id-----'+e.target.id);
    wx.request({
      url: 'https://75502554.qcloud.la/teacher/items.php',
      data: { id: e.target.id},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('-=-' + (res.data))
        if (res.data) {
          app.globalData.items_index = 0;
          app.globalData.items=[];
          for (var i in res.data) {
            for (var j in res.data[i]) {
              app.globalData.items.push(res.data[i][j]);
              console.log('type of item: ' + app.globalData.items[0]['type']);
           }
          }
          app.globalData.items_len = app.globalData.items.length;
          console.log('len of items_G: '+app.globalData.items_len);
        }
        if (app.globalData.items_len == 0) {
          wx.redirectTo({
            url: '../tmp/tmp',
            complete: function (res) {
              console.log(res)
            }
          });
          return;
        }
        wx.redirectTo({
          url: '../item/item?index=' + app.globalData.items_index,
          complete: function (res) {
            console.log(res)
          }
        });
      }
    }) 
  },
  btnTest: function () {
    var that = this;
    that.setData({
      clickTest: false,
    });  
    wx.request({
      url: 'https://75502554.qcloud.la/teacher/test.php',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.length) {
          that.setData({ 
            hasTest: true,
            test: res.data
          });
        }
        else{
          that.setData({
            clickTest: true,
          });         
        }
      }
    }) 
  },
  btnClick:function(){
    var that=this
    wx.request({
      url: 'https://75502554.qcloud.la/teacher/register.php',
      data: {
        userRole: app.globalData.registerInfo.userRole,
        userNum: app.globalData.registerInfo.userNum,
        userClass: app.globalData.registerInfo.userClass,
        userName: app.globalData.registerInfo.userName,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.rows == 1){
          app.globalData.registerInfo.userId = res.data.userId;
          hasRegisterInfo: true
          wx.setStorage({
            key: "hasRegisterInfo",
            data: true
          })
          wx.setStorage({
            key: "registerInfo",
            data: app.globalData.registerInfo
          })
          that.setData({
            hasRegisterInfo:true,
            registerInfoStr : app.globalData.registerInfo.userName + '-' + app.globalData.registerInfo.userClass + '-' + app.globalData.registerInfo.userNum + '(' + app.globalData.registerInfo.userRole + ')'
          })
          if (app.globalData.registerInfo.userRole == 'T')
            that.setData({ isTeacher:true})
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
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
        console.log(res.userInfo)
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
    var value = wx.getStorageSync('hasRegisterInfo')
    if (value) {
      console.log('------' + value)
      this.setData({
        hasRegisterInfo: value,
      })
    }
    var value = wx.getStorageSync('registerInfo')
    if (value) {
      console.log(value)
      app.globalData.registerInfo=value;
      this.setData({
        registerInfoStr: value.userName + '-' + value.userClass + '-' + value.userNum + '(' + value.userRole + ')'
      })
      if (value.userRole == 'T')
        this.setData({ isTeacher: true })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addUsername:function(){
  },
})
