<template>
	<div>
		<search-song-item :song="song"></search-song-item>
		<div class="lyric">
			<div v-show="isShow">
				<p v-for="(item,index) in lyrics.slice(0,4)" :key="index">{{item}}</p>
			</div>
			<div v-show="!isShow">
				<p v-for="(item,index) in lyrics" :key="index">{{item}}</p>
			</div>
			<div class="crl">
				<span class="s-fc3" @click="isShow = !isShow">
					{{showText[Number(isShow)]}}
					<i class="u-icn" :class="icns[Number(isShow)]"></i>
				</span>
			</div>
		</div>
	</div>

</template>

<script>
	import searchSongItem from 'views/search/searchSongItem.vue'
	export default {
		name:'searchLyricItem',
		props:{
			song:{
				type:Object
			}
		},
		components:{
			searchSongItem
		},
		data(){
			return {
				lyrics:this.song.lyrics,
				showText:['收起','展开'],
				icns:['u-icn-70','u-icn-69'],
				isShow:true
			}
		}
	}
</script>

<style>
	.n-srchrst .srchsongst .lyric{
		margin: 10px 0 18px 52px;
		color: #666;
		line-height: 23px;
		word-wrap: break-word;
		word-break: break-all;
	}
	.n-srchrst .srchsongst .lyric .crl{
		margin-top: 5px;
	}
	.n-srchrst .srchsongst .lyric .u-icn{
		margin-left: 5px;
	}
</style>
