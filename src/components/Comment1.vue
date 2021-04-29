<!-- 短文的评论气泡显示组件 -->
<template>
	<div class="comment1">
		
		<!-- 评论者（ 头像、名称 ） -->
		<div class="user">
			<div class="head" @click="toUserInfo(userInfo.id)"><el-avatar size="large" icon="el-icon-user-solid"></el-avatar></div>
			<div class="name">{{ userInfo.name }}</div>
		</div>
		
		<!-- 评论文本 -->
		<div class="content">
			<p>{{ comment.content }}</p>
		</div>
		
		<!-- 评论功能按钮组（ 回复文本框开关、回复列表开关 ） -->
		<div class="func_bar">
			<el-button size="mini" type="primary" @click="changeReply" v-if="!reply">回复</el-button>
			<el-button size="mini" type="primary" @click="changeReply" plain v-else="reply">取消回复</el-button>
			<el-button size="mini" type="primary" @click="changeOpen" v-if="!open" class="el-icon-arrow-down">{{ comment.reply.length }} 条回复</el-button>
			<el-button size="mini" type="primary" @click="changeOpen" plain v-else="open" class="el-icon-arrow-up"> 收起回复</el-button>
		</div>
		
		<!-- 回复文本框 -->
		<div class="comment_bar" v-show="reply">
			<el-form :model="form" :rules="rules" ref="comment1Form">
				<div class="comment_input_line w85">
					<el-form-item prop="comment">
						<el-input size="mini" v-model="form.comment" maxlength="50" show-word-limit placeholder="请输入内容"></el-input>
					</el-form-item>
				</div>
				<div class="comment_input_line w15">
					<el-form-item>
						<el-button size="mini" type="primary" @click="submitForm('comment1Form')">回复</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		
		<!-- 回复列表 -->
		<div class="comment_list" v-show="open">
			<!-- 分割线 -->
			<el-divider content-position="left"><span style="color:#d1d1d4;">回复</span></el-divider>
			<!-- 循环渲染 回复气泡 -->
			<Comment2 v-for="( item , index ) in comment.reply" :key="index" :reply="item" :commentNum="comment.num"></Comment2>
		</div>
		
	</div>
</template>

<script>
	import Comment2 from "./Comment2.vue";
	
	export default {
		
		name:"Comment1",
		
		components:{
			Comment2    // 引入回复气泡组件
		},
		
		props:["comment"],    // 继承 该条评论的详细信息
		
		data(){
			return{
				// form检验规则
				rules:{
					comment:[
						{ required: true, message: '请输入评论', trigger: 'blur' },
					],
				},
				// 回复文本
				form:{
					comment:""
				},
				// 控制 回复文本框开关
				reply: false,
				// 控制 回复列表
				open: false,
			}
		},
		
		computed:{
			
			// 该条评论的 用户信息
			userInfo(){
				var info;
				this.$store.state.user.map(item=>{
					if( item.id == this.comment.id ){
						info = item;
					}
				});
				return info;
			}
		},
		methods:{
			
			// 提交表单
			submitForm(formName) {
				// 表单校检事件
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 建立回复
						var obj = {
							id: parseInt(window.localStorage.getItem("testVueId")),
							content: this.form.comment,
							to: null
						}
						// 写入回复
						this.$store.state.article.map(item=>{
							if( item.num == this.$route.params.num ){
								item.comment.map(son=>{
									if( son.num == this.comment.num ){
										son.reply.push(obj);
									}
								});
							}
						});
						// 初始化 回复框、两个功能开关
						this.form.comment="";
						this.reply=false;
						this.open=false;
					}
					else{
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			// 回复文本框开关
			changeReply(){
				if( this.reply ){
					this.reply = false;
				}
				else{
					this.reply = true;
				}
			},
			
			// 回复列表开关
			changeOpen(){
				if( this.open ){
					this.open = false;
				}
				else{
					this.open = true;
				}
			},
			
			// 跳转到 该评论发布者的 个人主页
			toUserInfo(id){
				this.$router.push("/friend/"+id);
			},
		}
	}
</script>

<style lang="less" scoped>
	
	.comment1{
		position: relative;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 35px 0px 0px 55px;
		margin-bottom: 50px;
		
		.user{
			position: absolute;
			left: 0;
			top: 0;
			height: 40px;
			width: 100%;
			
			.head{
				position: absolute;
				left: 0;
				top: 0;
				width: 40px;
				height: 40px;
			}
			
			.name{
				position: absolute;
				left: 55px;
				top: 0;
				width: 100px;
				height: 40px;
				line-height: 40px;
			}
		}
		
		.content{
			position: relative;
			width: 100%;
			height: auto;
			font-size: 14px;
		}
		
		.func_bar{
			margin-top: 15px;
		}
		
		.comment_bar{
			position: relative;
			width: 100%;
			margin-top: 10px;
			
			.comment_input_line{
				position: relative;
				display: inline-block;
				
				&.w85{
					width: 85%;
				}
				&.w15{
					width: 15%;
					padding-left: 15px;
					box-sizing: border-box;
				}
			}
		}
		
		.comment_list{
			position: relative;
			width: 100%;
			margin-top: 10px;
		}
	}
</style>
