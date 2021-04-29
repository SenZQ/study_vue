<!-- 全局通用顶部导航栏 -->
<template>
	<div class="top_bar">
		
		<!-- 标题 -->
		<span>广东机电职教集团产教融合信息服务平台</span>
		
		<!-- 按钮 -->
		<div class="btn_list">
			
			<!-- 前往个人主页 -->
			<el-button type="text" @click="toUserInfo">简历</el-button>
			
			<!-- 头像 -->
			<div class="head">
				<el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
			</div>
			
			<!-- 修改个人信息 & 退出登录 -->
			<div class="menu">
				<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#001529" text-color="#fff" active-text-color="#fff">
					<el-submenu index="1">
						<!-- 外部默认标题 -->
						<template slot="title">我的工作台</template>
						<!-- 功能按钮（ 修改个人信息 & 退出登录 ） -->
						<el-menu-item index="1-1" @click="toInfo">修改个人信息</el-menu-item>
						<el-menu-item index="1-2" @click="unlogin">退出</el-menu-item>
					</el-submenu>
				</el-menu>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		
		name:"Topbar",
		
		data() {
			return {
			};
		},
		
		methods: {
			
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			
			// 前往个人主页
			toUserInfo(){
				this.$router.push("/friend/"+window.localStorage.getItem("testVueId"));
			},
			
			// 修改个人信息
			toInfo(){
				this.$router.push("/info");
			},
			
			// 退出登录
			unlogin(){
				window.localStorage.setItem("testVueId","");
				this.$router.push("/login");
			},
		}
	}
</script>

<style lang="less" scoped>
	.top_bar{
		position: fixed;
		left: 0;
		top: 0;
		height: 50px;
		width: 100%;
		background: #001529;
		color: #FFF;
		line-height: 50px;
		box-sizing: border-box;
		padding-left: 50px;
		overflow: hidden;
		z-index: 10;
		
		span{
			font-size: 18px;
		}
		
		.btn_list{
			position: absolute;
			top: 0;
			right: 50px;
			height: 100%;
			width: auto;
			display: flex;
			padding-right: 130px;
			
			.head{
				margin: 0 20px;
				display: flex;
				align-items: center;            // 垂直居中
			}
			
			.menu{
				position: absolute;
				right: 0;
				top: -5px;
				overflow: hidden;
			}
		}
	}
</style>
