<template>
	<span class="u-dur">{{trunMTime(musictime)}}</span>

</template>

<script>
	export default {
		name:'musicTime',
		props:{
			musictime:{
				type:Number
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			trunMTime(second){
				let minute = second/60>=10 ? Math.floor(second/60) : '0' + Math.floor(second/60);
				let seconds = second%60>=10 ? Math.floor(second%60) : '0' + Math.floor(second%60);
				return minute + ':' + seconds
			}
		}
	}
</script>

<style>
</style>
