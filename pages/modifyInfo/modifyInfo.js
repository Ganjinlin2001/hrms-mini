// pages/modifyInfo/modifyInfo.js
const app = new getApp();
import {
  updateStaffInfo,
  changePassword,
  getVerifyCode
} from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    genderRadio: [{
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
    changePwdForm: {
      password: null,
      verifyPwd: null,
      verifyCode: null,
      email: null,
    },
    canSendCode: false, // 设置是否可以发送验证码
    captchaTime: 60, // 验证码倒计时
    // birthday: null,
    // propsData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const {
      genderRadio
    } = this.data;
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

  // 获取密码
  handlePwdInputChange(e) {
    this.setData({
      [`changePwdForm.${e.target.id}`]: e.detail.value,
    });
  },

  // 确认密码
  handleVerifyPwd(e) {
    const {
      password
    } = this.data.changePwdForm;
    if (password === null || password === '') {
      wx.showModal({
        title: '提示',
        content: '请先输入密码再确认密码',
        success: res => {
          this.setData({
            ['changePwdForm.verifyPwd']: null,
          })
        }
      })
    } else if (password !== e.detail.value) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致',
      })
    } else {
      this.setData({
        ['changePwdForm.verifyPwd']: e.detail.value,
      })
    }
  },

  // 倒计时函数
  countdownFun60() {
    this.data.interval = setInterval(() => {
      this.setData({
        captchaTime: this.data.captchaTime - 1,
      })
      // this.captchaTime = this.captchaTime - 1;
      if (this.data.captchaTime === 0) {
        clearInterval(this.data.interval);
        this.setData({
          canSendCode: false,
          captchaTime: 60,
        })
        // this.canSendCode = false;
        // this.captchaTime = this.fixedSecond2;
      }
    }, 1000);
  },

  // 发送验证码
  async sendVerifyCode() {
    let timer1 = null;
    if (this.data.canSendCode) {
      return
    };
    clearTimeout(timer1);
    console.log("邮箱：", this.data.changePwdForm.email);
    let {
      email
    } = this.data.changePwdForm;
    console.log("email: ", email);
    // 先查看邮箱是否填写
    if (email === null) {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'error'
      })
      return;
    }
    wx.showLoading({
      title: '验证码获取中'
    })
    let res = await getVerifyCode({
      email
    });
    console.log("验证码获取结果：", res);
    wx.hideLoading()
    wx.showModal({
      title: '提示',
      content: '验证码获取成功，请前往邮箱中复制您的验证码'
    })
    // this.canSendCode = true;
    this.setData({
      canSendCode: true,
    })
    this.countdownFun60();
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
    const {
      userInfo,
      type,
      key,
      value,
      changePwdForm
    } = this.data;
    console.log('userInfo: ', userInfo);
    if (type != 'password') {
      updateStaffInfo({
        code: userInfo.code,
        [key]: value,
      }).then(res => {
        console.log(res);
        wx.navigateBack({
          url: '/pages/home/home',
          // url: '/pages/person/person?id=' + userInfo.id,
        })
      });
    } else {
      changePwdForm.code = userInfo.code;
      changePassword(changePwdForm).then(res => {
        if (res.data.code !== 200) {
          wx.showModal({
            title: '提示',
            content: res.data.message
          })
          return;
        }
        // console.log('密码修改结果：', res);
        wx.hideLoading()
        wx.showToast({
          title: '密码重置成功',
        })
        wx.reLaunch({
          url: '/pages/index/index',
        })
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