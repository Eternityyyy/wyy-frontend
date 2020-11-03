<template>
	<div class="album-detail g-bd4">
		<div class="album-detail-left">
			<div class="m-info f-cb">
				<div class="album-cover u-cover-alb cover">
					<img :src="al_detail.picUrl+'?param=100y100'" alt="">
					<span class="bg-cover msk"></span>
				</div>
				<div class="cnt">
					<div class="cntc">
						<div class="topblk">
							<detail-title :Title="al_detail.name" icn_class="u-icn-16"></detail-title>
							<p class="intr">
								<b>歌手：</b>
								<a href="">
									<span :title="al_detail.artist.name" class="s-fc7">
										{{al_detail.artist.name}}
									</span>
								</a>
							</p>
							<p class="intr">
								<b>发行时间：{{trunTime(al_detail.publishTime)}}</b>
							</p>
							<p class="intr">
								<b>发行公司：{{al_detail.company}}</b>
							</p>
						</div>
						<detail-btns :shareCount="al_detail.info.shareCount" :commentCount="al_detail.info.commentCount" :Ptracks="al_songs"></detail-btns>
					</div>
				</div>
			</div>
			<div class="n-albdesc">
				<h3>专辑介绍：</h3>
				<div class="f-brk" v-if="isShowdec">
					<template v-for="(ditem,dindex) in al_detail.description.split('\n')">
						<p :key="dindex" v-if="dindex<9">{{ditem}}</p>
					</template>
				</div>
				<div class="f-brk" v-if="!isShowdec">
					<p v-for="(ditem,dindex) in al_detail.description.split('\n')" :key="dindex">{{ditem}}</p>
				</div>
				<div class="f-cb">
					<a class="s-fc7 f-fr" @click="setShow">
						{{isShowdec?'展开':'收起'}}
						<i class="u-icn" :class="isShowdec?'u-icn-69':'u-icn-70'"></i>
					</a>
				</div>
			</div>
			<div class="n-songtb">
				<div class="u-title u-title-1 f-cb">
					<h3>
						<span class="f-ff2">包含歌曲列表</span>
					</h3>
					<span class="sub s-fc3">{{al_songs.length}}首歌</span>
				</div>
				<div class="j-flag">
					<table class="m-table">
						<thead>
							<tr>
								<th class="first w1">
									<div class="wp"></div>
								</th>
								<th>
									<div class="wp">歌曲标题</div>
								</th>
								<th class="w2-1">
									<div class="wp">时长</div>
								</th>
								<th class="w4">
									<div class="wp">歌手</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(sitem,sindex) in al_songs" :key="sindex">
								<td class="left">
									<div class="hd">
										<play-btn class="ply">&nbsp;</play-btn>
										<span class="num">{{sindex +1}}</span>
									</div>
								</td>
								<td>
									<div class="f-cb">
										<div class="tt">
											<div class="ttc">
												<span class="txt">
													<router-link :to="`/discover/song?id=${sitem.id}`">
														<b title="">{{sitem.name}}</b>
													</router-link>
												</span>
											</div>
										</div>
									</div>
								</td>
								<td class="s-fc3">
									<music-time :musictime="sitem.dt/1000"></music-time>
									<div class="opt hshow">
										<add-music class="u-icn u-icn-81 icn-add" :songid="sitem.id"></add-music>
										<collect-btn class="icn icn-fav"></collect-btn>
										<share-btn class="icn icn-share"></share-btn>
										<download-btn class="icn icn-dl"></download-btn>
									</div>
								</td>
								<td>
									<div class="text" :title="sitem.ar.name">
										<span>
											<a href="" v-for="(aitem,aindex) in sitem.ar" :key="aindex">{{aitem.name}}</a>
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<Comments :cmtNum="al_detail.info.commentCount" Curl="/album" :cid="al_detail.id"></Comments>
		</div>
		<div class="album-detail-right g-wrap7">
			<!-- <h3 class="u-hd3">
				<span class="f-left">Ta的其它热门专辑</span>
				<router-link :to="``"></router-link>
			</h3>
			<ul class="m-rctlist f-cb">
				<li v-for="(l,i) in list" :key="i">
					<div class="cver u-cover u-cover-3">
						<router-link :to="`/discover/playlist?id=${l.id}`">
							<span :title="l.name">
								<img :src="l.coverImgUrl + '?param=50y50'">
							</span>
						</router-link>
					</div>
					<div class="info">
						<p class="f-thide">
							<router-link :to="`/discover/playlist?id=${l.id}`">
								<span :title="l.name">
									{{l.name}}
								</span>
							</router-link>
						</p>
						<p>
							<span class="by s-fc4">by</span>
							<router-link :to="`/user/home?id=${l?.creator?.userId}`">
								<span class="nm f-thide s-fc3" :title="l?.creator?.nickname">
									{{l?.creator?.nickname}}
								</span>
							</router-link>
						</p>
					</div>
				</li>
			</ul> -->
		</div>
	</div>

</template>

<script>
	import detailTitle from 'views/detail/detailTitle.vue'
	import detailBtns from 'views/detail/detailBtns.vue'
	import musicTime from 'views/common/musicTime.vue'
	import Comments from 'views/detail/Comments.vue'
	import playBtn from 'views/common/btns/playBtn.vue'
	import addMusic from 'views/common/btns/addMusic.vue'
	import CollectBtn from 'views/common/btns/CollectBtn.vue'
	import shareBtn from 'views/common/btns/shareBtn.vue'
	import downloadBtn from 'views/common/btns/downloadBtn.vue'
	
	import {getAlbumById} from 'network/api.js'
	export default {
		name:'albumDetail',
		components:{
			detailTitle,
			detailBtns,
			musicTime,
			Comments,
			playBtn,
			addMusic,
			CollectBtn,
			shareBtn,
			downloadBtn
		},
		data(){
			return {
				al_detail:{
					artist:{},
					info:{},
					description:''
				},
				al_songs:[],
				isShowdec:true
			}
		},
		methods:{
			trunTime(time,str){
				let date = new Date(time);
				let arr = [date.getFullYear(),(date.getMonth()+1>10?'':'0')+date.getMonth(),(date.getDate()+1>10?'':'0')+date.getDate()];
				if(str == 'year'){
					return `${arr[0]}年${arr[1]}月${arr[2]}日`
				}
				return arr.join(str)
			},
			setShow(){
				this.isShowdec = !this.isShowdec
			}
		},
		created(){
			// console.log(this.$route.query.id)
			getAlbumById({id:this.$route.query.id}).then(res=>{
				// console.log(res.data.album)
				this.al_detail = res.data.album
				this.al_songs = res.data.songs
			})
		}
	}
</script>

<style>
	.album-detail{
		background: #fff;
	}
	.album-detail-left{
		width: 710px;
		border-right: 0.5px solid #dbdbdb;
		padding: 47px 30px 40px 39px;
	}
	.album-detail-right{
		box-sizing: border-box;
		width: 270px;
	}
	.n-albdesc{
		margin-top: 20px;
	}
	.n-albdesc p{
		color: #666;
		text-indent: 2em;
		line-height: 24px;
		margin-top: 4px;
	}
	.n-songtb{
		margin-top: 27px;
	}
	.u-cover-alb{
		width: 177px;
		height: 177px;
	}
	.u-cover-alb .msk{
		width: 209px;
		height: 177px;
		background-position: 0 -986px;
	}
	.u-icn-16{
		width: 54px;
		height: 24px;
		background-position: 0 -186px;
	}

	
</style>
