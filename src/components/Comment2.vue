<!-- 短文评论的回复气泡显示组件 -->
<template>
	<div class="comment2">
		
		<!-- 回复者（ 头像、名称 ） -->
		<div class="user">
			<div class="head" @click="toUserInfo(userInfo.id)"><el-avatar size="small" icon="el-icon-user-solid"></el-avatar></div>
			<div class="name">{{ userInfo.name }} {{ (toInfo!=null)?"@"+toInfo.name:"" }}</div>
		</div>
		
		<!-- 回复文本 -->
		<div class="content">
			<p>{{ reply.content }}</p>
		</div>
		
		<!-- 回复文本框开关 -->
		<div class="func_bar">
			<el-button size="mini" type="text" @click="changeOpen" v-if="!open">回复</el-button>
			<el-button size="mini" type="text" @click="changeOpen" plain v-else="open">取消回复</el-button>
		</div>
		
		<!-- 回复文本框 -->
		<div class="comment_bar" v-show="open">
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
		
		<!-- 分割线 -->
		<el-divider></el-divider>
		
	</div>
</template>

<script>
	export default {
		
		name: "Comment2",
		
		props:["reply","commentNum"],    // reply 该条回复的具体信息    |    commentNum 该条回复所在评论的唯一序号
		
		data(){
			return{
				// 检验规则
				rules:{
					comment:[
						{ required: true, message: '请输入评论', trigger: 'blur' },
					],
				},
				// 回复内容
				form:{
					comment:""
				},
				// 回复文本框开关
				open: false,
			}
		},
		
		computed:{
			
			// 该条回复的 用户信息
			userInfo(){
				var info;
				this.$store.state.user.map(item=>{
					if( item.id == this.reply.id ){
						info = item;
					}
				});
				return info;
			},
			
			// 该条回复的 回复对象的 用户信息
			toInfo(){
				var info;
				if(this.reply.to!=null){
					this.$store.state.user.map(item=>{
						if( item.id == this.reply.to ){
							info = item;
						}
					});
					return info;
				}
				else{
					return null;
				}
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
							to: this.userInfo.id
						}
						// 写入回复
						this.$store.state.article.map(item=>{
							if( item.num == this.$route.params.num ){
								item.comment.map(son=>{
									if( son.num == this.commentNum ){
										son.reply.push(obj);
									}
								});
							}
						});
						// 初始化 回复框、回复框开关
						this.form.comment="";
						this.open=false;
					}
					else{
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			// 回复文本框开关
			changeOpen(){
				if( this.open ){
					this.open = false;
				}
				else{
					this.open = true;
				}
			},
			
			// 跳转到 该回复发布者的 个人主页
			toUserInfo(id){
				this.$router.push("/friend/"+id);
			},
		}
	}
</script>

<style lang="less" scoped>
	
	.comment2{
		position: relative;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 25px 0px 0px 40px;
		
		.user{
			position: absolute;
			left: 0;
			top: 0;
			height: 28px;
			width: 100%;
			
			.head{
				position: absolute;
				left: 0;
				top: 0;
				width: 28px;
				height: 28px;
			}
			
			.name{
				position: absolute;
				left: 40px;
				top: 0;
				width: 100px;
				height: 28px;
				line-height: 28px;
				font-size: 12px;
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
