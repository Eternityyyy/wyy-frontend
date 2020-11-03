<template>
	<subNav></subNav>
	<div class="discover">
		<!-- 副导航的链接路由视图出口 -->
		<router-view></router-view>
	</div>

</template>

<script>
	import subNav from 'views/Header/subNav.vue'
	
	export default {
		name:'discover',
		components:{
			subNav,
		},
		data(){
			return {
				
			}
		},
		
	}
</script>

<style>
</style>
