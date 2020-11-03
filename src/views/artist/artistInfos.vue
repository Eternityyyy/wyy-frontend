<template>
	<div class="n-artdesc">
		<h2>
			<i>&nbsp;</i>
			简介
		</h2>
		<p>{{dec}}</p>
		<template v-if="intr.length>0">
		<div v-for="(m,i) in intr" :key="i">
			<h2>{{m.ti}}</h2>
			<p class="z-indent" v-html="htmltext(m.txt)">
			</p>
		</div></template>
	</div>

</template>

<script>
	import { getArtistDec } from 'network/api.js'
	export default {
		name:'artistInfos',
		props:['aid'],
		data(){
			return {
				dec:'',
				intr:''
			}
		},
		created(){
			getArtistDec({id:this.aid}).then(res=>{
				this.dec = res.data.briefDesc
				this.intr = res.data.introduction
			})
		},
		methods:{
			htmltext(str){
				return str.replace(/\n/g,'<br>')
			}
		}
	}
</script>

<style>
	.n-artdesc{
		margin-top: 30px;
	}
	.n-artdesc h2{
		margin: 28px 0 8px 0;
		color: #333;
		font-size: 14px;
	}
	.n-artdesc h2 i{
		height: 14px;
		width: 3px;
		margin-right: 7px;
		background: #c10d0c;
	}
	.n-artdesc p{
		line-height: 25px;
		color-interpolation: #666;
		text-indent: 2em;
	}
	.n-artdesc p.z-indent{
		text-indent: 0;
	}
</style>
