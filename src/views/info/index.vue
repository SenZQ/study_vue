<template>
	<div class="win">
		
		<!-- 导航栏 -->
		<Topbar></Topbar>
		
		<!-- 层级显示 -->
		<div class="href_level">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>个人信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<!-- 表单内容区 -->
		<div class="info_container">
			<!-- 头像 -->
			<el-avatar icon="el-icon-user-solid" :size="120"></el-avatar>
			<p class="tips">图片格式：jpg / png</p>
			<br/>
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<!-- 用户名 -->
				<el-form-item label="用户名称:" prop="name">
					<div style="width: 220px;">
						<el-input v-model="form.name" maxlength="10" show-word-limit placeholder="用户名称"></el-input>
					</div>
				</el-form-item>
				<!-- 性别 -->
				<el-form-item label="性别" prop="gender">
					<el-radio-group v-model="form.gender">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- 出生年月 -->
				<el-form-item label="出生年月:" prop="date">
					<el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<!-- 个人介绍 -->
				<el-form-item label="个人介绍:">
					<el-input :autosize="{ minRows: 3, maxRows: 3}" resize="false" maxlength="200" show-word-limit type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
				<!-- 保存按钮 -->
				<div style="text-align:right;">
					<el-button type="primary" @click="submitForm('form')">保存</el-button>
				</div>
			</el-form>
		</div>
		
	</div>
</template>

<script>
	// 导航栏
	import Topbar from "../../components/Topbar.vue";
	
	export default {
		
		name:"Info",
		
		components: {
			Topbar
		},
		
		data(){
			return{
				// 表单校验规则
				rules: {
					name: [
						{ required: true, message: '请输入呢称', trigger: 'blur' },
					],
					gender: [
						{ required: true, message: '请选择性别', trigger: 'blur' },
					],
					date: [
						{ required: true, message: '请选择日期', trigger: 'blur' },
					]
				},
				// 表单内容
				form:{
					name:"",
					gender:"",
					desc:"",
					date:""
				}
			}
		},
		
		methods:{
			// 提交表单
			submitForm(formName) {
				// 表单校检事件
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 寻找用户、修改信息
						this.$store.state.user.map(item=>{
							if( item.id == this.$store.state.loginId ){
								item.name   = this.form.name;
								item.gender = this.form.gender;
								item.desc   = this.form.desc;
								item.date   = this.form.date;
							}
						});
						// 返回上一页
						this.$router.back();
					}
					else{
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		
		mounted(){
			
			// 检测是否处于登陆状态，有的话往文本域填充原来信息
			this.$store.state.loginId = parseInt(window.localStorage.getItem("testVueId"));
			if( window.localStorage.getItem("testVueId") == undefined || window.localStorage.getItem("testVueId") == null || window.localStorage.getItem("testVueId") == "" ){
				this.$router.push("/login");
			}
			else{
				this.$store.state.user.map(item=>{
					if( item.id == this.$store.state.loginId ){
						this.form.name   = item.name;
						this.form.gender = item.gender;
						this.form.desc   = item.desc;
						this.form.date   = item.date;
					}
				});
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
	
	.info_container{
		position: relative;
		width: 700px;
		height: auto;
		box-sizing: border-box;
		// padding: 50px 300px 50px 50px;
		padding: 50px;
		margin: 70px auto;
		border-radius: 15px;
		box-shadow: 10px 10px 5px #d8e3e7;
		border: solid thin #d8e3e7;
		background-color: #FFF;
		box-sizing: border-box;
		
		.tips{
			font-size: 14px;
			color: #c0c4cc;
		}
	}
	
</style>
