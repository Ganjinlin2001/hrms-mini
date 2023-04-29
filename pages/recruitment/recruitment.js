// pages/recruitment/recruitment.js

import {
  searchJobByKeyWord,
  getJobList
} from '../../api/index';
import {
  day
} from "../../utils/day";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: null,
    dataList: [],
    searching: false,
    timer: null,
    currentItem: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDataList();
  },

  getDataList() {
    getJobList().then(res => {
      console.log(res);
      const data = res.data.result.rows.map(item => {
        item.createdAt = day(item.createdAt);
        // console.log(item.createdAt);
        return item;
      })
      this.setData({
        dataList: data,
      })
    })
  },

  // 获取搜索关键词
  bindinputEvent(e) {
    console.log(e);
    const {
      value,
    } = e.detail;
    let {
      timer
    } = this.data;
    if (value === '') {
      clearTimeout(timer);
      this.setData({
        searching: false,
      })
    } else {
      if (timer) clearTimeout(timer);
      // if (value)
      timer = setTimeout(() => {
        console.log('发送请求，关键词：', this.data.keyWord);
        searchJobByKeyWord({
          keyWord: this.data.keyWord
        }).then(res => {
          console.log(res);
          const data = res.data.result.rows.map(item => {
            item.createdAt = day(item.createdAt);
            // console.log(item.createdAt);
            return item;
          })
          this.setData({
            dataList: data,
          })
        })
      }, 500);
      this.setData({
        keyWord: e.detail.value,
        searching: true,
        timer,
      })
    }
  },

  // 取消搜索
  cancelSearch() {
    const {
      searching
    } = this.data;
    if (searching) {
      this.setData({
        keyWord: null,
        searching: false,
      })
      this.getDataList();
    }
  },

  searchEvent() {
    const {
      keyWord
    } = this.data;
    if (keyWord === null || keyWord === '') {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      })
    }
  },

  // 跳转到详情页
  lookMore(e) {
    console.log(e);
    this.setData({
      currentItem: e.currentTarget.dataset.item,
    })
    wx.navigateTo({
      url: '/pages/jobDetail/jobDetail',
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