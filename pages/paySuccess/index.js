// pages/paySuccess/index.js

const app = getApp();

Page({
  data: {
    payerName: '张三',
    amount: '88.88',
    orderId: '2024090912345678',
    paymentTime: '2024-09-09 14:30:25'
  },

  onLoad(options) {
    // 从上一页面获取支付信息
    const paymentInfo = app.globalData.paymentInfo || {};
    
    this.setData({
      payerName: paymentInfo.payerName || this.data.payerName,
      amount: paymentInfo.amount || this.data.amount,
      orderId: paymentInfo.orderId || this.data.orderId,
      paymentTime: paymentInfo.paymentTime || this.getFormattedTime()
    });

    // 延迟显示返回按钮（可选）
    this.startAutoReturn();
  },

  /**
   * 获取格式化的当前时间
   */
  getFormattedTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  /**
   * 返回首页
   */
  handleBackHome() {
    wx.redirectTo({
      url: '/pages/index/index',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    });
  },

  /**
   * 查看订单详情
   */
  handleViewDetail() {
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${this.data.orderId}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '页面不存在',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 自动返回首页（可选功能）
   */
  startAutoReturn() {
    // 如果需要自动返回，可以设置一个计时器
    // 例如：5秒后自动返回首页
    // setTimeout(() => {
    //   this.handleBackHome();
    // }, 5000);
  },

  /**
   * 分享当前页面
   */
  onShareAppMessage() {
    return {
      title: '支付成功！',
      path: `/pages/paySuccess/paySuccess?orderId=${this.data.orderId}`,
      imageUrl: '/assets/images/share-icon.png'
    };
  },

  /**
   * 页面卸载时清理数据
   */
  onUnload() {
    // 清理全局支付信息
    if (app.globalData) {
      app.globalData.paymentInfo = null;
    }
  }
});