// pages/forget/forget.js

import {
  getVerifyCode, changePassword
} from '../../api/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitForm: {
      code: null,
      password: null,
      verifyPwd: null,
      email: null,
      verifyCode: null,
    },
    canSendCode: false, // 设置是否可以发送验证码
    captchaTime: 60, // 验证码倒计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 统一获取用户的输入
  handleInputChange(e) {
    console.log(e.target.id);
    this.setData({
      [`submitForm.${e.target.id}`]: e.detail.value
    })
  },

  // 确认密码
  handleVerifyPwd(e) {
    const {
      password
    } = this.data.submitForm;
    if (password === null || password === '') {
      wx.showModal({
        title: '提示',
        content: '请先输入密码再确认密码',
        success: res => {
          this.setData({
            ['submitForm.verifyPwd']: null,
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
        ['submitForm.verifyPwd']: e.detail.value,
      })
    }
  },

  // 倒计时函数
  countdownFun60() {
    this.data.interval = setInterval(() => {
      this.setData({
        captchaTime: this.data.captchaTime - 1,
      })
      // this.captchaTime = this.captchaTime - 1;
      if (this.data.captchaTime === 0) {
        clearInterval(this.data.interval);
        this.setData({
          canSendCode: false,
          captchaTime: 60
        })
        // this.canSendCode = false;
        // this.captchaTime = this.fixedSecond2;
      }
    }, 1000);
  },

  // 发送验证码
  async sendVerifyCode() {
    let timer1 = null;
    if (this.data.canSendCode) {
      return
    };
    clearTimeout(timer1);
    console.log("邮箱：", this.data.submitForm.email);
    let {
      email
    } = this.data.submitForm;
    console.log("email: ", email);
    // 先查看邮箱是否填写
    if (email === null) {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'error'
      })
      return;
    }
    wx.showLoading({
      title: '验证码获取中'
    })
    let res = await getVerifyCode({
      email
    });
    console.log("验证码获取结果：", res);
    wx.hideLoading()
    wx.showModal({
      title: '提示',
      content: '验证码获取成功，请前往邮箱中复制您的验证码'
    })
    // this.canSendCode = true;
    this.setData({
      canSendCode: true,
    })
    this.countdownFun60();
  },

  // 提交表单，重置密码
  submitEvent() {
    const {
      submitForm
    } = this.data;
    for (const value of Object.values(submitForm)) {
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
      title: '密码重置中',
      mask: true,
    })
    changePassword(submitForm).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '密码重置成功',
      })
      wx.reLaunch({
        url: '/pages/index/index',
      })
    });
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