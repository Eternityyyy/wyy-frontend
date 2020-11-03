<template>
	<div class="btns f-cb">
		<play-btn className="u-btn2 u-btn2-2 u-btni-addply f-left" :songid="songid">
			<i>
				<em class="ply"></em>播放
			</i>
		</play-btn>
		<add-music class="u-btni u-btni-add" :songid="songid"></add-music>
		<collect-btn href="" class="u-btni u-btni-fav">
			<i>()</i>
		</collect-btn>
		<share-btn href="#" class="u-btni u-btni-share">
			<i>()</i>
		</share-btn>
		<download-btn href="#" class="u-btni u-btni-dl">
			<i>下载</i>
		</download-btn>
		<a href="" class="u-btni u-btni-cmmt">
			<i>()</i>
		</a>
	</div>

</template>

<script>
	import playBtn from 'views/common/btns/playBtn.vue'
	import addMusic from 'views/common/btns/addMusic.vue'
	import CollectBtn from 'views/common/btns/CollectBtn.vue'
	import shareBtn from 'views/common/btns/shareBtn.vue'
	import downloadBtn from 'views/common/btns/downloadBtn.vue'
	export default {
		name:'addMusicBtns',
		components:{
			playBtn,
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
