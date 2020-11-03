<template>
	<div class="dj-program">
		<div class="dj-program-left">
			<div class="dj-program-left-wrap">
				<div class="m-info m-info-program f-cb">
					<div class="cover u-cover u-cover-program">
						<img :src="program?.coverUrl + '?param=140y140'">
					</div>
					<div class="cnt">
						<div class="cntc">
							<div class="topblk2">
								<detail-title icn_class="u-icn2 u-icn2-7" :Title="program.name"></detail-title>
								<div class="rdiname">
									<i class="icon u-icn2 u-icn2-8 f-left"></i>
									<a href="" class="f-left f-fs2 f-ff2 s-fc3" :title="program?.dj?.brand">{{program?.dj?.brand}}</a>
									<span class="j-flag">
										<span href="" class="u-btni u-btni-dy">
											<i>
												<em class="u-icn2 u-icn2-dy"></em>
												订阅({{program.subscribedCount}})
											</i>
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="m-prointr">
					<div class="btns f-cb j-flag">
						<add-music class="u-btni u-btni-play">
							<i>播放 {{trunMTime(program.duration/1000)}}</i>
						</add-music>
						<span class="u-btn2 u-btn2-1 u-btn2-icn">
							<i>
								<em class="icn icn-praise"></em>
								<span class="f-left">{{program.likeCount>0?`(${program.likeCount})`:'分享'}}</span>
							</i>
						</span>
						<span class="u-btni u-btni-cmmt">
							<i>{{program.commentCount>0?`(${program.commentCount})`:'评论'}}</i>
						</span>
						<share-btn class="u-btni u-btni-share">
							<i>{{program.shareCount>0?`(${program.shareCount})`:'分享'}}</i>
						</share-btn>
						<download-btn class="u-btni u-btni-dl">
							<i>下载</i>
						</download-btn>
						<span class="u-outlink">
							<i class="u-icn u-icn-95"></i>
							<a href="" class="s-fc7">生成外链播放</a>
						</span>
					</div>
					<div class="sub">
						<router-link :to="`/discover/djradio/category?id=${program?.radio?.categoryId}`">
							<span class="cat u-type u-type-red">{{ program?.radio?.category }}</span>
						</router-link>
						<strong class="f-fs1">
							<span class="f-thide f-ib f-vam" :title="program?.radio?.name">{{program?.radio?.name}}</span>
							第{{program.serialNum}}期
						</strong>
						<span class="s-fc4 sep">{{trunTime(program.createTime,'-')}}</span>
						<span class="sep s-fc4">
							播放<em class="f-fw1 s-fc6">{{program.listenerCount}}</em>次
						</span>
					</div>
					<p v-for="(titem,tindex) in dec" :key="tindex">
						{{titem}}
					</p>
				</div>
				<div class="n-songtb" v-if="song">
					<div class="prohead">
						<a href="" class="open s-fc3">
							收起
							<i class="icn u-icn2 u-icn2-9"></i>
						</a>
						<div class="total">
							<strong class="f-fw1">节目包含歌曲列表</strong>
							<span class="s-fc3">（{{program.trackCount}}首歌）</span>
						</div>
					</div>
					<div class="j-flag">
						<table class="m-table m-table-prog">
							<tbody>
								<tr>
									<td class="first">
										<div class="hd">
											<span class="ply"></span>
											<span class="num">1</span>
										</div>
									</td>
									<td class="col2">
										<div class="f-cb">
											<div class="tt">
												<div class="txt">
													<router-link :to="`/discover/song?id=${song?.id}`">
														<b :title="song?.name">{{song?.name}}</b>
													</router-link>
												</div>
											</div>
										</div>
									</td>
									<td class="col3">
										<music-time :musictime="song.dt/1000"></music-time>
										<div class="opt hshow">
											<add-music class="u-icn u-icn-81 icn-add"></add-music>
											<collect-btn class="icn icn-fav"></collect-btn>
											<share-btn class="icn icn-share"></share-btn>
											<download-btn class="icn icn-dl"></download-btn>
										</div>
									</td>
									<td class="col4">
										<div class="text" :title="songars">
											<span :title="songars">
												<a href="" v-for="(aitem,aindex) in song?.ar" :key="aindex">
													{{aitem.name}}
													<template v-if="song?.ar[aindex+1]">/</template>
												</a>
											</span>
										</div>
									</td>
									<td class="col5">
										<div class="text">
											<router-link :to="`/discover/album?id=${song?.al?.id}`" :title="song?.al?.name">{{song?.al?.name}}</router-link>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<Comments Curl="/dj" :cid="this.$route.query.id" :cmtNum="program.commentCount"></Comments>
			</div>
		</div>
		<div class="dj-program-right"></div>
	</div>

