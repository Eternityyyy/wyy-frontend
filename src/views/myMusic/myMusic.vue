<template>
	<div class="my-music">
		<subNav></subNav>
		<router-view></router-view>
	</div>

</template>

<script>
	import subNav from 'views/Header/subNav.vue'
	export default {
		name:'',
		components:{
			subNav
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
</style>
