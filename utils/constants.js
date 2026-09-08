// utils/constants.js

/**
 * API 端点常量
 */
export const API_ENDPOINTS = {
  // 获取代付详情
  GET_PAY_DETAIL: '/api/sharePay/detail',
  // 获取支付签名
  GET_PAY_SIGN: '/api/sharePay/getPaySign',
  // 支付完成回调
  PAY_CALLBACK: '/api/sharePay/callback',
  // 查询订单状态
  GET_ORDER_STATUS: '/api/sharePay/status'
};

/**
 * 订单状态常量
 */
export const ORDER_STATUS = {
  PENDING: 0,        // 待支付
  PAYING: 1,         // 支付中
  SUCCESS: 2,        // 支付成功
  EXPIRED: 3,        // 已过期
  CANCELLED: 4       // 已取消
};

/**
 * 错误类型
 */
export const ERROR_TYPES = {
  ORDER_EXPIRED: 'ORDER_EXPIRED',           // 订单已过期
  ORDER_PAID: 'ORDER_PAID',                 // 订单已完成支付
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',       // 订单不存在
  PAYMENT_FAILED: 'PAYMENT_FAILED',         // 支付失败
  NETWORK_ERROR: 'NETWORK_ERROR',           // 网络错误
  INVALID_TOKEN: 'INVALID_TOKEN'            // 无效的token
};

/**
 * 倒计时时间（秒）
 */
export const COUNTDOWN_TIME = 600; // 10分钟

/**
 * 页面路由
 */
export const ROUTES = {
  SHARE_PAY: '/pages/sharePay/index',
  PAY_FOR_FRIEND: '/pages/payForFriend/index',
  PAY_SUCCESS: '/pages/paySuccess/index'
};