</template>

<script>
	import detailTitle from 'views/detail/detailTitle.vue'
	import musicTime from 'views/common/musicTime'
	import Comments from 'views/detail/Comments.vue'
	import { addMusic,shareBtn,downloadBtn,CollectBtn } from 'views/common/btns/index.js'
	import { getDjProgramDetail,getSongDetail } from 'network/api.js'
	export default {
		name:'djProgram',
		components:{
			detailTitle,
			addMusic,
			shareBtn,
			downloadBtn,
			musicTime,
			CollectBtn,
			Comments
		},
		data(){
			return {
				pid:this.$route.query.id,
				sid:0,
				program:{},
				song:null,
				songars:'',
				dec:''
			}
		},
		watch:{
			sid(){
				this.getsongDetail()
			}
		},
		methods:{
			getProgram(){
				getDjProgramDetail({id:this.pid}).then(res=>{
					console.log(res.data)
					this.program = res.data.program
					this.dec = res.data.program.description.split('\n\n');
					if(res.data.program.songs.length>0){
						this.sid = res.data.program.songs[0].id
					}
				})
			},
			getsongDetail(){
				getSongDetail({ids:this.sid}).then(res=>{
					console.log(res.data.songs)
					this.song = res.data.songs[0]
					this.songars = this.song.ar.map(item=>{
						return item.name
					}).join('/')
				})
			},
			trunMTime(second){
				let minute = second/60>=10 ? Math.floor(second/60) : '0' + Math.floor(second/60);
				let seconds = second%60>=10 ? Math.floor(second%60) : '0' + Math.floor(second%60);
				return minute + '分' + seconds +'秒'
			}
		},
		beforeRouteUpdate(to,form,next){
			next();
			this.pid = to.query.id
		},
		created(){
			this.getProgram()
		}
	}
</script>

<style>
	.dj-program{
		background: #fff;
	}
	.dj-program-left{
		width: 710px;
		box-sizing: border-box;
		border-right: 1px solid #dbdbdb;
	}
	.dj-program-left-wrap{
		padding: 47px 30px 40px 39px;
	}
	.m-info-program .cover{
		padding: 3px;
		border: 1px solid #d5d5d5;
	}
	.u-cover-program{
		width: 140px;
		height: 140px;
	}
	.m-info-program .cntc{
		margin-left: 170px;
	}
	.m-info-program .topblk2{
		padding-top: 18px;
	}
	.m-info-program .topblk2 .hd{
		margin-bottom: 29px;
	}
	.m-info-program .rdiname{
		line-height: 26px;
	}
	.m-info-program .rdiname .icon{
		margin: 5px 7px 0 0;
	}
	.m-info-program .rdiname .u-btni-dy{
		margin-left: 17px;
	}
	.m-prointr{
		margin-top: 20px;
	}
	.m-prointr .btns{
		margin-bottom: 25px;
	}
	.m-prointr .btns .u-btni, .m-prointr .btns .u-btn2{
		float: left;
		margin-right: 10px;
	}
	.m-prointr .sub{
		height: 35px;
		line-height: 35px;
	}
	.m-prointr .cat{
		margin: -3px 9px 0 0;
	}
	.m-prointr .f-thide{
		padding-bottom: 2px;
		max-width: 42%;
		margin-right: 5px;
	}
	.m-prointr .sub .sep{
		margin-left: 18px;
	}
	.m-prointr p{
		margin-bottom: 30px;
	}
	.n-songtb .prohead{
		height: 32px;
		padding: 0 10px;
		margin-bottom: -1px;
		overflow: hidden;
		background: #f7f7f7;
		border: 1px solid #d9d9d9;
		line-height: 33px;
	}
	.n-songtb .prohead .open{
		float: right;
		margin: 7px 6px 0 0;
		line-height: 17px;
	}
	.n-songtb .prohead .open .icn{
		display: inline-block;
		margin-left: 5px;
	}
	
</style>
