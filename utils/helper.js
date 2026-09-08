// utils/helper.js

/**
 * 辅助函数工具类
 */

/**
 * 格式化金额
 * @param {number} amount - 金额（分）
 * @returns {string} 格式化后的金额（元）
 */
function formatMoney(amount) {
  if (!amount) return '0.00';
  return (amount / 100).toFixed(2);
}

/**
 * 格式化时间（倒计时）
 * @param {number} seconds - 秒数
 * @returns {string} 格式化后的时间 (MM:SS)
 */
function formatCountdown(seconds) {
  if (seconds <= 0) return '已过期';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  return `${pad(minutes)}:${pad(secs)}`;
}

/**
 * 数字前补零
 */
function pad(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * 显示加载提示
 */
function showLoading(title) {
  title = title || '加载中...';
  wx.showLoading({
    title: title,
    mask: true
  });
}

/**
 * 隐藏加载提示
 */
function hideLoading() {
  wx.hideLoading();
}

/**
 * 显示成功提示
 */
function showToast(title, duration) {
  duration = duration || 2000;
  wx.showToast({
    title: title,
    icon: 'none',
    duration: duration
  });
}

/**
 * 显示错误提示
 */
function showError(title) {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2500
  });
}

/**
 * 显示模态弹框
 */
function showModal(options) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: options.title || '提示',
      content: options.content || '',
      showCancel: options.showCancel !== false,
      cancelText: options.cancelText || '取消',
      confirmText: options.confirmText || '确定',
      success: (res) => {
        resolve(res.confirm);
      },
      fail: () => {
        reject(new Error('用户取消'));
      }
    });
  });
}

module.exports = {
  formatMoney: formatMoney,
  formatCountdown: formatCountdown,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  showError: showError,
  showModal: showModal
};