// pages/modifyInfo/modifyInfo.js
const app = new getApp();
import { updateStaffInfo } from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    genderRadio: [
      {
        name: "男",
        value: '1',
        checked: false,
      },
      {
        name: "女",
        value: '0',
        checked: false,
      },
    ],
    // birthday: null,
    // propsData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const { genderRadio } = this.data;
    for (let item of genderRadio) {
      if (item.value === app.globalData.userInfo.gender) {
        item.checked = true;
      }
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      type: options.type,
      key: options.key,
      genderRadio,
      value: options.value,
      label: options.label,
    });
  },

  handleInputChange(e) {
    console.log(e);
    this.setData({
      value: e.detail.value,
    });
  },

  // 性别选择
  radioChange(e) {
    console.log(e);
    this.setData({
      value: e.detail.value,
    });
  },

  bindMultiPickerChange(e) {
    console.log(e.detail.value);
    this.setData({
      value: e.detail.value,
    });
  },

  submitChange() {
    const { userInfo, type, key, value } = this.data;
    console.log('userInfo: ', userInfo);
    updateStaffInfo({code: userInfo.code, [key]: value,}).then(res => {
      console.log(res);
      wx.navigateBack({
        url: '/pages/home/home',
        // url: '/pages/person/person?id=' + userInfo.id,
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
