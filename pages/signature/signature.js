// pages/signature/signature.js

/* 
  当前页面不能强制横屏，如果强制横屏的话，返回上一个页面时，上一个页面会显示不全
*/

const MAX_V = 1; // 最大书写速度
const MIN_V = 0; // 最小书写速度
const MAX_LINE_WIDTH = 12; // 最大笔画宽度
const MIN_LINE_WIDTH = 4; // 最小笔画宽度
const MAX_LINE_DIFF = .03; // 两点之间笔画宽度最大差异
let context = null; // canvas上下文
let lastPoint = null; // 包含上一点笔画信息的对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawn: false,
    img: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.canvasInit();
  },

  canvasInit() {
    wx.createSelectorQuery()
      .select('#signature-board') // 在 WXML 中填入的 id
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        res[0].node.width = res[0].width;
        res[0].node.height = res[0].height;
        context = res[0].node.getContext("2d")
      })

  },
  canvasMove(e) {
    this.setData({
      drawn: true
    })
    let currPoint = {
      x: e.changedTouches[0].x, // X坐标
      y: e.changedTouches[0].y, // Y坐标
      t: new Date().getTime(), // 当前时间
      w: (MAX_LINE_WIDTH + MIN_LINE_WIDTH) / 2 /*默认宽度 */
    };
    if (lastPoint) {
      currPoint.w = this.calcLineWidth(currPoint); // 重新赋值宽度，覆盖默认值 
      context.beginPath();
      context.strokeStyle = '#000';
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = currPoint.w;
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(currPoint.x, currPoint.y);
      context.stroke();
    }
    lastPoint = currPoint; // 结束前保存当前点为上一点
  },
  // 计算当前点的宽度，书写速度越快，笔画宽度越小，呈现出笔锋的感觉（笑）
  calcLineWidth(currPoint) {
    let consuming = currPoint.t - lastPoint.t; // 两点之间耗时
    if (!consuming) return lastPoint.w; // 如果当前点用时为0，返回上点的宽度。
    let maxWidth = Math.min(MAX_LINE_WIDTH, lastPoint.w * (1 + MAX_LINE_DIFF)); // 当前点的最大宽度
    let minWidth = Math.max(MIN_LINE_WIDTH, lastPoint.w * (1 - MAX_LINE_DIFF * 3)); // 当前点的最小宽度，变细时速度快所以宽度变化要稍快
    let distance = Math.sqrt(Math.pow(currPoint.x - lastPoint.x, 2) + Math.pow(currPoint.y - lastPoint.y, 2)); // 两点之间距离
    let speed = Math.max(Math.min(distance / consuming, MAX_V), MIN_V); /*当前点速度*/
    let lineWidth = Math.max(Math.min(MAX_LINE_WIDTH * (1 - speed / MAX_V), maxWidth), minWidth); /* 当前点宽度 */
    return lineWidth;
  },
  canvasEnd(e) {
    lastPoint = null; // 每笔画完清除缓存
  },
  canvasClear() {
    this.setData({
      drawn: false,
      img: null
    })
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // context.draw(false);
  },
  canvasOut() {
    wx.navigateBack({
      delta: 1,
    })
  },
  finish() {
    if (!this.data.drawn) {
      return;
    }
    //由于新版的canvas的wx.canvasToTempFilePath方法一直报错，只能通过以下方式来获取签名图片
    const res = context.canvas.toDataURL("image/png");
    // console.log(res);
    // this.setData({
    //   img: res,
    // })
    // 返回上一个页面，并把图片的 base64 数据返回显示
    let pages = getCurrentPages(); //获取page
    let prevPage = pages[pages.length - 2]; //上一个页面（父页面）
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去，oneselfAddress此参数必须在上一页面中的data声明定义。否则传递失败。
    prevPage.setData({
      signature_img: res
    })

    //返回上一页面
    wx.navigateBack({
      delta: 1
    })
    // const fsm = wx.getFileSystemManager();
    // const FILE_BASE_NAME = "tmp_base64src_" + new Date().getTime();
    // const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.png`;
    // fsm.writeFile({
    //   filePath,
    //   data: res.replace(/^data:image\/\w+;base64,/, ""),
    //   encoding: "base64",
    //   success: () => {
    //     console.log(filePath);
    //     this.getOpenerEventChannel().emit('signature', filePath); //传签名图片的临时路径回上一页
    //     // wx.navigateBack();
    //   },
    //   fail() {
    //     wx.showToast({
    //       title: "生成签名失败",
    //       icon: "none"
    //     });
    //   },
    // });
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