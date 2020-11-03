<template>
	<table class="m-table">
		<thead>
			<tr>
				<th class="first w1">
					<div class="wp"></div>
				</th>
				<th>
					<div class="wp af0"></div>
				</th>
				<th class="w2">
					<div class="wp af1"></div>
				</th>
				<th class="w3">
					<div class="wp af2"></div>
				</th>
				<th class="w4">
					<div class="wp af3"></div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(pitem,index) in Tracks" :key="index">
				<td class="left">
					<div class="hd">
						<play-btn class="ply" :songid="pitem.id">&nbsp;</play-btn>
						<span class="num">{{index +1}}</span>
					</div>
				</td>
				<td>
					<div class="f-cb">
						<div class="tt">
							<div class="ttc">
								<span class="txt">
									<router-link :to="`/discover/song?id=${pitem.id}`">
										<b title="">{{pitem.name}}</b>
									</router-link>
								</span>
							</div>
						</div>
					</div>
				</td>
				<td class="s-fc3">
					<music-time :musictime="pitem.dt/1000"></music-time>
					<div class="opt hshow">
						<add-music class="u-icn u-icn-81 icn-add" :songid="pitem.id"></add-music>
						<collect-btn class="icn icn-fav"></collect-btn>
						<share-btn class="icn icn-share"></share-btn>
						<download-btn class="icn icn-dl"></download-btn>
					</div>
				</td>
				<td>
					<div class="text" :title="pitem.ar.name">
						<span>
							<a href="" v-for="(aitem,index) in pitem.ar" :key="index">{{aitem.name}}</a>
						</span>
					</div>
				</td>
				<td>
					<div class="text">
						<span>
							<a href="">{{pitem.al.name}}</a>
						</span>
					</div>
				</td>
			</tr>
		</tbody>
	</table>

</template>

<script>
	import playBtn from 'views/common/btns/playBtn'
	import musicTime from 'views/common/musicTime.vue'
	import addMusic from 'views/common/btns/addMusic.vue'
	import CollectBtn from 'views/common/btns/CollectBtn.vue'
	import shareBtn from 'views/common/btns/shareBtn.vue'
	import downloadBtn from 'views/common/btns/downloadBtn.vue'
	export default {
		name:'detailList',
		components:{
			musicTime,
			playBtn,
			addMusic,
			CollectBtn,
			shareBtn,
			downloadBtn
		},
		props:{
			tracks:{
				type:Array
			}
		},
		computed:{
			Tracks(){
				return this.tracks || []
			}
		}
	}
</script>

<style>
	.m-table .hd .ply{
		float: right;
	}
	.m-table .hshow{
		display: none;
	}
	.m-table .opt{
		float: left;
	}
	.m-table .u-icn-81{
		float: left;
		margin-top: 2px;
	}
	.m-table .icn-fav{
		background-position: 0 -174px;
	}
	.m-table .icn-share{
		background-position: 0 -195px;
	}
	.m-table .icn-dl{
		background-position: -81px -174px;
	}
	/* .m-table tr td:nth-child(3){
		background-color: red;
	} */
	/* .m-table tr td:nth-child(3):hover{
		padding-left: 0px;
		padding-right: 0px;
	} */
	.m-table tr td:nth-child(3):hover .hshow{
		display: block;
	}
	.m-table tr td:nth-child(3):hover .u-dur{
		display: none;
	}
</style>
