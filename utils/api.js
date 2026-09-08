// utils/api.js

const request = require('./request');
const { API_ENDPOINTS } = require('./constants');

/**
 * API 请求类
 */
class API {
  /**
   * 获取代付详情
   * @param {string} orderToken - 订单token
   * @returns {Promise}
   */
  getPayDetail(orderToken) {
    return request.get(API_ENDPOINTS.GET_PAY_DETAIL, {
      orderToken: orderToken
    });
  }

  /**
   * 获取支付签名
   * @param {string} orderToken - 订单token
   * @returns {Promise}
   */
  getPaySign(orderToken) {
    return request.post(API_ENDPOINTS.GET_PAY_SIGN, {
      orderToken: orderToken
    });
  }

  /**
   * 支付完成回调
   * @param {string} orderToken - 订单token
   * @param {object} paymentData - 支付数据
   * @returns {Promise}
   */
  payCallback(orderToken, paymentData) {
    return request.post(API_ENDPOINTS.PAY_CALLBACK, {
      orderToken: orderToken,
      ...paymentData
    });
  }

  /**
   * 查询订单状态
   * @param {string} orderToken - 订单token
   * @returns {Promise}
   */
  getOrderStatus(orderToken) {
    return request.get(API_ENDPOINTS.GET_ORDER_STATUS, {
      orderToken: orderToken
    });
  }
}

module.exports = new API();