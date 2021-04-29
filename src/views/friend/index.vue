<!-- 个人主页 -->
<template>
	<div class="win">
		
		<!-- 导航栏 -->
		<Topbar></Topbar>
		
		<!-- 层级显示（ 返回上一层 ） -->
		<div class="href_level">
			<el-page-header @back="$router.back()" content="个人信息"></el-page-header>
		</div>
		
		<!-- 个人内容 -->
		<div class="self_container">
			
			<!-- 个人基本信息（ 头像、名称 ） -->
			<div class="self_info">
				<div class="head">
					<el-avatar :size="100" icon="el-icon-user-solid"></el-avatar>
				</div>
				<div class="name">{{ userInfo.name }}</div>
			</div>
			
			<!-- TAB 标签栏 -->
			<div class="tab_bar">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					
					<!-- 短文 -->
					<el-tab-pane label="短文" name="first">
						<!-- 容器 -->
						<div class="content_container">
							<!-- 渲染该用户的短文气泡 -->
							<Bubbles v-for="( item , index ) in article" v-if="(index<=pageIndex*pageSize-1&&index>pageIndex*pageSize-1-pageSize)?true:false" :userid="item.id" :articleid="item.num">
								<span slot="text">{{ item.content }}</span>
								<span slot="tag">{{ item.tag }}</span>
								<span slot="star">{{ item.star }}</span>
							</Bubbles>
							<!-- 分页 -->
							<div class="pagination">
								<el-pagination @current-change="handleCurrentChange" :current-page="pageIndex" background hide-on-single-page :total="itemTotel" layout="prev, pager, next" :page-size="pageSize"></el-pagination>
							</div>
						</div>
					</el-tab-pane>
					
					<!-- 个人信息 -->
					<el-tab-pane label="个人信息" name="second">
						<!-- 容器 -->
						<div class="content_container">
							<p>{{ userInfo.gender }}</p>
							<br/>
							<p>{{ userInfo.date }}</p>
							<br/>
							<p>{{ userInfo.desc }}</p>
							<br/>
						</div>
					</el-tab-pane>
					
				</el-tabs>
			</div>
			
		</div>
		
		
		<!-- 底部页面占位支撑 -->
		<div class="bottom_bar"></div>
		
	</div>
</template>

<script>
	// 导航栏
	import Topbar from "../../components/Topbar.vue";
	// 短文气泡
	import Bubbles from "../../components/Bubbles.vue";
	
	export default {
		
		name: "Friend",
		
		components:{
			Topbar,
			Bubbles
		},
		
		data(){
			return{
				activeName:"first", // 把 <el-tab-pane> 的 name 属性绑定给 <el-tabs>
				pageIndex:1,        // 默认显示页
				pageSize:5,         // 每页显示条数
			}
		},
		
		computed:{
			// 用户详细信息
			userInfo(){
				var info;
				this.$store.state.user.map(item=>{
					if( item.id == this.$route.params.id ){
						info = item;
					}
				});
				return info;
			},
			// 用户所发布的短文
			article(){
				var arr = [];
				this.$store.state.article.map(item=>{
					if( item.id == this.$route.params.id ){
						arr.push( item );
					}
				});
				return arr;
			},
			// 用户所发布的短文条数
			itemTotel(){
				return this.article.length;
			},
		},
		methods:{
			
			handleClick(tab, event){
				// console.log(tab, event);
			},
			
			// 换页事件
			handleCurrentChange(val) {
				this.pageIndex = val;
				console.log(this.pageIndex);
			},
		}
	}
</script>

<style lang="less" scoped>
	
	.href_level{
		position: absolute;
		left: 50px;
		top: 70px;
	}
	
	.self_container{
		position: relative;
		width: 1000px;
		height: auto;
		box-sizing: border-box;
		padding: 50px;
		margin: 120px auto;
		border-radius: 15px;
		box-shadow: 10px 10px 5px #d8e3e7;
		border: solid thin #d8e3e7;
		background-color: #FFF;
		box-sizing: border-box;
		
		.self_info{
			position: relative;
			width: 100%;
			height: 100px;
			
			.head{
				position: absolute;
				left: 0;
				top: 0;
			}
			
			.name{
				position: absolute;
				width: 100px;
				height: 100px;
				left: 140px;
				line-height: 100px;
				font-size: 18px;
			}
		}
		
		.tab_bar{
			position: relative;
			top: 30px;
		}
		
		.content_container{
			position: relative;
			width: 100%;
			height: auto;
			padding: 30px 0px 80px 0px;
			
			.pagination{
				position: absolute;
				bottom: 20px;
			}
		}
	}
	
</style>
