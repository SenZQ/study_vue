<!-- 短文详情页 -->
<template>
	<div class="win">
		
		<!-- 导航栏 -->
		<Topbar></Topbar>
		
		<!-- 层级显示（ 返回上一层 ） -->
		<div class="href_level">
			<el-page-header @back="$router.back()" content="详情页面"></el-page-header>
		</div>
		
		<!-- 文本显示 & 评论列表 -->
		<div class="article_container">
			
			<!-- 短文发布者的 头像、名称 -->
			<div class="user">
				<div class="head" @click="toUserInfo(userInfo.id)"><el-avatar size="large" icon="el-icon-user-solid"></el-avatar></div>
				<div class="name">{{ userInfo.name }}</div>
			</div>
			
			<!-- 短文所标记的标签 -->
			<div class="tag">
				<el-tag size="mini">{{ articleInfo.tag }}</el-tag>
			</div>
			
			<!-- 短文内容 -->
			<div class="content">
				<p>{{ articleInfo.content }}</p>
			</div>
			
			<!-- 个人头像与评论框 -->
			<div class="send_comment">
				<!-- 个人头像 -->
				<div class="head">
					<el-avatar size="large" icon="el-icon-user-solid"></el-avatar>
				</div>
				<!-- 评论框 、评论按钮 -->
				<div class="send_comment_input">
					<el-form :model="form" :rules="rules" ref="commentForm">
						<!-- 评论文本框 -->
						<div class="send_comment_input_line w85">
							<el-form-item prop="comment">
								<el-input v-model="form.comment" maxlength="50" show-word-limit placeholder="请输入内容"></el-input>
							</el-form-item>
						</div>
						<!-- 评论按钮 -->
						<div class="send_comment_input_line w15">
							<el-form-item>
								<el-button type="primary" @click="submitForm('commentForm')">评论</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
			
			<!-- 分割线 -->
			<el-divider content-position="left">评论列表</el-divider>
			
			<!-- 评论列表 -->
			<div class="comment_list">
				<!-- 循环渲染评论 -->
				<Comment1 v-for="( item , index ) in articleInfo.comment" :key="item.num" :comment="item"></Comment1>
			</div>
		</div>
		
		<!-- 底部页面占位支撑 -->
		<div class="bottom_bar"></div>
		
	</div>
</template>

<script>
	// 导航栏
	import Topbar from "../../components/Topbar.vue";
	// 评论气泡
	import Comment1 from "../../components/Comment1.vue";
	
	export default {
		
		name:"Article",
		
		components:{
			Topbar,
			Comment1
		},
		
		data(){
			return{
				// form校检规则
				rules:{
					comment:[
						{ required: true, message: '请输入评论', trigger: 'blur' },
					],
				},
				// 评论文本
				form:{
					comment:""
				},
				
			}
		},
		
		computed:{
			// 短文详细信息
			articleInfo(){
				var info;
				this.$store.state.article.map(item=>{
					if( item.num == this.$route.params.num ){
						info = item;
					}
				});
				return info;
			},
			// 短文发布者信息
			userInfo(){
				var info;
				this.$store.state.user.map(item=>{
					if( item.id == this.articleInfo.id ){
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
						// 建立评论
						var obj = {
							id: parseInt(window.localStorage.getItem("testVueId")),
							num: this.articleInfo.comment.length+1,
							content: this.form.comment,
							reply:[]
						}
						// 写入评论
						this.$store.state.article.map(item=>{
							if( item.num == this.$route.params.num ){
								item.comment.push(obj);
							}
						});
						// 初始化 评论框
						this.form.comment="";
					}
					else{
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			// 跳转至短文发布者主页
			toUserInfo(id){
				this.$router.push("/friend/"+id);
			},
		},
		mounted(){
			// 组件挂载时 先判断 是否在 路由地址上 有传入 文章唯一标记
			if( this.$route.params.num == null || this.$route.params.num == undefined || this.$route.params.num == "" ){
				this.$router.push("/");
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.href_level{
		position: absolute;
		left: 50px;
		top: 70px;
	}
	
	.article_container{
		position: relative;
		width: 800px;
		height: auto;
		box-sizing: border-box;
		padding: 50px;
		margin: 120px auto;
		border-radius: 15px;
		box-shadow: 10px 10px 5px #d8e3e7;
		border: solid thin #d8e3e7;
		background-color: #FFF;
		box-sizing: border-box;
		
		.user{
			position: relative;
			height: 40px;
			width: 100%;
			margin-bottom: 15px;
			
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
		
		.tag{
			margin-bottom: 15px;
		}
		
		.content{
			line-height: 32px;
			margin-bottom: 50px;
		}
		
		.send_comment{
			position: relative;
			height: 50px;
			padding-left: 60px;
			box-sizing: border-box;
			margin: 60px 0px 50px 0px;
			
			.head{
				position: absolute;
				left: 0;
				top: 0;
			}
			
			.send_comment_input{
				position: relative;
				width: 100%;
				
				.send_comment_input_line{
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
		}
		
		.comment_list{
			position: relative;
			width: 100%;
			margin-top: 50px;
		}
		
		
	}
	
</style>
