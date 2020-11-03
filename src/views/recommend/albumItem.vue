<template>
	<li class="bg-index" v-for="(albumitem,index) in new_list" :key="index">
		<div class="album-cover" :style="album_wh">
			<img :src="albumitem.picUrl+'?param=100y100'" alt="">
			<router-link :to="`/discover/album/detail?id=${albumitem.id}`">
				<span class="bg-cover msk"></span>	
			</router-link>
			<add-play-list className="bg-iconall icon-play" :playlistid="albumitem.id" :isAlbum="isAlbum"></add-play-list>
		</div>
			<p class="f-thide"><a href="#">{{albumitem.name}}</a></p>
			<p class="f-thide tit"><a href="#">{{albumitem?.artist?.name}}</a></p>
	</li>
</template>

<script>
	import addPlayList from 'views/common/btns/addPlayList.vue'
	export default {
		name:'albunItem',
		components:{
			addPlayList
		},
		props:{
			new_list:{
				type:Array
			},
			Height:{
				type:String
			},
			Width:{
				type:String
			}
		},
		data(){
			return {
				album_wh:{
					width:this.Width,
					height:this.Height
				},
				isAlbum:true
			}
		}
	}
</script>

<style>
	.album-cover{
		margin-bottom: 7px;
		width: 100px;
		height: 100px;
		position: relative;
	}
	.album-cover img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.album-cover .msk{
		width: 118px;
		height: 100px;
		background-position: 0 -570px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.album-cover .icon-play{
		position: absolute;
		display: none;
		width: 22px;
		height: 22px;
		right: 10px;
		bottom: 5px;
		background-position: 0 -85px;
	}
	.album-cover:hover .icon-play{
		display: block;
	}
	.n-disk p{
		width: 90%;
		line-height: 18px;
	}
	.f-thide{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}
	.tit a{
		color: #666;
	}
</style>
