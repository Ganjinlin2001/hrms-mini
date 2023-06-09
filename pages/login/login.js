// pages/login/login.js
const app = new getApp();

import {
  login, addPerformance
} from '../../api/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginForm: {
      code: null, // 员工工号
      password: null, // 用户密码
    },
    type: 'password',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  // 获取手机号
  getUserPhone(e) {
    console.log(e);
    let code = e.detail.value;
    this.setData({
      ['loginForm.code']: code,
    })
  },

  getPassword(e) {
    let password = e.detail.value;
    this.setData({
      ['loginForm.password']: password + '',
    })
  },

  // 眼睛点击事件
  eyeClick() {
    console.log(1);
    let type = this.data.type;
    if (type === 'password') {
      this.setData({
        type: 'text',
      })
    } else {
      this.setData({
        type: 'password'
      })
    }
  },

  // 跳转到注册页面
  registerEvent() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  // 跳转到忘记密码页面
  forgetPassword() {
    wx.navigateTo({
      url: '/pages/forget/forget',
    })
  },

  // 登录事件
  async loginEvent() {
    const {
      loginForm
    } = this.data;
    for (const value of Object.values(loginForm)) {
      if (value === null || value === "") {
        wx.showModal({
          title: '提示',
          content: '请填写完整的登录信息'
        })
        return;
      }
    }
    // 发请求
    // console.log('loginForm', loginForm);
    wx.showLoading({
      title: '正在请求中',
    })
    // console.log(typeof login(loginForm));
    login(loginForm).then(res => {
      if (res.data.code === 200) {
        const userInfo = res.data.result.userInfo;
        app.globalData.userInfo = userInfo;
        // 生成用户的绩效记录
        // 获取用户的工号，姓名，部门等信息
        const {
          code,
          name,
          department,
          job,
          basic_salary,
        } = userInfo;
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        addPerformance({
          code,
          name,
          department,
          job,
          basic_salary,
          year,
          month
        });
        wx.reLaunch({
          url: '/pages/home/home',
        })
      }
    })

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