<template>
	<div class="user-home g-bd4">
		<div class="user-wrap">
			<dl class="m-proifo f-cb">
				<dt class="f-pr">
					<img :src="userInfo?.profile?.avatarUrl + '?param=180y180'">
					<div class="btm">
						<span class="upload" v-if="isSelf">更换头像</span>
					</div>
				</dt>
				<dd class="f-cb">
					<div class="name f-cb">
						<div class="f-cb">
							<div class="rect"></div>
							<h2 class="wrap f-left f-cb">
								<span class="tit f-ff2 s-fc0 f-thide">{{userInfo?.profile?.nickname}}</span>
								<span class="lev u-lev u-icn2 u-icn2-lev">
									{{userInfo?.level}}
									<i class="right u-icn2 u-icn2-levr"></i>
								</span>
								<i class="icn u-icn u-icn-01"></i>
							</h2>
							<div class="edit" v-if="isSelf">
								<span class="u-btn2 u-btn2-1">
									<i>编辑个人资料</i>
								</span>
							</div>
							<div class="head-oper" v-else>
								<span class="btn u-btn u-btn-7 f-tdn">
									<i>发私信</i>
								</span>
								<!-- <span class="btn u-btn u-btn-6 f-tdn">
									<i>已关注</i>
								</span> -->
								<span class="btn u-btn u-btn-8 f-tdn">
									<i>关注</i>
								</span>
							</div>
							<h2 class="wrap f-left f-cb"></h2>
						</div>
					</div>
					<ul class="data s-fc3 f-cb">
						<li class="fst">
							<!-- <router-link> -->
								<strong>{{userInfo?.profile?.eventCount}}</strong>
								<span>动态</span>
							<!-- </router-link> -->
						</li>
						<li>
							<!-- <router-link> -->
								<strong>{{userInfo?.profile?.follows}}</strong>
								<span>关注</span>
							<!-- </router-link> -->
						</li>
						<li>
							<!-- <router-link> -->
								<strong>{{userInfo?.profile?.followeds}}</strong>
								<span>粉丝</span>
							<!-- </router-link> -->
						</li>
					</ul>
					<div class="inf s-fc3 f-brk" v-if="userInfo?.profile?.signature != ''">个人介绍：{{userInfo?.profile?.signature}}</div>
				</dd>
			</dl>
			<div class="u-title u-title-1 f-cb m-record-title">
				<h3>
					<span class="f-ff2 s-fc3">听歌排行</span>
				</h3>
				<h4>累计听歌{{userInfo.listenSongs}}首</h4>
				<span class="n-iconpoint">
					<span class="icon u-icn2 u-icn-5 j-flag"></span>
					<div class="tip">
						<p>实际播放时间果断的歌曲将不纳入计算</p>
						<i class="t"></i>
						<i class="b"></i>
					</div>
				</span>
				<div class="nav f-cb">
					<span @click="allList" :class="{'z-sel': type == 0}">所有时间</span>
					<i></i>
					<span :class="{'z-sel': type == 1}" @click="weekList">最近一周</span>
				</div>
			</div>
			<div class="m-record">
				<div class="j-flag">
					<ul>
						<li v-for="(p,i) in songlist" :key="i">
							<div class="hd">
								<play-btn class="ply" :songid="p?.song?.id"></play-btn>
								<span class="num">{{i+1}}.</span>
							</div>
							<div class="song">
								<div class="tt">
									<div class="ttc">
										<span class="txt">
											<router-link :to="`/discover/song?id=${p?.song?.id}`">
												<b :title="p?.song?.name">{{p?.song?.name}}</b>
											</router-link>
											<span class="ar s-fc8">
												<em>-</em>
												<span v-title="p?.song?.ar">
													<a href="" v-for="(a,ai) in p?.song?.ar" :key="ai">
														{{a.name}}
														<template v-if="p.song.ar[ai+1]">/</template>
													</a>
												</span>
											</span>
										</span>
									</div>
								</div>
								<music-btns :songid="p?.song?.id"></music-btns>
							</div>
							<div class="tops">
								<span class="bg" :style="{width:p.score + '%'}"></span>
								<span class="times f-ff2" v-show="p?.playCount>0">{{p?.playCount}}次</span>
							</div>
						</li>
					</ul>
					<div class="more">
						<a href="">查看更多></a>
					</div>
				</div>
			</div>
			<div class="u-title u-title-1 f-cb" v-if="playlistown?.length > 0">
				<h3>
					<span class="f-ff2 f-pr">
						我创建的歌单
						<span class="f-pa f-r-black-icon title-black-r"></span>
						（{{ userInfo?.profile?.playlistCount }}）
					</span>
				</h3>
			</div>
			<div class="m-cvrlst f-cb">
				<play-li v-for="(p,i) in playlistown" :key="i" :Playli="p" :imgUrl="p.coverImgUrl">
					<router-link :to="`/discover/songlist?id=${p.id}`">
						<span class="tit f-thide s-fc0" :title="p.name">{{p.name}}</span>
					</router-link>
				</play-li>
			</div>
			<div class="u-title u-title-1 f-cb" v-if="playlist?.length > 0">
				<h3>
					<span class="f-ff2 f-pr">
						我收藏的歌单
						<span class="f-pa f-r-black-icon title-black-r"></span>
						（{{ userInfo?.profile?.playlistCount }}）
					</span>
				</h3>
			</div>
			<div class="m-cvrlst f-cb">
				<play-li v-for="(p,i) in playlist" :key="i" :Playli="p" :imgUrl="p.coverImgUrl">
					<router-link :to="`/discover/songlist?id=${p.id}`">
						<span class="tit f-thide s-fc0" :title="p.name">{{p.name}}</span>
					</router-link>
				</play-li>
			</div>
		</div>
	</div>

