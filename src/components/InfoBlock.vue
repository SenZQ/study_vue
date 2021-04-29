<!-- 显示在主页右侧的个人小框 -->
<template>
	<div class="info_block">
		
		<!-- 搜索框 -->
		<el-input placeholder="请输入内容" prefix-icon="el-icon-search" clearable v-model="searchInput" @keyup.enter.native="searchText"></el-input>
		
		<!-- 头像框 & 发布按钮 -->
		<div class="info_bar">
			<!-- 头像 -->
			<div class="head_bar">
				<el-avatar icon="el-icon-user-solid" :size="80"></el-avatar>
				<p>{{userName}}</p>
			</div>
			<!-- 发布按钮 -->
			<el-button type="primary" @click="toSend" round>发东西</el-button>
		</div>
		
	</div>
</template>

<script>
	export default {
		
		data(){
			return{
				// 搜索框文本
				searchInput:""
			}
		},
		
		methods:{
			
			// 将搜索框的内容返回到父级组件（ 主页 ）
			searchText(){
				this.$emit("searchArticleF",this.searchInput);
			},
			
			// 点击发布，跳转至发布页面
			toSend(){
				this.$router.push("/send");
			}
		},
		
		computed:{
			
			// 后去当前登陆的用户名
			userName(){
				var name = ""
				this.$store.state.user.map(item=>{
					if( item.id == parseInt(window.localStorage.getItem("testVueId")) ){
						name = item.name
					}
				});
				return name;
			}
		}
	}
</script>

<style lang="less" scoped>
	.info_block{
		position: absolute;
		width: 250px;
		height: 300px;
		
		.info_bar{
			position: absolute;
			left: 0;
			top: 50px;
			width: 100%;
			height: 250px;
			background-color: #fff;
			border: 1px solid #DCDFE6;
			box-sizing: border-box;
			border-radius: 4px;
			text-align: center;
			padding-top: 30px;
			
			p{
				margin-bottom: 30px;
				font-size: 14px;
			}
		}
	}
</style>
