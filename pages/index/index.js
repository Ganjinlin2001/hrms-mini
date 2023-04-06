// pages/index.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getOpenid();
  },

  getOpenid() {
    wx.showLoading({
      title: '用户信息获取中',
    })
    wx.cloud.callFunction({
      name: 'getOpenid',
    }).then(res => {
      wx.hideLoading();
      console.log(res);
      app.globalData.openid = res.result.openid,
      this.setData({
        openid: res.result.openid,
      })
    }).catch(err => {
      wx.hideLoading();
      console.log(err);
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

  // 登录事件
  loginEvent() {
    // 直接获取用户的信息，判断是否通过注册认证
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 跳转到注册页面
  registerEvent() {
    wx.navigateTo({
      url: '/pages/register/register',
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