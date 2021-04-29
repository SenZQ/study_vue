<template>
  <div id="app">
	  <router-view></router-view>
  </div>
</template>

<script>
	export default {
		data(){
			return{
				// ...
			}
		},
		methods:{
			// ...
		},
	}
</script>

<style lang="less">
	
	body{
		background-color: #f4f9f9;
	}
	
	#app{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		
		.win{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			min-width: 1150px;
		}
		
		
		.container{
			position: relative;
			margin: 0 auto;
			width: 1150px;
			height: 100%;
		}
	}
	
	.bottom_bar{
		position: relative;
		width: 100%;
		height: 10px;
	}
</style>
