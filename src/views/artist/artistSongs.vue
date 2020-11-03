<template>
	<div class="artist-songs n-top50">
		<div class="m-info">
			<div class="btns f-cb">
				<add-play-list className="u-btn2 u-btn2-2 u-btni-addply f-fl" :playlist="songs">
					<i>
						<em class="ply"></em>
						播放
					</i>
				</add-play-list>
				<add-play-list className="u-btni u-btni-add" :playlist="songs" :isAdd="true"></add-play-list>
				<collect-btn class="u-btni u-btni-fav">
					<i>收藏热门</i>
				</collect-btn>
			</div>
		</div>
		<div class="f-cb">
			<div class="j-flag">
				<table class="m-table m-table-1 m-table-4">
					<tr v-for="(s,i) in songs" :key="i">
						<td class="w1">
							<div class="hd">
								<play-btn class="ply" :songid="s.id"></play-btn>
								<span class="num">{{i+1}}</span>
							</div>
						</td>
						<td>
							<div class="f-cb">
								<div class="tt">
									<div class="ttc">
										<span class="txt">
											<router-link :to="`/discover/song?id=${s.id}`">
												<b :title="s.name">{{s.name}}</b>
											</router-link>
										</span>
									</div>
								</div>
							</div>
						</td>
						<td class="w2-1 s-fc3">
							<music-time :musictime="s.dt/1000"></music-time>
							<div class="opt hshow">
								<add-music :songid="s.id" class="u-icn u-icn-81 icn-add"></add-music>
								<collect-btn class="icn icn-fav"></collect-btn>
								<share-btn class="icn icn-share"></share-btn>
								<download-btn class="icn icn-dl"></download-btn>
							</div>
						</td>
						<td class="w4">
							<div class="text">
								<router-link :to="`/discover/album?id=${s?.al?.id}`">
									<span :title="s?.al?.name">{{s?.al?.name}}</span>
								</router-link>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>

</template>

<script>
	import { addPlayList,CollectBtn,playBtn,addMusic,shareBtn,downloadBtn } from 'views/common/btns/index.js'
	import musicTime from 'views/common/musicTime.vue'
	import { getHotSongs } from 'network/api.js'
	export default {
		name:'artistSongs',
		props:['aid'],
		components:{
			musicTime,
			addPlayList,
			CollectBtn,
			playBtn,
			addMusic,
			shareBtn,
			downloadBtn
		},
		data(){
			return {
				songs:[]
			}
		},
		created(){
			// console.log(this.aid)
			getHotSongs({id:this.aid}).then(res=>{
				this.songs = res.data.songs
			})
		}
	}
</script>

<style>
	.artist-songs{
		margin-top: 20px;
	}
</style>
