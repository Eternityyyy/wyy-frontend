<template>
	<div class="rank">
		<div class="r-left">
			<div class="r-left-c">
				<h2 class="f-ff1">云音乐特色榜</h2>
				<ul class="f-cb">
					<router-link v-for="(item,index) in toplist.slice(0,4)" :key="index" :to="`/discover/rank?id=${item.id}`" :exact-active-class="`${this.$route.query.id == item.id ? 'z-selected':''}`" exact>
					<li>
						<div class="item f-cb">
							<div class="i-left">
								<a class="i-avatar">
									<img :src="item.coverImgUrl+'?param=40y40'" alt="">
									<span class="msk bg-cover"></span>
								</a>
							</div>
							<p class="name">
								<a>{{item.name}}</a>
							</p>
							<p class="s-fc4">{{item.updateFrequency}}</p>
						</div>
					</li>
					</router-link>
				</ul>
				<h2 class="scd f-ff1">全球媒体榜</h2>
				<ul class="f-cb">
					<router-link v-for="(item,index) in toplist.slice(4)" :key="index" :to="`/discover/rank?id=${item.id}`" :exact-active-class="`${this.$route.query.id == item.id ? 'z-selected':''}`" exact>
					<li>
						<div class="item f-cb">
							<div class="i-left">
								<a class="i-avatar">
									<img :src="item.coverImgUrl+'?param=40y40'" alt="">
									<span class="msk"></span>
								</a>
							</div>
							<p class="name">
								<a>{{item.name}}</a>
							</p>
							<p class="s-fc4">{{item.updateFrequency}}</p>
						</div>
					</li>
					</router-link>
				</ul>
			</div>
		</div>
		<div class="right">
			<div class="r-right-c">
				<div class="r-right-wrap">
					<div class="mus-info m-info-rank f-cb">
						<div class="cover info-cover u-cover-rank">
							<img v-if="topPlaylist.creator" :src="topPlaylist.creator.backgroundUrl" alt="">
							<span class="msk"></span>
						</div>
						<div class="cnt">
							<div class="cntc">
								<div class="hd f-cb">
									<h2 class="f-ff2">{{topPlaylist.name}}</h2>
								</div>
								<div class="user f-cb">
									<i class="u-icn u-icn-57"></i>
									<span class="sep s-fc3">最近更新：{{trunTime(topPlaylist.updateTime,'year')}}</span>
									<span class="s-fc4">({{updateFrequency}})</span>
								</div>
								<detail-btns :subCount="topPlaylist.subscribedCount" :shareCount="topPlaylist.shareCount" :commentCount="topPlaylist.commentCount" :Pid="Pid"></detail-btns>
							</div>
						</div>
					</div>
				</div>
				<div class="r-right-wrap2">
					<discover-section>
						<template v-slot:title>歌曲列表</template>
						<template v-slot:titleLi>
							<span class="sub s-fc3" v-if="topPlaylist.tracks">{{topPlaylist.tracks.length}}首歌</span>
						</template>
						<template v-slot:titleR>
							播放：<strong class="s-fc6">{{topPlaylist.playCount}}</strong>次
						</template>
						<template v-slot:container>
							<table class="m-table m-table-rank">
								<thead>
									<tr>
										<th class="first w1">
											<div class="wp"></div>
										</th>
										<th>
											<div class="wp">标题</div>
										</th>
										<th class="w2-1">
											<div class="wp">时长</div>
										</th>
										<th class="w3-1">
											<div class="wp">歌手</div>
										</th> 
									</tr>
								</thead>
								<tbody>
									<tr v-for="(pitem,index) in topPlaylist.tracks" :key="index">
										<td>
											<div class="hd">
												<span class="num">{{index +1}}</span>
												<div class="rk">
													<span class="ico u-icn u-icn-73 s-fc9">24</span>
												</div>
											</div>
										</td>
										<td :class="{'t-rank':index<3}">
											<div class="f-cb">
												<div class="tt">
													<a href="" v-if="index<3">
														<img :src="pitem.al.picUrl + '?param=50y50'" alt="" class="rpic">
													</a>
													<span class="ply"></span>
													<div class="ttc">
														<span class="txt">
															<a href="">
																<b title="">{{pitem.name}}</b>
															</a>
															<span class="s-fc8" v-for="(aliaitem,aindex) in pitem.alia" :key="aindex"> - ({{aliaitem}})</span>
														</span>
													</div>
												</div>
											</div>
										</td>
										<td class="s-fc3">
											<music-time :musictime="pitem.dt/1000"></music-time>
										</td>
										<td>
											<div class="text" :title="pitem.ar.name">
												<span>
													<a href="" v-for="(aitem,index) in pitem.ar" :key="index">
														{{aitem.name}}
														<template v-if="pitem.ar[index+1]">/</template>
													</a>
												</span>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</template>
					</discover-section>
					<Comments :cmtNum="cmtNum" :cid="nowId" Curl="/playlist"></Comments>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import detailBtns from 'views/detail/detailBtns.vue'
	import discoverSection from 'views/discover/discoverSection.vue'
	import musicTime from 'views/common/musicTime.vue'
	import Comments from 'views/detail/Comments.vue'
	
	import {getToplist,getListDetail} from 'network/api.js'
	
	export default {
		name:'Rank',
		components:{
			detailBtns,
			discoverSection,
			musicTime,
			Comments
		},
		data(){
			return {
				toplist:[],
				nowId:0,
				nowIndex:0,
				topPlaylist:[],
				updateFrequency:'',
				cmtNum:0
			}
		},
		computed:{
			Pid(){
				return this.topPlaylist.id || 0
			}
		},
		watch:{
			nowId(newId){
				// console.log(newId)
				if(newId){
					getListDetail({id:newId}).then(res=>{
						// console.log(res.data.playlist);
						this.topPlaylist = res.data.playlist
						this.cmtNum = res.data.playlist.commentCount
						this.updateFrequency = this.toplist[this.nowIndex].updateFrequency
					})
				}
			}
		},
		beforeRouteUpdate(to,from,next){
			next();
			this.nowId = to.query.id
		},
		created(){
			this.nowId = this.$route.query.id
			getToplist().then(res=>{
				console.log(res.data.list)
				this.toplist = res.data.list
				if(!this.nowId){
					this.nowId = res.data.list[0].id
					this.updateFrequency = res.data.list[0].updateFrequency
				}
			});
		}
	}
