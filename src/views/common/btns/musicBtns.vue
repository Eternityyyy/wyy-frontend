<template>
	<div class="opt hshow">
		<add-music :songid="songid" class="u-icn u-icn-81 icn-add"></add-music>
		<collect-btn class="icn icn-fav"></collect-btn>
		<share-btn class="icn icn-share"></share-btn>
		<download-btn class="icn icn-dl"></download-btn>
		
	</div>

</template>

<script>
	import {CollectBtn,addMusic,shareBtn,downloadBtn} from './index.js'
	export default {
		name:"App",
		components:{
			addMusic,
			CollectBtn,
			shareBtn,
			downloadBtn
		},
		props:{
			songid:{
				type:Number
			}
		}
	}

</script>

<style>

</style>