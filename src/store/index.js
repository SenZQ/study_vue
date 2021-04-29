import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 用户
		user:[
			{
				num: 1,
				name: "赵二",
				gender: "男",
				date: "Mon Apr 26 2021",
				desc: "俺叫赵二",
				id: 13111111111,
				pass: 111111,
			},
			{
				num: 2,
				name: "张三",
				gender: "男",
				date: "Mon Apr 26 2021",
				desc: "俺叫张三",
				id: 13222222222,
				pass: 222222,
			},
			{
				num: 3,
				name: "李四",
				gender: "男",
				date: "Mon Apr 26 2021",
				desc: "俺叫李四",
				id: 13333333333,
				pass: 333333,
			},
		],
		// 文章
		article:[
			{
				num:1,
				id:13111111111,
				content:"（ 板块一 ）生活就像海洋，只有意志坚强的人，才能到达彼岸",
				tag:"英语",
				star:0,
				part:1,
				comment:[
					{
						id:13222222222,
						num:1,
						content:"生活就像海洋",
						reply:[
							{
								id:13111111111,
								content:"只有意志坚强的人",
								to:null
							},
							{
								id:13222222222,
								content:"才能到达彼岸",
								to:13111111111
							},
						]
					}
				]
			},
			{
				num:2,
				id:13222222222,
				content:"（ 板块一 ）鸡扒饭好好吃",
				tag:"美食",
				star:0,
				part:1,
				comment:[
					{
						id:13333333333,
						num:1,
						content:"阿叔人很好",
						reply:[
							{
								id:13222222222,
								content:"每次去都加鸡蛋",
								to:null
							},
							{
								id:13333333333,
								content:"可惜很快就没得吃了",
								to:13222222222
							},
						]
					}
				]
			},
			
			{
				num:3,
				id:13111111111,
				content:"（ 板块二 ）生活就像海洋，只有意志坚强的人，才能到达彼岸",
				tag:"英语",
				star:0,
				part:2,
				comment:[
					{
						id:13222222222,
						num:1,
						content:"生活就像海洋",
						reply:[
							{
								id:13111111111,
								content:"只有意志坚强的人",
								to:null
							},
							{
								id:13222222222,
								content:"才能到达彼岸",
								to:13111111111
							},
						]
					}
				]
			},
			{
				num:4,
				id:13222222222,
				content:"（ 板块二 ）鸡扒饭好好吃",
				tag:"美食",
				star:0,
				part:2,
				comment:[
					{
						id:13333333333,
						num:1,
						content:"阿叔人很好",
						reply:[
							{
								id:13222222222,
								content:"每次去都加鸡蛋",
								to:null
							},
							{
								id:13333333333,
								content:"可惜很快就没得吃了",
								to:13222222222
							},
						]
					}
				]
			},
			
			{
				num:5,
				id:13111111111,
				content:"（ 板块三 ）生活就像海洋，只有意志坚强的人，才能到达彼岸",
				tag:"英语",
				star:0,
				part:3,
				comment:[
					{
						id:13222222222,
						num:1,
						content:"生活就像海洋",
						reply:[
							{
								id:13111111111,
								content:"只有意志坚强的人",
								to:null
							},
							{
								id:13222222222,
								content:"才能到达彼岸",
								to:13111111111
							},
						]
					}
				]
			},
			{
				num:6,
				id:13222222222,
				content:"（ 板块三 ）鸡扒饭好好吃",
				tag:"美食",
				star:0,
				part:3,
				comment:[
					{
						id:13333333333,
						num:1,
						content:"阿叔人很好",
						reply:[
							{
								id:13222222222,
								content:"每次去都加鸡蛋",
								to:null
							},
							{
								id:13333333333,
								content:"可惜很快就没得吃了",
								to:13222222222
							},
						]
					}
				]
			},
		],
		// 当前登录用户
		loginId:null,
	},
	mutations: {
		
		// 登录事件
		login( state , form ){
			// 信息确认之后，将用户写进 store
			state.user.map(item=>{
				if( form.id == item.id && form.pass == item.pass ){
					state.loginId = form.id;
				}
			});
			
		}
	},
	actions: {
	},
	modules: {
	}
})
