import { config } from '../config.js'

const tips = {
	1: '出现一个错误!',
	1005: 'appkey 无效',
	3000: '期刊不存在'
}

class HTTP {
	constructor() {
		this.baseRestUrl = config.api_blink_url
	}
	/* http 请求类, 当 noRefech 为 true 时，不做未授权重试机制 */
	request(params) {
		// let that = this
		let url = this.baseRestUrl + params.url
		if (!params.method) {
			params.method = 'GET'
		}
		wx.request({
			url: url,
			data: params.data,
			method: params.method,
			header: {
				'content-type': 'application/json',
				appkey: config.appkey
			},
			success: res => {
				/*
        判断以2（2xx)开头的状态码为正确
				异常不要返回到回调中，就在 request 中处理，记录日志并 showToast 一个统一的错误即可
        */
				let code = res.statusCode.toString()
				if (code.startsWith('2')) {
          /* params.success 是否为 null, 如果不是则执行后面代码 */
					params.success && params.success(res.data)
				} else {
					// wx.showToast({
					//   title: '出错了!',
					//   icon: 'none',
					//   duration: 2000
					// })
          params.error && params.error(res)
          let error_code = res.data.error_code
          this._show_error(error_code)
				}
      },
      /* 没网络时才调用 */
			fail: err => {
        // wx.showToast({
        //   title: '出错了!',
        //   icon: 'none',
        //   duration: 2000
        // })
        params.fail && params.fail(err)
        this._show_error(1)
			}
		})
	}
	_show_error(error_code) {
		wx.showToast({
			title: tips[error_code],
			icon: 'none',
			duration: 2000
		})
	}
}

export { HTTP }
