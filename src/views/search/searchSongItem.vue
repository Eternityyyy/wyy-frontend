<template>
	<div class="search-song-item item f-cb h-flag">
		<div class="td">
			<div class="hd">
				<play-btn class="ply" :songid="song?.id"></play-btn>
			</div>
		</div>
		<div class="td w0">
			<div class="sn">
				<div class="text">
					<router-link :to="`/discover/song?id=${song?.id}`">
						<b :title="song.name" v-trunHtml="{str:song?.name,keyword:this.keyword}">
							<span class="s-fc7">{{song?.name}}</span>
						</b>
					</router-link>
				</div>
			</div>
		</div>
		<div class="td">
			<div class="opt hshow">
				<add-music :songid="song?.id" class="u-icn u-icn-81 icn-add"></add-music>
				<collect-btn class="icn icn-fav"></collect-btn>
				<share-btn class="icn icn-share"></share-btn>
				<download-btn class="icn icn-dl"></download-btn>
			</div>
		</div>
		<div class="td w1">
			<div class="text">
				<a href="" v-trunHtml="{str:song?.ar[0]?.name,keyword:this.keyword}"></a>
			</div>
		</div>
		<div class="td w2">
			<div class="text">
				<span class="s-fc3">
					《<span v-trunHtml="{str:song?.al?.name,keyword:this.keyword}"></span>》
				</span>
			</div>
		</div>
		<div class="td">
			<music-time :musictime="song.dt/1000"></music-time>
		</div>
	</div>

</template>

<script>
	import { playBtn,addMusic,CollectBtn,shareBtn,downloadBtn } from 'views/common/btns/index.js'
	import musicTime from 'views/common/musicTime.vue'
	export default {
		name:'',
		components:{
			playBtn,
			addMusic,
			CollectBtn,
			shareBtn,
			downloadBtn,
			musicTime
		},
		props:{
			song:{
				type:Object,
				deep:true
			},
			keyword:{
				type:String
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.n-srchrst .srchsongst .search-song-item:nth-child(even){
		background: #F7F7F7;
		border-color: #f7f7f7;
	}
	.n-srchrst .srchsongst .search-song-item:hover{
		background: #f7f7f7;
		border-color: #f7f7f7;
	}
	.n-srchrst .srchsongst .hshow{
		visibility: hidden;
	}
	.n-srchrst .srchsongst .search-song-item:hover .hshow{
		visibility: visible;
	}
	.n-srchrst .srchsongst .u-icn-81{
		margin-right: 8px;
		margin-bottom: 3px;
	}
	.n-srchrst .srchsongst .icn-fav{
		margin-left: 0;
		background-position: 0 -174px;
	}
	.n-srchrst .srchsongst .icn{
		display: inline-block;
		vertical-align: middle;
		width: 18px;
		height: 16px;
		cursor: pointer;
		margin: 0 7px 0 0;
	}
	.n-srchrst .srchsongst .icn-share{
		background-position: 0 -195px;
	}
	.n-srchrst .srchsongst .icn-dl{
		background-position: -81px -174px;
	}
</style>
