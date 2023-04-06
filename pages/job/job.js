// pages/job/job.js
import {
  addStaffJobApply,
  getStaffLateRecord,
  cancelJobApply,
  getStaffJobRecord,
} from "../../api/index";
import { day } from "../../utils/day";
// import dayjs from 'dayjs';

const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        id: 0,
        navName: "调岗申请",
      },
      {
        id: 1,
        navName: "申请记录",
      },
    ],
    navId: 0,
    current: 0,
    pre_job: null,
    new_job: null,
    reason: null,
    code: null,
    status: 0,
    allJobData: [],
    name: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取员工的工号和岗位信息，获取最近一条的记录
    this.setData({
      code: app.globalData.userInfo.code,
      pre_job: app.globalData.userInfo.job,
      name: app.globalData.userInfo.name,
    });
  },

  // 获取当前员工所有的调岗申请记录
  getStaffAllRocord(code) {
    wx.request({
      url: "http://127.0.0.1:7001/api/job/getStaffAll",
      method: "GET",
      data: {
        code,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success: (res) => {
        wx.hideLoading();
        console.log(3, res);
        if (res.data.code !== 200) {
          wx.showModal({
            title: "提示",
            content: res.data.message,
          });
        } else {
          if (res.data.result != undefined) {
            wx.showToast({
              title: res.data.message,
              icon: "success",
            });
            // console.log(day(res.data.result[0].createdAt));
            const allJobData = res.data.result.map((item) => {
              console.log(item);
              item.createAt = day(item.createAt);
              switch (item.status) {
                case 1: {
                  item.statusText = "已通过";
                  item.statusClass = "tag1";
                  break;
                }
                case 2: {
                  item.statusText = "已取消";
                  item.statusClass = "tag2";
                  break;
                }
                case -1: {
                  item.statusText = "不通过";
                  item.statusClass = "tag-1";
                  break;
                }
                case 0: {
                  item.statusText = "审核中";
                  item.statusClass = "tag0";
                  break;
                }
              }
              return item;
            });
            this.setData({
              allJobData,
            });
          }
        }
      },
      fail: (err) => {
        wx.hideLoading();
        // console.log(err);
        // reject(err);
      },
    });
  },

  getLateRecord(code) {
    getStaffLateRecord({
      code,
    }).then((res) => {
      console.log(res);
      this.setData({
        status: 1,
        new_job: res.data.result.new_job,
        reason: res.data.result.reason,
        lateRecord: res.data.result,
      });
    });
  },

  changeNav(e) {
    const navId = e.currentTarget.id * 1;
    this.setData({
      navId,
      current: navId,
    });
  },

  // 获取员工输入的新工号
  getStaffNewJob(e) {
    // console.log(e);
    this.setData({
      new_job: e.detail.value,
    });
  },

  // 获取员工输入的调岗缘由
  getReason(e) {
    this.setData({
      reason: e.detail.value,
    });
  },

  // 提交调岗申请
  handleSumbit() {
    const { code, pre_job, new_job, reason, name } = this.data;
    if (
      new_job === null ||
      new_job === "" ||
      reason === null ||
      reason === ""
    ) {
      wx.showModal({
        title: "提示",
        content: "请输入完整的申请信息",
      });
      return;
    }
    // console.log(code, name, pre_job, new_job, reason);
    // 发请求更新信息
    addStaffJobApply({
      code,
      pre_job,
      new_job,
      reason,
      name,
    }).then((res) => {
      console.log(res);
    });
    console.log(1);
    // this.getLateRecord(code);
    // 退回上一个页面
    wx.navigateBack({
      delta: 2,
    });
  },

  // 取消申请
  async cancelApplyEvent() {
    const { code, lateRecord } = this.data;
    await cancelJobApply({
      code,
      status: 2,
      id: lateRecord.id,
    });
    this.setData({
      status: 0,
      new_job: null,
    });
    // 重新获取数据
    setTimeout(() => {
      this.getStaffAllRocord(code);
    }, 500);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getLateRecord(app.globalData.userInfo.code);
    this.getStaffAllRocord(app.globalData.userInfo.code);
  },

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
