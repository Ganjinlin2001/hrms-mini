// pages/home/home.js

const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://6872-hrms-env-9gxu769jef44e565-1317210907.tcb.qcloud.la/avatar/1679118057810.png?sign=e410e9003f50ab6a31b504a8a99b63ee&t=1679291460',
    userInfo: null,
    navigationData: [{
      name: '考勤签到',
      id: 'attendance',
      page: '../../static/images/attendance.png',
    }, {
      name: '绩效与奖惩',
      id: 'performance',
      page: '../../static/images/performance.png',
    }, {
      name: '公司新闻',
      id: 'news',
      page: '../../static/images/new.png',
    }, {
      name: '招聘信息',
      id: 'recruitment',
      page: '../../static/images/recruitment.png',
    }, {
      name: '请假',
      id: 'vacate',
      page: '../../static/images/vacate.png',
    }, {
      name: '调岗申请',
      id: 'job',
      page: '../../static/images/job.png',
    }, {
      name: '住宿调换',
      id: 'dormitory',
      page: '../../static/images/dormitory.png',
    }, {
      name: '部门调换',
      id: 'department',
      page: '../../static/images/department.png',
    }, {
      name: '离职申请',
      id: 'leave',
      page: '../../static/images/leave.png',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },

  // 页面跳转事件
  handleNavigate(e) {
    console.log(e);
    const {id} = e.currentTarget;
    wx.navigateTo({
      url: `/pages/${id}/${id}?${id}=${id}`,
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
    this.setData({
      userInfo: app.globalData.userInfo,
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