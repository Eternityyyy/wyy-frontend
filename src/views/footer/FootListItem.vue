<template>
	<li :class="{'z-sel':player_setting?.index == index}">
		<div class="col col-1">
			<div class="playicn"></div>
		</div>
		<div class="col col-2" @click="setIndex(index)">{{trackItem?.name}}</div>
		<div class="col col-3">
			<div class="icns">
				<i class="ico icn-del" title="删除" @click="delMusic(index)"></i>
				<download-btn class="ico ico-dl" :songid="trackItem?.id"></download-btn>
				<share-btn class="ico ico-share j-t" :songid="trackItem?.id"></share-btn>
				<collect-btn class="ico ico-add" :songid="trackItem?.id"></collect-btn>
			</div>
		</div>
		<div class="col col-4">
			<span :title="trackItem?.ar?.reduce((t,i)=>t+i.name)">
				<a href="" v-for="(nitem,nindex) in trackItem?.ar" :key="nindex">
					{{nitem.name}}
					<span v-if="trackItem.ar[nindex+1]">/</span>
				</a>
			</span>
		</div>
		<div class="col col-5">
			<music-time :musictime="trackItem?.dt/1000"></music-time>
		</div>
		<div class="col col-6">
			<span class="ico ico-src" :title="`来自${trackItem?.source?.title}`">来源</span>
		</div>
	</li>

</template>

<script>
	import musicTime from 'views/common/musicTime.vue'
	import { shareBtn,downloadBtn,CollectBtn } from 'views/common/btns/index.js'
	import { mapState } from 'vuex'
	export default {
		name:'FootListItem',
		components:{
			musicTime,
			shareBtn,
			downloadBtn,
			CollectBtn
		},
		props:{
			index:{
				type:Number
			}
		},
		data(){
			return {
				
			}
		},
		computed:{
			...mapState(['player_setting','track_queue']),
			trackItem(){
				return this.track_queue[this.index]
			}
		},
		methods:{
			setIndex(i){
				this.player_setting.index = i;
				this.$store.commit('update_PS',this.player_setting)
			},
			delMusic(i){
				if(this.player_setting.index == i){
					this.player_setting.index = i < this?.track_queue?.length-1 ? i+1 : 0
					this.$store.commit('update_PS',this.player_setting);
				}
				this.track_queue.splice(i,1)
				this.$store.commit('update_TQ',this.track_queue)
			}
		}
	}
</script>

<style>
	.m-playbar .listhd, .m-playbar .listbd{
		background: url(~assets/img/playlist_bg.png) no-repeat;
	}
	.m-playbar .list .close, .m-playbar .playicn, .m-playbar .ico{
		background: url(~assets/img/playlist.png) no-repeat 0 9999px;
	}
	.m-playbar .list li{
		float: left;
		width: 100%;
	}
	.m-playbar .list li.z-sel{
		background-color: rgba(0,0,0,0.3);
	}
	.m-playbar .col a, .m-playbar .col a:hover{
		color: #9b9b9b;
	}
	.m-playbar .list li.z-sel .playicn, .m-playbar .list li:hover .icns, .m-playbar .list li.z-hover1 .icns{
		display: block;
	}
	.m-playbar .col{
		float: left;
		padding-left: 10px;
		height: 28px;
		line-height: 28px;
		overflow: hidden;
		cursor: pointer;
	}
	.m-playbar .col-1{
		width: 10px;
	}
	.m-playbar .col-2{
		width: 256px;
	}
	.m-playbar .col-2, .m-playbar .col-4{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.m-playbar .col-3{
		width: 78px;
		position: relative;
	}
	.m-playbar .col .icns{
		display: none;
		position: absolute;
		right: 0;
		top: 0;
		width: 100px;
		height: 234px;
	}
	.m-playbar .col .ico{
		float: right;
		overflow: hidden;
		margin: 7px 0 0 10px;
		text-indent: -9999px;
	}
	.m-playbar .icn-del{
		width: 13px;
		background-position: -51px 0;
	}
	.m-playbar .ico-dl{
		width: 14px;
		background-position: -57px -50px;
	}
	.m-playbar .ico-share{
		width: 14px;
		background-position: 0 0;
	}
	.m-playbar .ico-add{
		width: 16px;
		background-position: -24px 0;
	}
	.m-playbar .col-4{
		width: 70px;
	}
	.m-playbar .col-5{
		width: 35px;
	}
	.m-playbar .col .ico-src{
		width: 14px;
		margin-left: 0;
		background-position: -80px 0px;
	}
</style>
