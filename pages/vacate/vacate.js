// pages/vacate/vacate.js
import { getStaffAllVacateRecord, getStaffLateVacateRecord, addStaffVacateApply, cancelVacateApply } from '../../api/index';
import {
  day
} from '../../utils/day';
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    start_time: null,
    navData: [
      {
        id: 0,
        navName: "请假",
      },
      {
        id: 1,
        navName: "申请记录",
      },
    ],
    navId: 0,
    current: 0,
    allVacateData: [],
    status: 0,
    reason: null,
    allVacateData: [],
    lateRecord: null,
    disabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    this.setData({
      start_time: year + "-" + month + "-" + day,
      end_time: year + "-" + month + "-" + (day + 1),
      code: app.globalData.userInfo.code,
      name: app.globalData.userInfo.name,
    });
    // 获取员工的请假记录
    this.getStaffAllVacateRecord();
    this.getStaffLateVacateRecord();
  },

  getStaffAllVacateRecord() {
    const { code } = this.data;
    getStaffAllVacateRecord({ code }).then((res) => {
      console.log(res);
      const allVacateData = res.data.result.map(item => {
        // console.log(item);
        item.createdAt = day(item.createdAt);
        switch (item.status) {
          case 1: {
            item.statusText = '已通过';
            item.statusClass = 'tag1';
            break;
          }
          case 2: {
            item.statusText = '已取消';
            item.statusClass = 'tag2';
            break;
          }
          case -1: {
            item.statusText = '不通过';
            item.statusClass = 'tag-1';
            break;
          }
          case 0: {
            item.statusText = '审核中';
            item.statusClass = 'tag0';
            break;
          }
        }
        return item;
      })
      this.setData({
        allVacateData,
      })
    });
  },

  getStaffLateVacateRecord() {
    const { code } = this.data;
    getStaffLateVacateRecord({code}).then(res => {
      console.log(res);
      if (res.data.result) {
        this.setData({
          start_time: res.data.result.start_time,
          end_time: res.data.result.end_time,
          reason: res.data.result.reason,
          status: 1,
          lateRecord: res.data.result,
          disabled: true,
        })
      }
    })
  },

  changeNav(e) {
    const navId = e.currentTarget.id * 1;
    this.setData({
      navId,
      current: navId,
    });
  },

  // 选择开始时间
  chooseStartTime(e) {
    this.setData({
      start_time: e.detail.value,
    });
  },

  // 选择结束时间
  chooseEndTime(e) {
    const end_time = e.detail.value;
    this.setData({
      end_time,
    });
  },

  getReason(e) {
    this.setData({
      reason: e.detail.value,
    })
  },

  handleSumbit() {
    const {start_time, end_time, code, name, reason} = this.data;
    addStaffVacateApply({
      code,
      start_time,
      end_time,
      reason,
      name
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
    await cancelVacateApply({
      code,
      status: 2,
      id: lateRecord.id,
    });
    this.setData({
      status: 0,
      // new_dormitory: null,
    })
    // 重新获取数据
    setTimeout(() => {
      this.getStaffAllVacateRecord();
    }, 500);
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
