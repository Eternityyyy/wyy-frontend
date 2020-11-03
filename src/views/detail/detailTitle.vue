<template>
	<div class="hd f-cb cntc-icon">
		<i class="f-left u-icn bg-icon" :class="icn_class">
			<span class="f-pa f-r-white-icon" v-if="isR"></span>
		</i>
		<div class="tit">
			<h2 class="f-ff2 f-brk">{{Title}}</h2>
		</div>
	</div>

</template>

<script>
	export default {
		name:'detailTile',
		props:{
			icn_class:{
				type:String
			},
			Title:{
				type:String
			},
			isR:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.f-r-white-icon{
		background: url(~assets/img/white-r-icon.png);
	}
	.cntc-icon i span{
		display: inline-block;
		width: 8px;
		height: 8px;
		top: 2px;
		background-size: cover;
		left: 34px;
	}
	.cntc-icon .u-icn-13{
		width: 54px;
		height: 24px;
		background-position: 0 -243px;
	}
</style>
