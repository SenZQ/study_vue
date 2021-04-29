<!-- 短文本气泡显示组件 -->
<template>
	<div class="bubbles_item">
		
		<!-- 头像 -->
		<div class="head_img" @click="toUserInfo(userid)">
			<el-avatar size="large" icon="el-icon-user-solid"></el-avatar>
		</div>
		
		<!-- 内容区域 -->
		<div class="content_area">
			<!-- 文本 -->
			<p class="text" @click="toArticleInfo(articleid)"><slot name="text"></slot></p>
			<!-- 标签 -->
			<p class="tag">
				<span>
					<el-tag size="mini"><slot name="tag"></slot></el-tag>
				</span>
			</p>
			<!-- 功能按钮（ 点赞 ） -->
			<div class="func_bar">
				<el-button class="el-icon-star-off" size="mini" @click="getStar(articleid)" round>赞&nbsp;&nbsp;<slot name="star"></slot></el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		
		name:"Bubbles",
		
		props:['userid','articleid'],    //    userid 用户 ID    |    articleid 文章 ID
		
		data(){
			return{
				// ...
			}
		},
		
		methods:{
			
			// 前往用户个人主页
			toUserInfo(id){
				this.$router.push("/friend/"+id);
			},
			
			// 前往短文详情页
			toArticleInfo(num){
				this.$router.push("/article/"+num);
			},
			
			// 点赞短文
			getStar(num){
				this.$store.state.article.map(item=>{
					if( item.num == num ){
						item.star++
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.bubbles_item{
		position: relative;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding-left: 50px;
		margin-bottom: 20px;
		
		.head_img{
			position: absolute;
			left: 0;
			top: 0;
			cursor: pointer;
		}
		
		.content_area{
			position: relative;
			width: 100%;
			height: auto;
			border-radius: 10px;
			background-color: #d8e3e7;
			box-sizing: border-box;
			padding: 10px 10px 10px 16px;
			
			.text{
				position: relative;
				width: 100%;
				height: auto;
				color: #2978b5;
				margin: 5px 0px 0px 0px;
				cursor: pointer;
			}
			
			.tag{
				//
			}
			
			.func_bar{
				position: absolute;
				display: inline-block;
				right: 10px;
				bottom: 10px;
			}
		}
	}
</style>
