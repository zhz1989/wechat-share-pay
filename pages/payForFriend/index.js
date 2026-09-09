// pages/payForFriend/index.js

const app = getApp();

Page({
  data: {
    loading: true,
    error: null,
    errorDesc: '',
    paying: false,
    countdownSeconds: 600, // 10分钟
    formattedCountdown: '10:00',
    orderStatus: 0, // 0: 待支付, 1: 支付中, 2: 已完成
    payDetail: {
      initiatorName: '王五',
      initiatorAvatar: 'https://via.placeholder.com/64',
      message: '帮我付一下奶茶钱，谢谢！',
      productName: '奶茶饮品',
      amount: '88.88',
      orderId: '2024090912345678'
    },
    countdownTimer: null
  },

  onLoad(options) {
    // 获取订单ID
    const orderId = options.orderId;
    if (!orderId) {
      this.setData({
        loading: false,
        error: '订单不存在',
        errorDesc: '无法找到相关订单信息，请联系发起人重新发起'
      });
      return;
    }

    // 加载订单详情
    this.loadOrderDetail(orderId);
    // 启动倒计时
    this.startCountdown();
  },

  /**
   * 加载订单详情
   */
  loadOrderDetail(orderId) {
    // 模拟API调用
    setTimeout(() => {
      const payDetail = {
        initiatorName: '王五',
        initiatorAvatar: 'https://via.placeholder.com/64',
        message: '帮我付一下奶茶钱，谢谢！',
        productName: '奶茶饮品',
        amount: '88.88',
        orderId: orderId
      };

      this.setData({
        loading: false,
        payDetail: payDetail
      });
    }, 1000);
  },

  /**
   * 启动倒计时
   */
  startCountdown() {
    let seconds = 600; // 10分钟
    
    const timer = setInterval(() => {
      seconds--;
      
      if (seconds <= 0) {
        clearInterval(timer);
        this.setData({
          countdownSeconds: 0,
          formattedCountdown: '00:00',
          orderStatus: 3 // 已过期
        });
        wx.showToast({
          title: '订单已过期',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      this.setData({
        countdownSeconds: seconds,
        formattedCountdown: formatted
      });
    }, 1000);

    this.setData({
      countdownTimer: timer
    });
  },

  /**
   * 处理支付点击
   */
  onPaymentClick() {
    if (this.data.orderStatus !== 0) {
      wx.showToast({
        title: '订单状态异常',
        icon: 'none'
      });
      return;
    }

    this.setData({
      paying: true,
      orderStatus: 1
    });

    // 调用微信支付接口
    this.requestPayment();
  },

  /**
   * 请求支付
   */
  requestPayment() {
    wx.requestPayment({
      timeStamp: String(Math.floor(Date.now() / 1000)),
      nonceStr: this.generateNonceStr(),
      package: 'prepay_id=wx2412312312312312',
      signType: 'RSA',
      paySign: 'test_pay_sign',
      success: (res) => {
        // 支付成功
        this.handlePaymentSuccess();
      },
      fail: (err) => {
        // 支付失败
        this.setData({
          paying: false,
          orderStatus: 0
        });
        console.error('支付失败:', err);
        wx.showToast({
          title: '支付已取消',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 处理支付成功
   */
  handlePaymentSuccess() {
    this.setData({
      paying: false,
      orderStatus: 2
    });

    // 清除倒��时
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer);
    }

    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    });

    // 延迟跳转到成功页面
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/paySuccess/index',
        fail: (err) => {
          console.error('跳转失败:', err);
        }
      });
    }, 2000);
  },

  /**
   * 生成随机字符串
   */
  generateNonceStr() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  },

  /**
   * 重新加载
   */
  onRetry() {
    this.setData({
      loading: true,
      error: null,
      errorDesc: ''
    });

    // 重新加载订单
    const orderId = this.data.payDetail.orderId;
    this.loadOrderDetail(orderId);
  },

  /**
   * 页面卸载时清理定时器
   */
  onUnload() {
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer);
    }
  },

  /**
   * 分享页面
   */
  onShareAppMessage() {
    return {
      title: `${this.data.payDetail.initiatorName}请你帮付款`,
      path: `/pages/payForFriend/index?orderId=${this.data.payDetail.orderId}`,
      imageUrl: '/assets/images/share-icon.png'
    };
  }
});