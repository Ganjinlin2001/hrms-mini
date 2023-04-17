// pages/performance/performance.js

const app = new getApp();

import {
  getStaffAllPerformanceList
} from '../../api/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    rows: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      code: app.globalData.userInfo.code,
    })
    this.getStaffAllPerformanceList();
  },

  // 获取员工的绩效记录
  getStaffAllPerformanceList() {
    const {
      code
    } = this.data;
    getStaffAllPerformanceList({
      code
    }).then(res => {
      console.log(res);
      this.setData({
        count: res.data.result.count,
        rows: res.data.result.rows,
      })
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