</template>

<script>
	import { playBtn,musicBtns } from 'views/common/btns/index.js'
	import playLi from 'views/recommend/playLi.vue'
	import { getUserDetail,getUserRecord,getUserPlaylist } from 'network/api.js'
	import { mapState } from 'vuex'
	export default {
		name:'userHome',
		components:{
			playBtn,
			musicBtns,
			playLi
		},
		computed:{
			...mapState(['userProfile'])
		},
		data(){
			return {
				userInfo:{},
				playlistown:[],
				playlist:[],
				songlist:[],
				type:1,
				uid:this.$route.query.id,
				isSelf:false
			}
		},
		methods:{
			getList(type){
				getUserRecord({uid:this.uid,type}).then(res=>{
					// console.log(res.data)
					if (type) {
						this.songlist = res.data.weekData.slice(0,10)
					}else{
						this.songlist = res.data.allData.slice(0,10)
					}
				})
			},
			allList(){
				this.type = 0;
				this.getList(this.type)
			},
			weekList(){
				this.type = 1
				this.getList(this.type);
			}
		},
		mounted(){
			// console.log(this.$route.query.id)
			getUserDetail({uid:this.uid}).then(res=>{
				// console.log(res.data)
				this.userInfo = res.data
				this.isSelf = res.data.userPoint.userId == this.userProfile?.userPoint?.userId
				getUserPlaylist({uid:this.uid}).then(reslist=>{
					// console.log(reslist.data)
					this.playlist = reslist.data.playlist
					this.playlistown = reslist.data.playlist.filter(item=>{
						return item?.creator?.nickname == res.data.profile.nickname
					})
					this.playlist.splice(0,this.playlistown.length)
				})
			});	
			this.getList(1);
		}
	}
</script>

