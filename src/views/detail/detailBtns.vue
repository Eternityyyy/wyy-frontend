<template>
	<div class="btns f-cb">
		<add-play-list className="u-btn2 u-btn2-2 u-btni-addply f-left" :playlist="Ptracks">
			<i>
				<em class="ply"></em>播放
			</i>
		</add-play-list>
		<add-play-list className="u-btni u-btni-add" :playlist="Ptracks" :isAdd="true"></add-play-list>
		<a href="" class="u-btni u-btni-fav">
			<i>({{subCount>10000?Math.floor(subCount/10000)+'万' : subCount}})</i>
		</a>
		<a href="#" class="u-btni u-btni-share">
			<i>({{shareCount}})</i>
		</a>
		<a href="#" class="u-btni u-btni-dl">
			<i>下载</i>
		</a>
		<a href="" class="u-btni u-btni-cmmt">
			<i>({{commentCount}})</i>
		</a>
	</div>

</template>

<script>
	import addPlayList from 'views/common/btns/addPlayList.vue'
		
	export default {
		name:'detailBtns',
		components:{
			addPlayList
		},
		props:{
			subCount:{
				type:Number
			},
			shareCount:{
				type:Number
			},
			commentCount:{
				type:Number
			},
			Ptracks:{
				type:Array
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>

</style>
