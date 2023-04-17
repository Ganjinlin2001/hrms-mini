// pages/register/register.js
const app = new getApp();
// const {checkAdminCode} = require('../../api/index');
import {
  register
} from '../../api/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerForm: {
      code: null,
      password: null,
      verifyPwd: null,
      name: null,
      gender: 1,
      id_number: null,
      phone: null,
      email: null,
      job: null,
      department: null,
      dormitory: null,
      basic_salary: null,
      // avatar: 'https://6872-hrms-env-9gxu769jef44e565-1317210907.tcb.qcloud.la/avatar/1679115992455.png?sign=020adbf2b9e81f717cce74839101c54e&t=1679116453', // 用户头像链接
      labor_contract: 'https://6872-hrms-env-9gxu769jef44e565-1317210907.tcb.qcloud.la/avatar/default_avatar.png?sign=68cdf385185d76a2078c22ac0205e034&t=1679244569',
      avatar: 'https://6872-hrms-env-9gxu769jef44e565-1317210907.tcb.qcloud.la/avatar/default_avatar.png?sign=68cdf385185d76a2078c22ac0205e034&t=1679244569',
      openid: null,
    },
    ganderItems: [{
        name: '男',
        value: 1,
        checked: true
      },
      {
        name: '女',
        value: 0,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app);
    this.setData({
      [`registerForm.openid`]: app.globalData.openid,
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  // 统一获取用户的输入
  handleInputChange(e) {
    console.log(e.target.id);
    this.setData({
      [`registerForm.${e.target.id}`]: e.detail.value
    })
  },

  handleVerifyPwd(e) {
    const {
      password
    } = this.data.registerForm;
    if (password === null || password === '') {
      wx.showModal({
        title: '提示',
        content: '请先输入密码再确认密码',
        success: res => {
          this.setData({
            ['registerForm.verifyPwd']: null,
          })
        }
      })
    } else if (password !== e.detail.value) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致',
      })
    } else {
      this.setData({
        ['registerForm.verifyPwd']: e.detail.value,
      })
    }
  },

  // 获取用户的个人照片
  chooseImgFile(e) {
    console.log(e);
    wx.chooseImage({
      count: 1, // 默认为9
      sizeType: ['original'], // 指定原图或者压缩图
      sourceType: ['album'], // 指定图片来源
      success: chooseResult => {
        console.log(chooseResult);
        let tempFilePaths = chooseResult.tempFilePaths[0];
        // let tempFilePaths = null;
        let timestamp = new Date().getTime();
        // 上传图片到云存储中
        this.uploadCoverImg(timestamp, tempFilePaths, e.target.dataset.type);

      },
      fail: err => {
        console.log(err);
      }
    })
  },

  // 上传图片到云存储中
  uploadCoverImg(timestamp, tempFilePaths, type) {
    wx.showToast({
      title: '图片上传中',
      icon: 'loading',
      mask: true,
      duration: 3000,
    })
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: 'avatar/' + timestamp + '.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: tempFilePaths,
      // 成功回调
      success: res1 => {
        console.log("上传成功", res1);
        // 获取图片的url
        if (res1.fileID) {
          console.log(res1.fileID);
          wx.cloud.getTempFileURL({
              fileList: [{
                fileID: res1.fileID,
              }]
            })
            .then(res3 => {
              wx.hideToast();
              wx.showToast({
                title: '图片上传成功',
                icon: 'success',
              })
              console.log(res3.fileList);
              let img = res3.fileList[0].tempFileURL;
              this.setData({
                // fileID: res1.fileID,
                // roomCoverImg,
                // tempFilePaths,
                [`registerForm.${type}`]: img,
              })
            })
            .catch(err => {
              wx.hideToast();
              wx.showToast({
                title: '图片上传失败',
                icon: 'error',
              })
              console.log(err);
            })
        }
      },
      fail: err1 => {
        wx.hideToast();
        wx.showToast({
          title: '图片上传失败',
          icon: 'error',
        })
        console.log(err1);
      }

    })
  },

  // 预览图片
  previewImage(e) {
    console.log(e);
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [this.data.registerForm[`${e.target.dataset.type}`]] // 需要预览的图片http链接列表
    })
  },

  // 提交注册信息
  handleSubmit() {
    const {
      registerForm
    } = this.data;
    for (const value of Object.values(registerForm)) {
      if (value === null || value === "") {
        wx.showModal({
          title: '提示',
          content: '请填写完整的注册信息'
        })
        return;
      }
    }
    // 发请求
    wx.showLoading({
      title: '注册请求中',
    })
    register(registerForm).then(res => {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    });
  },

  // 重新上传用户头像
  reuploadAvatar(e) {
    this.chooseImgFile(e);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})