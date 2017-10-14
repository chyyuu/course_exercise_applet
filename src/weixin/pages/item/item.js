const app = getApp()
var olddistance;
var oldscale;
var oldX;
var oldY;
var imgWidth;
var one_two = 0;

Page({
  data: {
    item_index:null,
    answer:[],
    jieguo:null,
    disabled_tj: true,
    disabled_xyt: true,
    disabled_xx: false,
    disabled_xinxi: true,
    scaleWidth: "",
    scaleHeight: "",
    viewHeight: "",
    imgLeft: 0,
    imgTop: 0,
    tmp:null,
    tempFilePaths: '',
    question_pic: '',
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  },
  radioChange: function (e) {
    this.data.answer = e.detail.value
    this.setData({ disabled_tj: false })
  },
  checkboxChange:function(e){
    this.data.answer = e.detail.value;
    this.setData({ disabled_tj: false })
  },
  input: function (e) {
    this.data.answer = e.detail.value
    this.setData({ disabled_tj: false })
  },
  bindKeyInput:function(e) {
    this.data.answer[parseInt(e.target.id)]=e.detail.value;
    if (this.data.answer.length == this.data.item_index.answer.length)
      this.setData({ disabled_tj: false });
  },
  tijiao : function(){
    this.setData({ disabled_tj: true, disabled_xx: true, disabled_xyt: false, disabled_xinxi: false });
    if (this.data.item_index.type == 'multi_answer'){
      var answer='';
      this.data.answer.sort();
      for (var i in this.data.answer) {
        this.data.answer[i] = this.data.alphabet[parseInt(this.data.answer[i])]
        answer += this.data.answer[i];
//        console.log('------------'+answer)
      }
      if (answer == this.data.item_index.answer)
        this.setData({ jieguo: '恭喜您，答对了！' })
      else
        this.setData({ jieguo: '您答错了，请再接再厉！' })
    }
    else if (this.data.item_index.type == 'single_answer' || this.data.item_index.type == 'true_false') {
      this.data.answer = this.data.alphabet[parseInt(this.data.answer)]
      if (this.data.answer == this.data.item_index.answer)
        this.setData({ jieguo:'恭喜您，答对了！'})
      else
        this.setData({ jieguo: '您答错了，请再接再厉！' })
    }
    else if (this.data.item_index.type == 'question_answer'){
      wx.uploadFile({
        url: 'https://75502554.qcloud.la/teacher/picture_wx.php', //仅为示例，非真实的接口地址
        filePath: this.data.tempFilePaths[0],
        name: 'file',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        formData: {
          'user': app.globalData.registerInfo.userId,
          'item': this.data.item_index.id
        },
        success: function (res) {
          if(res.data=='1'){
            wx.showToast({
              title: '图片上传成功！',
              icon:'success',
              duration:2000
            })
          }
          else{
            wx.showToast({
              title: '图片上传失败！',
              duration: 2000
            })
          }
        }
      })
    }
    else if (this.data.item_index.type == 'fill_in_the_blank') {
      var num_sun = this.data.item_index.answer.length;
      var num_right = 0;
      for (var i in this.data.item_index.answer) {
        for (var j in this.data.item_index.answer[i]) {
          console.log('---' + this.data.answer[i]);
          console.log('+++' + this.data.item_index.answer[i][j]);
          if (this.data.answer[i] == this.data.item_index.answer[i][j]){
            num_right++;
            break;
          }
        }
      }
      if (num_right)
        this.setData({ jieguo: '恭喜您，答对了' + num_sun + '空中的' + num_right + '空。' })
      else
        this.setData({ jieguo: '您答错了，请再接再厉！' })
    }
  },

  xiyiti:function(){
    app.globalData.items_index = parseInt(app.globalData.items_index) + 1

//    wx.switchTab
//    console.log('len-----' + app.globalData.items_len)
//    if (app.globalData.items_len == 0) {
//      console.log('@@@@@@@@@');
//      wx.navigateTo({
//        url: '../t/t'
//      });
//      return;
//    }
//    console.log(app.globalData.items);
    console.log('---当前下标' + app.globalData.items_index);
    console.log('+++数组长度' + app.globalData.items_len);
    if (app.globalData.items_index >= app.globalData.items_len) {
      console.log('jieshu');
      wx.redirectTo({
        url: '../test/test',
        complete:function(res){
          console.log(res)
        }
      });
      return;
    }
    wx.redirectTo({
      url: '../item/item?index=' + app.globalData.items_index
    });
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          disabled_tj: false
        })
      }
    })
  },
  movetap: function (event) {
    var e = event;
    if (one_two == 2 && e.touches.length == 2) {
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var newdistance = Math.sqrt(xMove * xMove + yMove * yMove);
      var diffdistance = newdistance - olddistance;
      olddistance = newdistance; //计算之后更新  
      var newScale = oldscale + 0.01 * diffdistance;  //比例  
      oldscale = newScale;
      var newWidth = newScale * imgWidth;
      var left = this.data.imgLeft - (newWidth - this.data.scaleHeight) / 2;
      var top = this.data.imgTop - (newWidth - this.data.scaleWidth) / 2;
      this.setData({
        scaleHeight: newWidth,
        scaleWidth: newWidth,
        imgLeft: left,
        imgTop: top
      })
    }
    else if (one_two == 1 && e.touches.length == 1) {
      var newX = e.touches[0].clientX;
      var newY = e.touches[0].clientY;
      var left = this.data.imgLeft + (newX - oldX);
      var top = this.data.imgTop + (newY - oldY);
      oldX = newX;
      oldY = newY;
      this.setData({
        imgLeft: left,
        imgTop: top
      })
    }
  },
  starttap: function (event) {
    var e = event;
    if (e.touches.length == 2) {
      one_two = 2;
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      olddistance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离
    }
    else if (e.touches.length == 1) {
      one_two = 1;
      oldX = e.touches[0].clientX;
      oldY = e.touches[0].clientY;
    }
  },
  onLoad:function(options){
    this.setData({
      item_index: app.globalData.items[parseInt(options.index)],
    });
    if (this.data.item_index.type == 'question_answer') {
      this.setData({
        question_pic: "https://75502554.qcloud.la/teacher/picture.php?id=" + this.data.item_index.id
      });
    }
    var res = wx.getSystemInfoSync();  //获取系统信息的同步方法，我用了异步里面提示我this.setData错了
    var windowWidth = res.windowWidth;
    imgWidth = windowWidth;
    oldscale = 1;
    this.setData({
      scaleHeight: windowWidth,
      scaleWidth: windowWidth,
      viewHeight: windowWidth
    });
  },
  onReady:function(){
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
