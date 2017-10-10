const app = getApp()

Page({
  data: {
    item_index:null,
    answer:[],
    jieguo:null,
    disabled_tj: true,
    disabled_xyt: true,
    disabled_xx: false,
    disabled_xinxi: true,
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
              duration:1000
            })
          }
          else{
            wx.showToast({
              title: '图片上传失败！',
              duration: 1000
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
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          disabled_tj: false
        })
      }
    })
  },
  onLoad:function(options){
    console.log(options.index)
    this.setData({
//      item_index: JSON.parse(app.globalData.items[parseInt(options.index)])
      item_index: app.globalData.items[parseInt(options.index)]
    });
    if (this.data.item_index.type == 'question_answer') {
      this.setData({
        question_pic: "https://75502554.qcloud.la/teacher/picture.php?id=" + this.data.item_index.id
      });
    }
    /*
    switch (this.data.item_index.type){
      case "true_false":
        this.data.item_index.type = "判断题";
        break;
      case "multi_answer":
        this.data.item_index.type = "多选题";
        break;
      case "single_answer":
        this.data.item_index.type = "单选题";
        break;
      case "fill_in_the_blank":
        this.data.item_index.type = "填空题";
        break;
    }*/
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
