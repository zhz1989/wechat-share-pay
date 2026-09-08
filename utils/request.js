// utils/request.js

const app = getApp();

/**
 * 网络请求工具类
 */
class Request {
  constructor() {
    this.baseUrl = app.globalData.baseUrl;
    this.timeout = 10000;
  }

  /**
   * 发送请求
   * @param {string} url - 请求路径
   * @param {string} method - 请求方法 (GET/POST/PUT/DELETE)
   * @param {object} data - 请求数据
   * @param {object} header - 自定义请求头
   * @returns {Promise}
   */
  request(url, method = 'GET', data = {}, header = {}) {
    return new Promise((resolve, reject) => {
      const fullUrl = this.baseUrl + url;
      
      wx.request({
        url: fullUrl,
        method: method,
        data: data,
        header: {
          'Content-Type': 'application/json',
          ...header
        },
        timeout: this.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            // 业务状态码检查
            if (res.data && res.data.code === 0) {
              resolve(res.data.data || res.data);
            } else {
              reject({
                code: res.data?.code || -1,
                message: res.data?.message || '请求失败',
                data: res.data
              });
            }
          } else if (res.statusCode === 401) {
            // 未授权，需要重新登录
            reject({
              code: 401,
              message: '未授权，请重新登录'
            });
          } else if (res.statusCode === 403) {
            reject({
              code: 403,
              message: '禁止访问'
            });
          } else if (res.statusCode === 404) {
            reject({
              code: 404,
              message: '请求资源不存在'
            });
          } else if (res.statusCode === 500) {
            reject({
              code: 500,
              message: '服务器错误，请稍后重试'
            });
          } else {
            reject({
              code: res.statusCode,
              message: `请求失败: ${res.statusCode}`
            });
          }
        },
        fail: (err) => {
          // 网络错误处理
          if (err.errMsg.includes('timeout')) {
            reject({
              code: -1,
              message: '网络请求超时，请检查网络设置'
            });
          } else if (err.errMsg.includes('request:fail')) {
            reject({
              code: -1,
              message: '网络连接失败，请检查网络'
            });
          } else {
            reject({
              code: -1,
              message: err.errMsg || '网络请求失败'
            });
          }
        }
      });
    });
  }

  get(url, data, header) {
    return this.request(url, 'GET', data, header);
  }

  post(url, data, header) {
    return this.request(url, 'POST', data, header);
  }

  put(url, data, header) {
    return this.request(url, 'PUT', data, header);
  }

  delete(url, data, header) {
    return this.request(url, 'DELETE', data, header);
  }
}

// 导出单例
module.exports = new Request();