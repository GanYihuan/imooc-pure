// import { HTTP } from '../../utils/http'
// let http = new HTTP()
import { ClassicModel } from '../../models/classic.js'
let classicModel = new ClassicModel()
import { LikeModel } from '../../models/like.js'
let likeModel = new LikeModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		classic: null,
		latest: true,
		first: false,
		like: false,
		count: 0
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// wx.request({
		// 	url: 'http://bl.7yue.pro/v1/classic/latest',
		// 	header: {
		// 		// appkey: 'RdshydjBvcYZhMZC'
		// 		appkey: 'GgRhTjUNUYn1fHke'
		// 	},
		// 	success: (res) => {
		// 		console.log(this.data.count)
		// 	}
		// })
		// http.request({
		// 	url: 'classic/latest',
		// 	success: res => {
		// 		console.log(res)
		// 	}
		// })
		/* 使用回调函数剥夺了 return 能力 */
		classicModel.getLatest(data => {
			console.log(data)
			/* 数据更新 */
			this.setData({
				classic: data
			})
		})
	},
	onLike: function(event) {
		console.log(event)
		let behavior = event.detail.behavior
		likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
	}
})
