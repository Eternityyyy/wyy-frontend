<template>
	<div></div>

</template>

<script>
	import { getFollows } from 'network/api.js'
	export default {
		name:'sendPrivate',
		data(){
			return {
				follows:[]
			}
		},
		created(){
			getFollows({uid:this.user_id}).then(res=>{
				// console.log(res.data.follow)
				this.follows = res.data.follow
			})
		}
	}
</script>

<style>
</style>
