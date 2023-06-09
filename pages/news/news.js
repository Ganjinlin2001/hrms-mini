// pages/news/news.js

import {
  getNewsList,
  searchNewsByKeyWord
} from '../../api/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // newsList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    newsList: [],
    keyWord: '',
    searching: false,
    timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsList();
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
        searchNewsByKeyWord({keyWord: this.data.keyWord}).then(res => {
          console.log(res);
          this.setData({
            newsList: res.data.result.rows,
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
      this.getNewsList();
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

  // 获取所有新闻
  getNewsList() {
    getNewsList().then(res => {
      console.log(res);
      this.setData({
        newsList: res.data.result,
      })
    })
  },

  toDetailPage(e) {
    console.log(e);
    const article_id = e.currentTarget.dataset.item.article_id;
    wx.navigateTo({
      url: '/pages/detail/detail?article_id=' + article_id,
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