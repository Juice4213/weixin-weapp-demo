function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const URI = 'https://shop.xxbmm.com/sharebuy/'
/**
 * 网络请求封装
 * @params  url     : api
 *          params  : 请求参数
 *          bool    : 判断是否读取用户信息
 *          resolve : 成功回调
 *          reject  : 失败回调
 */
function fetchApi(url, params, bool, resolve, reject) {
  if (bool) {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        request(url, Object.assign(params, { userId: res.data.userId, userkey: res.data.userKey }), resolve, reject);
      },
      fail: function () {
        console.log('getIndex is error.')
      }
    });
  } else {
    request(url, params, resolve, reject);
  }
}

function request(url, params, resolve, reject) {
  var path = url;
  if (path.indexOf('http') < 0) {
    path = `${URI}${path}`;
  }
  wx.request({
    url: path,
    data: params,
    header: { 'Content-Type': 'application/json' },
    success: resolve,
    fail: reject
  })
}






module.exports = {
  formatTime: formatTime,
  fetchApi: fetchApi
}
