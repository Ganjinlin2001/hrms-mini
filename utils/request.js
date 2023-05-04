/* 
  封装微信官方的请求方法
*/

import baseURL from '../utils/config';

// console.log(baseURL);

// 请求地址
// const baseURL = 'http://10.34.92.34:7001';
// const baseURL = 'http://127.0.0.1:7001';

const request = ({
  url,
  method,
  data
}) => {
  console.log("2-data: ", data);
  // return new Promise();
  return new Promise((resolve, reject) => {
    // console.warn("test");
    // 实际发请求的地方
    wx.request({
      url: baseURL + url,
      method,
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        wx.hideLoading();
        console.log(3, res);
        if (res.data.code !== 200) {
          console.log('弹窗提醒');
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        } else {
          if (res.data.result != undefined) {
            if (res.data.message) {
              wx.showToast({
                title: res.data.message,
                icon: 'success',
              })
            }
          }
        }
        console.log(4);
        console.log(res);
        resolve(res);
      },
      fail: err => {
        wx.hideLoading();
        // console.log(err);
        reject(err);
      }
    })
  })
}

export default request;