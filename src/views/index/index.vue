<!-- 主页 -->
<template>
	<div class="win">
		
		<!-- 导航栏 -->
		<Topbar></Topbar>
		
		<!-- 左侧栏（ 控制内容板块显示 ） -->
		<div class="side_bar">
			<el-menu default-active="0" @select="handleSelect" background-color="#001529" text-color="#fff" active-text-color="#409EFF" class="el-menu-vertical-demo">
				<el-menu-item index="0">
					<i class="el-icon-menu"></i>
					<span slot="title">所有板块</span>
				</el-menu-item>
				<el-menu-item index="1">
					<i class="el-icon-menu"></i>
					<span slot="title">板块 - 1</span>
				</el-menu-item>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">板块 - 2</span>
				</el-menu-item>
				<el-menu-item index="3">
					<i class="el-icon-menu"></i>
					<span slot="title">板块 - 3</span>
				</el-menu-item>
			</el-menu>
		</div>
		
		<!-- 右侧栏 ( 显示简单个人功能 ) -->
		<div class="info_area">
			<InfoBlock @searchArticleF="searchArticleF"></InfoBlock>
		</div>
		
		<!-- 中部内容栏 -->
		<div class="content">
			<!-- 渲染所有符合筛选条件的短文气泡 -->
			<Bubbles v-for="( item , index ) in article" :key="item.num" v-if="(index<=pageIndex*pageSize-1&&index>pageIndex*pageSize-1-pageSize)?true:false" :userid="item.id" :articleid="item.num">
				<span slot="text">{{ item.content }}</span>
				<span slot="tag">{{ item.tag }}</span>
				<span slot="star">{{ item.star }}</span>
			</Bubbles>
			<!-- 分页组件 -->
			<div class="pagination">
				<el-pagination @current-change="handleCurrentChange" :current-page="pageIndex" background hide-on-single-page :total="itemTotel" layout="prev, pager, next" :page-size="pageSize"></el-pagination>
			</div>
		</div>
		
		
		
		<!-- 底部页面占位支撑 -->
		<div class="bottom_bar" style="height: 200px;"></div>
		
	</div>
	
</template>

<script>
	// 导航栏
	import Topbar from "../../components/Topbar.vue";
	// 个人块
	import InfoBlock from "../../components/InfoBlock.vue";
	// 短文气泡
	import Bubbles from "../../components/Bubbles.vue";
	
	export default {
		
		name:"Home",
		
		components:{
			Topbar   ,
			InfoBlock,
			Bubbles
		},
		
		data(){
			return{
				articlePart:0,      // 当前显示模块
				pageIndex:1,        // 当前页
				pageSize:5,         // 每页条数
				searchArticle:"",   // 搜索框的文本
			}
		},
		
		computed:{
			// 所有符合条件的短文条数
			itemTotel(){
				return this.article.length;
			},
			// 所有符合条件的短文
			article(){
				var arr = [];
				if( this.searchArticle != "" ){
					this.$store.state.article.map(item=>{
						if( item.content.indexOf( this.searchArticle ) > -1 ){
							arr.push(item);
						}
					});
				}
				else{
					if( this.articlePart == 0 ){
						arr = this.$store.state.article
					}
					else{
						this.$store.state.article.map(item=>{
							if( this.articlePart==item.part ){
								arr.push(item);
							}
						});
					}
				}
				this.pageIndex = 1;
				return arr;
			}
		},
		
		methods:{
			
			// 选择显示板块
			handleSelect(key, keyPath){
				this.searchArticle = "";   // 清楚搜索关键字
				this.pageIndex = 1;
				this.articlePart = key;
			},
			
			// 换页事件
			handleCurrentChange(val) {
				this.pageIndex = val;
				console.log(this.pageIndex);
			},
			
			// 同步搜索关键字
			searchArticleF( str ){
				this.searchArticle = str;
				console.log(this.searchArticle)
			}
		},
		
		mounted(){
			// 挂载时检测是否有登陆
			this.$store.state.loginId = parseInt(window.localStorage.getItem("testVueId"));
			if( window.localStorage.getItem("testVueId") == undefined || window.localStorage.getItem("testVueId") == null || window.localStorage.getItem("testVueId") == "" ){
				this.$router.push("/login");
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.win{
		position: relative !important;
		margin: 0 auto !important;
		box-sizing: border-box;
		padding: 0 300px;
		max-width: 1500px;
	}
	
	.side_bar{
		position: absolute;
		left: 50px;
		width: 250px;
		top: 70px;
	}
	
	.info_area{
		position: absolute;
		right: 50px;
		top: 70px;
		width: 250px;
		height: 300px;
	}
	
	.content{
		position: relative;
		height: auto;
		width: 100%;
		min-height: 100%;
		max-height: 900px;
		box-sizing: border-box;
		padding: 70px 10px 0px 10px;
		z-index: 1;
	}
	
	.pagination{
		position: absolute;
		bottom: -100px;
	}
</style>
