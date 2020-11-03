<template>
	<span class="head">星期{{week}}</span>
	<span class="bd">{{day}}</span>

</template>

<script>
	export default {
		name:'calendar',
		data(){
			return {
				date:new Date(),
				weeks:['一','二','三','四','五','六','日']
			}
		},
		computed:{
			day(){
				return this.date.getDate()
			},
			week(){
				return this.weeks[this.date.getDay()]
			}
		},
	}
</script>

<style>
</style>
