// pages/leave/leave.js

import {
  getStaffLateLeaveRecord,
  staffLeaveApply,
  cancelLeaveApply
} from '../../api/index';

import {
  day
} from '../../utils/day';

const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason: null,
    status: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      code: app.globalData.userInfo.code,
      name: app.globalData.userInfo.name,
      department: app.globalData.userInfo.department,
      job: app.globalData.userInfo.job,
      entry_time: day(app.globalData.userInfo.createdAt).split(' ')[0],
    })
    this.initData();
  },

  initData() {
    // 获取员工离职申请信息
    const {
      code
    } = this.data;
    getStaffLateLeaveRecord({
      code
    }).then(res => {
      console.log(res);
      // 如果有记录，展示申请原因和申请状态、撤销申请按钮
      if (res.data.result != undefined) {
        this.setData({
          status: 1,
          reason: res.data.result.reason,
          lateRecord: res.data.result,
        })
      }
    })
  },

  getReason(e) {
    this.setData({
      reason: e.detail.value,
    })
  },

  handleSumbit() {
    const {
      code,
      name,
      department,
      job,
      entry_time,
      reason
    } = this.data;
    if (reason === null || reason === '') {
      wx.showModal({
        title: '提示',
        content: '请输入完整的申请信息',
      })
      return;
    }
    staffLeaveApply({
      code,
      name,
      department,
      job,
      entry_time,
      reason,
    });
    wx.navigateBack({
      delta: 2,
    })
  },

  // 取消申请
  async cancelApplyEvent() {
    const {
      code,
      lateRecord
    } = this.data;
    await cancelLeaveApply({
      code,
      status: 2,
      id: lateRecord.id,
    });
    this.setData({
      status: 0,
      reason: null,
    })
    // 重新获取数据
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