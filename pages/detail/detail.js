// pages/detail/detail.js

import {
  getArticleInfo
} from '../../api/index';

import {
  day
} from "../../utils/day";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfo: null,
    html: null,
    createdTime: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const {
      article_id
    } = options;
    this.getArticleInfo({
      article_id
    });
  },

  getArticleInfo({
    article_id
  }) {
    getArticleInfo({
      article_id
    }).then(res => {
      console.log(res);
      this.setData({
        articleInfo: res.data.result,
        html: res.data.result.html.replace(/\<img/g, '<img style="width:100%;heightauto;display:block"'),
        createdTime: day(res.data.result.createdAt),
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