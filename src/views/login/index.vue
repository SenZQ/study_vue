<template>
	<div class="container">
		<h1>广东机电职教集团产教融合信息服务平台</h1>
		<div class="login_container">
			<!-- 
				:rules="rules"     饿了么组件库特有的表单校检规则，rules 校检规则在
			-->
			<el-form :model="loginForm" :rules="rules" label-width="100px" status-icon ref="loginForm" class="demo-ruleForm">
				<!--
					<el-form-item>    prop 属性，用于将内部得表单元素和 表单的校检规则绑定
				-->
				<el-form-item label="账号" prop="id">
					<el-input type="text"  v-model="loginForm.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">提交</el-button>
					<el-button @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name:"Login",
	    data() {
			return {
				loginForm: {
					id:'',
					pass: ''
				},
				
				// 表单校验规则
				rules: {
					pass: [
						/*
							required   必填项
							
							message    文本域空时的信息
							
							trigger    校检触发动作
						*/
						{ required: true, message: '请输入密码', trigger: 'blur' },
					],
					id: [
						{ required: true, message: '请输入账号', trigger: 'blur' },
					]
				}
			};
		},
		methods: {
			resetForm(){
				this.$refs['loginForm'].resetFields();
			},
			submitForm() {
				this.$refs['loginForm'].validate((valid) => {
					if (valid) {
						this.$store.commit("login",this.loginForm);
						if( this.$store.state.loginId == this.loginForm.id ){
							console.log("登陆成功");
							window.localStorage.setItem("testVueId",this.loginForm.id);
							this.$router.push("/");
						}
						else{
							console.log("登陆失败");
							this.$alert('用户名或密码错误', {confirmButtonText:'关闭'});
						}
					}
					else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		mounted(){
			if( (window.localStorage.getItem("testVueId") != undefined || window.localStorage.getItem("testVueId") != null) && window.localStorage.getItem("testVueId") != "" ){
				this.$router.push("/");
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "./index.less";
</style>
