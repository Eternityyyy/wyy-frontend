<template>
	<div class="user">
		<subNav></subNav>
		<router-view></router-view>
	</div>

</template>

<script>
	import subNav from 'views/Header/subNav.vue'
	export default {
		name:"User",
		components:{
			subNav
		}
	}

</script>

<style>

</style>