<style>
	.user-home{
		background: #fff;
	}
	.user-wrap{
		padding: 40px;
	}
	.m-proifo{
		margin-bottom: 43px;
	}
	.m-proifo dt{
		float: left;
		width: 188px;
		margin-right: 40px;
	}
	.m-proifo dt img{
		display: block;
		width: 180px;
		height: 180px;
		padding: 3px;
		background: #fff;
		border: 1px solid #d5d5d5;
	}
	.m-proifo dt .btm, .m-proifo dt .upload{
		position: absolute;
		left: 4px;
		bottom: 3px;
		display: block;
		width: 180px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		color: #fff;
	}
	.m-proifo dt .btm{
		display: none;
		background: #8e8e8e;
		opacity: .8;
	}
	.m-proifo dt:hover .btm{
		display: block;
	}
	.m-proifo dt .upload{
		top: 0;
		left: 0;
	}
	.m-proifo dd{
		float: left;
		width: 670px;
	}
	.m-proifo .name{
		padding-bottom: 12px;
		margin-bottom: 10px;
		border-bottom: 1px solid #ddd;
	}
	.m-proifo .name .wrap{
		padding-bottom: 1px;
	}
	.m-proifo .name .tit{
		float: left;
		margin-top: 3px;
		font-size: 22px;
		font-weight: normal;
		line-height: 30px;
	}
	.m-proifo .name .lev{
		float: left;
		margin: 8px 0 0 10px;
	}
	.m-proifo .name .icn{
		float: left;
		margin: 9px 0 0 8px;
	}
	.m-proifo .name .u-icn-01{
		margin-top: 9px;
	}
	.m-proifo .name .edit{
		float: right;
		margin-top: 4px;
	}
	.head-oper{
		float: left;
	}
	.m-proifo .name .btn{
		float: left;
		margin: 4px 0 0 15px;
	}
	.m-proifo .data{
		height: 41px;
		margin-bottom: 15px;
	}
	.m-proifo .data li{
		float: left;
		padding: 0 40px 0 20px;
		border-left: 1px solid #ddd;
	}
	.m-proifo .data .fst{
		padding-left: 0;
		border-left: none;
	}
	.m-proifo .data a{
		display: inline-block;
		position: relative;
		color: #666;
	}
	.m-proifo .data strong{
		display: block;
		margin-top: -4px;
		font-size: 24px;
		font-weight: normal;
		cursor: pointer;
	}
	.m-proifo .data span{
		display: block;
		text-indent: 2px;
		cursor: pointer;
	}
	.m-proifo .inf{
		margin-bottom: 5px;
		line-height: 21px;
	}
	.m-record-title{
		position: relative;
		z-index: 2;
	}
	.m-record-title h4{
		float: left;
		display: inline;
		margin-top: 5px;
		margin-left: 10px;
		line-height: 26px;
		font-weight: 400;
		color: #666;
	}
	.n-iconpoint{
		position: relative;
		margin-left: 10px;
		left: -1px;
		top: 8px;
		line-height: 18px;
		z-index: 2;
	}
	.n-iconpoint div.tip{
		position: absolute;
		left: -33px;
		top: 30px;
		display: none;
		width: 295px;
		font-size: 12px;
		line-height: 20px;
		padding: 8px 19px 7px 19px;
		z-index: 2;
		color: #666;
	}
	..n-iconpoint div.tip i.t{
		position: absolute;
		width: 327px;
		height: 16px;
		left: 0;
		top: -16px;
	}
	.n-iconpoint div.tip i.b{
		position: absolute;
		width: 327px;
		height: 12px;
		left: 0;
		bottom: -12px;
	}
	.m-record-title .nav{
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 5px;
	}
	.m-record-title .nav span, .m-record-title .nav i{
		float: right;
		margin-left: 8px;
	}
	.m-record-title .nav span{
		line-height: 26px;
		color: #666;
		cursor: pointer;
	}
	.m-record-title .nav i{
		width: 1px;
		height: 12px;
		margin-top: 7px;
		background-color: #999;
	}
	.m-record-title .nav span.z-sel{
		color: #333;
		font-weight: 700;
	}
	.m-record{
		margin-bottom: 36px;
	}
	.m-record ul{
		border: 1px solid #e2e2e2;
		border-top: none;
	}
	.m-record li{
		height: 38px;
		line-height: 38px;
		overflow: hidden;
	}
	.m-record li:hover{
		background-color: #f7f7f7;
	}
	.m-record li:hover .opt{
		display: block;
	}
	.m-record li:nth-child(even){
		background-color: #f7f7f7;
	}
	.m-record li .hd{
		float: left;
		width: 72px;
		height: 38px;
		overflow: hidden;
	}
	.m-record .ply{
		float: right;
		display: inline;
		margin-top: 10px;
		width: 17px;
		height: 17px;
		cursor: pointer;
		background-position: 0 -103px;
	}
	.m-record li .hd .num{
		float: left;
		display: inline;
		padding-left: 5px;
		padding-right: 8px;
		width: 37px;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #666;
	}
	.m-record li .song{
		float: left;
		position: relative;
		z-index: 1;
		padding-left: 10px;
		width: 480px;
		height: 38px;
		overflow: hidden;
	}
	.m-record li .song .tt{
		float: left;
		width: 100%;
	}
	.m-record li .song .tt .ar em{
		margin: 0 5px;
	}
	.m-record li .song .tt .txt{
		position: relative;
		display: inline-block;
		max-width: 99%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.m-record .opt{
		position: absolute;
		z-index: 1;
		right: 0;
		top: 11px;
		display: none;
		width: 92px;
		height: 20px;
		overflow: hidden;
	}
	.m-record .icn-add{
		float: left;
		margin-top: 2px;
	}
	.m-record span.icn{
		float: left;
		width: 18px;
		height: 16px;
		margin: 2px 0 0 8px;
		overflow: hidden;
		text-indent: -999px;
		cursor: pointer;
	}
	.m-record span.icn-fav{
		background-position: 0 -174px;
	}
	.m-record span.icn-share{
		background-position: 0 -195px;
	}
	.m-record span.icn-dl{
		background-position: -81px -174px;
	}
	.m-record li .tops{
		float: right;
		position: relative;
		z-index: 1;
		width: 319px;
		height: 38px;
		line-height: 38px;
	}
	.m-record li .tops span.bg{
		position: absolute;
		z-index: 1;
		height: 38px;
		background-color: #4eb4f5;
		opacity: 0.1;
	}
	.title-black-r{
		display: inline-block;
		width: 8px;
		height: 8px;
		top: 1px;
		background-size: cover;
	}
	.p-prf .m-cvrlst{
		margin: 20px 0 0 -50px;
	}
	.p-prf .m-cvrlst .play-li{
		height: 165px;
		overflow: hidden;
	}

</style>
