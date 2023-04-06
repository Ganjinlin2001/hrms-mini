// pages/attendance/attendance.js

import {
  getStaffAllAttendanceRecord,
  getStaffTodayAttendanceRecord,
  addStaffAttendanceRecord,
  updateStaffAttendanceInfo,
} from "../../api/index";

const app = new getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        id: 0,
        navName: "打卡考勤",
      },
      {
        id: 1,
        navName: "打卡记录",
      },
    ],
    navId: 0,
    current: 0,
    allAttendanceData: [],
    start_work_time: null,
    end_work_time: null,
    state: 1,
    sumbitText: "上班打卡",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const year = new Date().getFullYear();
    const month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    const day =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    const today = year + "-" + month + "-" + day;
    // 获取员工基本信息
    this.setData({
      code: app.globalData.userInfo.code,
      name: app.globalData.userInfo.name,
      department: app.globalData.userInfo.department,
      job: app.globalData.userInfo.job,
      today,
    });
    this.getStaffAllAttendanceRecord();
    this.getTodayData();
  },

  // 获取员工所有的考勤记录
  getStaffAllAttendanceRecord() {
    const { code } = this.data;
    getStaffAllAttendanceRecord({ code }).then((res) => {
      console.log(res);
      this.setData({
        allAttendanceData: res.data.result,
      });
    });
  },

  // 根据今天的日期和员工工号去查询今天的考勤情况
  getTodayData() {
    const { today, code } = this.data;
    getStaffTodayAttendanceRecord({ date: today, code }).then((res) => {
      if (res.data.result) {
        // 如果有记录
        let sumbitText = null;
        if (res.data.result.state == 1) {
          sumbitText = "下班打卡";
        } else {
          sumbitText = "已完成";
        }
        this.setData({
          todayRecord: res.data.result,
          start_work_time: res.data.result.start_work_time,
          end_work_time: res.data.result.end_work_time,
          sumbitText,
        });
      }
    });
  },

  changeNav(e) {
    const navId = e.currentTarget.id * 1;
    this.setData({
      navId,
      current: navId,
    });
  },

  async clockInEvent(e) {
    console.log(e);
    let sumbitText = e.currentTarget.dataset.text;
    let {
      code,
      name,
      department,
      job,
      today,
      todayRecord,
      start_work_time,
      end_work_time,
    } = this.data;
    // 获取当前时间
    const hour =
      new Date().getHours() < 10
        ? "0" + new Date().getHours()
        : new Date().getHours();
    const min =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    const currentTime = hour + ":" + min;
    if (sumbitText === "上班打卡") {
      start_work_time = currentTime;
      // 创建一条员工当天的考勤记录
      await addStaffAttendanceRecord({
        code,
        name,
        department,
        job,
        date: today,
        start_work_time,
      });
      setTimeout(async () => {
        await this.getTodayData();
        await this.getStaffAllAttendanceRecord();
      }, 500);
    } else if (sumbitText === "下班打卡") {
      end_work_time = currentTime;
      // 计算工时
      let totalHour = end_work_time.split(":")[0] * 1 - start_work_time.split(":")[0] * 1;
      let totalMin = end_work_time.split(":")[1] * 1 + (60 - start_work_time.split(":")[1] * 1);
      if (totalHour >= 1) {
        if (totalMin >= 60) {
          totalMin -= 60;
        } else {
          totalHour -= 1;
        }
      } else {
        totalMin = end_work_time.split(":")[1] * 1 - start_work_time.split(":")[1] * 1;
      }
      const on_work_time = totalHour + "小时" + totalMin + "分钟";
      console.log("on_work_time: ", on_work_time);
      await updateStaffAttendanceInfo({
        code,
        id: todayRecord.id,
        end_work_time,
        on_work_time,
        state: 2,
      });
      setTimeout(async () => {
        await this.getTodayData();
        await this.getStaffAllAttendanceRecord();
      }, 500);
    } else {
      return;
    }
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
