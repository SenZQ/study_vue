<template>
	<div class="win">
		
		<!-- 导航栏 -->
		<Topbar></Topbar>
		
		<!-- 层级显示 -->
		<div class="href_level">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>发布</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<!-- 表单内容区 -->
		<div class="send_container">
			<el-form ref="form" :rules="rules" :model="form" label-width="100px">
				<!-- 发布内容 -->
				<el-form-item label="发布内容:" prop="cont">
					<el-input :autosize="{ minRows: 8, maxRows: 8}" resize="false" maxlength="200" show-word-limit type="textarea" v-model="form.cont"></el-input>
				</el-form-item>
				<!-- 标签 -->
				<el-form-item label="标签" prop="tagName">
					<el-radio-group v-model="form.tagName">
						<el-radio label="英语" border></el-radio>
						<el-radio label="美食" border></el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- 发布板块 -->
				<el-form-item label="发布板块:">
					<el-select v-model="form.region" placeholder="请选择发布的板块">
						<el-option label="板块一" :value="1"></el-option>
						<el-option label="板块二" :value="2"></el-option>
						<el-option label="板块三" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<!-- 发布按钮 -->
				<div style="text-align:right;">
					<el-button type="primary" @click="submitForm('form')">发布</el-button>
				</div>
			</el-form>
		</div>
		
	</div>
</template>

<script>
	// 导航栏
	import Topbar from "../../components/Topbar.vue";
	
	export default {
		
		name:"Send",
		
		components:{
			Topbar,
		},
		
		data(){
			return{
				// 表单校验规则
				rules: {
					cont: [
						{ required: true, message: '请输入内容', trigger: 'blur' },,
					],
					tagName: [
						{ required: true, message: '请选择标签', trigger: 'blur' },
					],
				},
				// 发布的短文内容
				form:{
					cont:"",
					tagName:"",
					region: 1 // 与 select 组件绑定后，可在此处设定默认值
				},
			}
		},
		methods:{
			// 提交表单
			submitForm(formName) {
				// 表单校检事件
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 生成短文对象
						var obj = {
							num: this.$store.state.article.length+1,
							id: parseInt(window.localStorage.getItem("testVueId")),
							content: this.form.cont,
							tag:"英语",
							star:0,
							part: this.form.region,
							comment:[]
						}
						// 写入短文对象
						this.$store.state.article.push(obj);
						this.$router.push("/");
					}
					else{
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		
		mounted(){
			// 挂载时检测是否有登陆状态
			this.$store.state.loginId = parseInt(window.localStorage.getItem("testVueId"));
			if( window.localStorage.getItem("testVueId") == undefined || window.localStorage.getItem("testVueId") == null || window.localStorage.getItem("testVueId") == "" ){
				this.$router.push("/login");
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
	
	.send_container{
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
	}
	
</style>
