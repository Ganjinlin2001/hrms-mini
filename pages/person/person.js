// pages/person/person.js

import { getStaffInfo, updateStaffInfo } from "../../api/index";

const app = new getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: null,
    userInfo: [
      {
        label: "个人照片",
        key: "avatar",
        value: null,
        type: "img",
      },
      {
        label: "工号",
        key: "code",
        value: null,
        type: "forbid",
      },
      {
        label: "密码",
        key: "password",
        value: null,
        type: "password",
      },
      {
        label: "姓名",
        key: "name",
        value: null,
        type: "short_text",
      },
      {
        label: "性别",
        key: "gender",
        value: null,
        type: "gender",
      },
      {
        label: "生日",
        key: "birthday",
        value: null,
        type: "birthday",
      },
      {
        label: "身份证号",
        key: "id_number",
        value: null,
        type: "short_text",
      },
      {
        label: "电话",
        key: "phone",
        value: null,
        type: "short_text",
      },
      {
        label: "邮箱",
        key: "email",
        value: null,
        type: "short_text",
      },
      {
        label: "宿舍",
        key: "dormitory",
        value: null,
        type: "short_text",
      },
      {
        label: "紧急联系人",
        key: "emergency_contact_person",
        value: null,
        type: "short_text",
      },
      {
        label: "紧急联系人电话",
        key: "emergency_contact_phone",
        value: null,
        type: "short_text",
      },
      {
        label: "家庭地址",
        key: "home_address",
        value: null,
        type: "long_text",
      },
      {
        label: "毕业院校",
        key: "school",
        value: null,
        type: "long_text",
      },
      {
        label: "毕业院校地址",
        key: "school_address",
        value: null,
        type: "long_text",
      },
      {
        label: "学历",
        key: "edu_bg",
        value: null,
        type: "short_text",
      },
      {
        label: "专业",
        key: "major",
        value: null,
        type: "short_text",
      },
      {
        label: "职位",
        key: "job",
        value: null,
        type: "short_text",
      },
      {
        label: "所在部门",
        key: "department",
        value: null,
        type: "short_text",
      },
      {
        label: "技能",
        key: "pro_skills",
        value: null,
        type: "long_text",
      },
      {
        label: "工作经历",
        key: "work_experience",
        value: null,
        type: "long_text",
      },
      {
        label: "校园经历",
        key: "campus_experience",
        value: null,
        type: "long_text",
      },
      {
        label: "项目经历",
        key: "project_experience",
        value: null,
        type: "long_text",
      },
      {
        label: "基本薪资",
        key: "basic_salary",
        value: null,
        type: "forbid",
      },
      {
        label: "劳动合同",
        key: "labor_contract",
        value: null,
        type: "img",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const that = this;
    // this.initData(that);
  },

  // 初始化员工数据
  initData() {
    const userInfoTemp = app.globalData.userInfo;
    console.log(app);
    console.log("userInfoTemp: ", userInfoTemp);
    const { userInfo } = this.data;
    for (let item of userInfo) {
      item.value = userInfoTemp[`${item.key}`];
    }
    // console.log('this: ', this);
    this.setData({
      userInfo,
      userInfoTemp,
    });
  },

  reuploadImg(e) {
    this.chooseImgFile(e);
  },

  chooseImgFile(e) {
    console.log(e);
    wx.chooseImage({
      count: 1, // 默认为9
      sizeType: ["original"], // 指定原图或者压缩图
      sourceType: ["album"], // 指定图片来源
      success: (chooseResult) => {
        console.log(chooseResult);
        let tempFilePaths = chooseResult.tempFilePaths[0];
        // let tempFilePaths = null;
        let timestamp = new Date().getTime();
        // 上传图片到云存储中
        this.uploadCoverImg(
          timestamp,
          tempFilePaths,
          e.currentTarget.dataset.item.key
        );
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },

  // 上传图片到云存储中
  uploadCoverImg(timestamp, tempFilePaths, key) {
    const { userInfoTemp } = this.data;
    wx.showToast({
      title: "图片上传中",
      icon: "loading",
      mask: true,
      duration: 3000,
    });
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: "avatar/" + timestamp + ".png",
      // 指定要上传的文件的小程序临时文件路径
      filePath: tempFilePaths,
      // 成功回调
      success: (res1) => {
        console.log("上传成功", res1);
        // 获取图片的url
        if (res1.fileID) {
          // console.log(res1.fileID);
          wx.cloud
            .getTempFileURL({
              fileList: [
                {
                  fileID: res1.fileID,
                },
              ],
            })
            .then((res3) => {
              console.log("res3: ", res3);
              const value = res3.fileList[0].tempFileURL;
              updateStaffInfo({ code: userInfoTemp.code, [key]: value }).then(
                (res) => {
                  // console.log(res);
                  // wx.navigateBack({
                  //   url: '/pages/home/home',
                  //   // url: '/pages/person/person?id=' + userInfo.id,
                  // })
                  wx.showToast({
                    title: "图片上传成功",
                    icon: "success",
                  });
                  this.getStaffInfo();
                }
              );
              // wx.hideToast();

              // console.log(res3.fileList);
              // let img = res3.fileList[0].tempFileURL;
              // this.setData({
              //   // fileID: res1.fileID,
              //   // roomCoverImg,
              //   // tempFilePaths,
              //   [`registerForm.${type}`]: img,
              // })
            })
            .catch((err) => {
              wx.hideToast();
              wx.showToast({
                title: "图片上传失败",
                icon: "error",
              });
              console.log(err);
            });
        }
      },
      fail: (err1) => {
        wx.hideToast();
        wx.showToast({
          title: "图片上传失败",
          icon: "error",
        });
        console.log(err1);
      },
    });
  },

  // 获取员工数据
  async getStaffInfo() {
    let userInfo = app.globalData.userInfo;
    console.log("userInfo: ", userInfo);
    const res = await getStaffInfo({ code: userInfo.code });
    console.log(res);
    app.globalData.userInfo = res.data.result.userInfo;
    this.initData();
  },

  // 跳转到修改信息页面
  navigateToModify(e) {
    const { id } = this.data.userInfoTemp;
    console.log(e, id);
    const { item } = e.currentTarget.dataset;
    if (item.type === "forbid") {
      return;
    }
    if (
      item.key === "dormitory" ||
      item.key === "job" ||
      item.key === "department"
    ) {
      wx.navigateTo({
        url: `/pages/${item.key}/${item.key}`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/modifyInfo/modifyInfo?type=${item.type}&key=${item.key}&label=${item.label}&value=${item.value}`,
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(e) {
    console.log("e: ", e);
    const that = this;
    this.getStaffInfo(that);
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
