// pages/preview/preview.js

import {
  updateStaffLeaveInfo
} from '../../api/index';

const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawn: false,
    signature_img: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', data => {
      console.log(data);
      // 添加样式
      let leave_html = data.data.leave_html;
      const regex1 = /(<div class="preview-title"[^>]*)(>)/;
      const style1 = `width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 12px;
      color: red;`;
      const regex2 = /(<div class="preview-content"[^>]*)(>)/;
      const style2 = `width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;`;
      const regex3 = /(<p class="order"[^>]*)(>)/g;
      const style3 = `padding-left: 6px;`;
      const regex4 = /(<p id="last-p"[^>]*)(>)/;
      const style4 = `margin-bottom: 50px;`;
      const regex5 = /(<div class="party-text"[^>]*)(>)/g;
      const style5 = `display: flex;
      flex-direction: row;
      align-items: center;`;
      const regex6 = /(<img [^>]*)(>)/g;
      const style6 = `width: 120px;
      height: 34px;`;
      const regex7 = /(<div class="party-B"[^>]*)(>)/;
      const style7 = `margin-top: 30px;`;
      const regex8 = /(<p>日期：)(<\/p>)/;
      // console.log(regex8);
      // 当前日期
      const currentDate = new Date().getFullYear() + ' 年 ' + (new Date().getMonth() + 1) + ' 月 ' + new Date().getDate() + ' 日 ';
      const style8 = currentDate;
      // const regex = /(<p>日期：)(<\/p>)/;
      // const style8 = str.replace(regex, `$1 ${currentDate}$2`);
      leave_html = leave_html.replace(regex1, `$1 style="${style1}"$2`);
      leave_html = leave_html.replace(regex2, `$1 style="${style2}"$2`);
      leave_html = leave_html.replace(regex3, `$1 style="${style3}"$2`);
      leave_html = leave_html.replace(regex4, `$1 style="${style4}"$2`);
      leave_html = leave_html.replace(regex5, `$1 style="${style5}"$2`);
      leave_html = leave_html.replace(regex6, `$1 style="${style6}"$2`);
      leave_html = leave_html.replace(regex7, `$1 style="${style7}"$2`);
      leave_html = leave_html.replace(regex8, `$1${style8}$2`);
      // console.log(leave_html);
      this.setData({
        nodes: leave_html
      })
    })
  },

  // 跳转到签字页面
  navToSignature() {
    wx.navigateTo({
      url: '/pages/signature/signature',
    })
  },

  // 提交签字
  sumbitSignature() {
    const {
      code
    } = app.globalData.userInfo;
    const {
      signature_img
    } = this.data;
    const sign_date = new Date().getFullYear() + ' 年 ' + (new Date().getMonth() + 1) + ' 月 ' + new Date().getDate() + ' 日 ';
    updateStaffLeaveInfo({
      code, signature_img, sign_date, status: 2
    }).then(res => {
      console.log(res);
      wx.reLaunch({
        url: '/pages/home/home',
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
    // this.canvasInit();
    let pages = getCurrentPages();
    let currPages = pages[pages.length - 1] // 当前页面
    console.log('接收签字图片', currPages);
    let leave_html = currPages.data.nodes;
    const signature_img = currPages.data.signature_img;
    if (signature_img !== null) {
      const regex = /(<\/p>)(<!---->)(<\/div>)/;
      let style = `margin-left: 50px; width: 34px; height: 120px; -moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);`;
      let img = `<img src="${currPages.data.signature_img}" style="${style}" alt="">`;
      // let new_s = s.replace(/(>)(.*?)(<)/, '$1' + '2023年' + '$3');
      leave_html = leave_html.replace(regex, '$1' + img + '$2' + '$3');
    }
    // console.log(leave_html);
    // 重新绘制，插入图片
    this.setData({
      signature_img: currPages.data.signature_img,
      nodes: leave_html
    })
    // console.log();
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