</script>

<style>
	.r-left{
		width: 240px;
		border-right: 1px solid #d5d5d5;
	}
	.r-left-c{
		margin-top: 40px;
	}
	.r-left h2{
		padding: 0 10px 12px 15px;
		font-size: 14px;
		color: #000;
	}
	.f-ff1{
		font-family: simsun,\5b58\4f53;
	}
	.r-left h2.scd{
		margin-top: 20px;
	}
	.r-left-c a.z-selected li, .r-left-c a.z-selected:hover li{
		background: #e6e6e6;
	}
	.r-left-c li{
		padding: 10px 0 10px 20px;
		position: relative;
		height: 42px;
	}
	.r-left-c li:hover{
		background-color: #f4f2f2;
	}
	.r-left-c ul *{
		cursor: pointer;
		vertical-align: middle;
	}
	.r-left-c .item{
		padding-left: 50px;
	}
	.r-left-c .i-left{
		display: inline;
		float: left;
		margin-left: -50px;
		overflow: hidden;
		width: 40px;
	}
	.r-left-c .i-avatar{
		display: block;
		position: relative;
		width: 40px;
		height: 40px;
	}
	.r-left-c .i-avatar img{
		width: 40px;
		height: 40px;
	}
	.r-left-c .i-avatar .msk{
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		background-position: -310px -330px;
	}
	.r-left-c .name{
		width: 150px;
		overflow: hidden;
		margin-top: 2px;
		margin-bottom: 8px;
	}
	.rank .right{
		height: 100%;
		width: 740px;
		padding-bottom: 50px;
		background: white;
	}
	.r-right-wrap{
		padding: 40px;
	}
	.u-cover-rank{
		padding: 3px;
		border: 1px solid #ccc;
	}
	.u-cover-rank, .u-cover-rank img{
		width: 150px;
		height: 150px;
	}
	.u-cover-rank .msk{
		position: absolute;
		width: 150px;
		height: 150px;
		background-position: -230px -380px;
		top: 3px;
		left: 3px;
	}
	.r-right-c .u-icn-57{
		width: 13px;
		height: 13px;
		background-position: -18px -682px;
	}
	.m-info-rank .sep{
		margin-left: 5px;
	}
	.r-right-wrap2{
		padding: 0 30px 40px 40px;
	}
	.m-table .w2-1{
		width: 91px;
	}
	.m-table .w3-1{
		width: 26%;
	}
	.m-table-rank .rk{
		float: right;
		width: 32px;
		margin-right: -5px;
		text-align: center;
	}
	.m-table-rank .rk .ico{
		padding-left: 8px;
		line-height: 17px;
		font-size: 10px;
		font-family: Arial, Helvetica, sans-serif;
	}
	.u-icn-73{
		background-position: -74px -299px;
	}
	.m-table-rank td.t-rank{
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.m-table-rank .rpic{
		float: left;
		width: 50px;
		height: 50px;
		margin-right: 14px;
	}
	.m-table-rank td.t-rank .ply{
		margin-top: 17px;
	}
	.m-table .tt .ply{
		margin-right: 8px;
	}
	.m-table-rank td.t-rank .ttc{
		margin-top: 16px;
	}
	.m-table-rank .txt{
		max-width: 88%;
	}
	.m-table-rank td.t-rank .txt{
		max-width: 67%;
	}
	
</style>
