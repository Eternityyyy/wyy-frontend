<template>
	<div class="g-bd4 f-cb music-detail">
		<div class="music-detail-left">
			<div class="md-wrap">
				<div class="m-lycifo">
					<div class="f-cb">
						<div class="cvrwrap f-cb f-pr">
							<div class="u-cover u-cover-6 f-left">
								<img :src="song?.al?.picUrl+'?param=130y130'" class="j-img">
								<span class="msk f-alpha bg-cover"></span>
							</div>
							<div class="out s-fc3">
								<i class="u-icn u-icn-95 f-left"></i>
								<a href="">
									<span class="des s-fc7">生成外链播放</span>
								</a>
							</div>
						</div>
						<div class="cnt">
							<detail-title :Title="song?.name" icn_class="lab u-icn u-icn-37"></detail-title>
							<p class="des s-fc4">
								歌手：
								<span>
									<a href="" v-for="(sitem,sindex) in song?.ar" :key="sindex">
										{{sitem.name}}
										<span v-if="song.ar[sindex+1]">/</span>
									</a>
								</span>
							</p>
							<p class="des s-fc4">
								所属专辑：
								<a href="" class="s-fc7">{{song?.al?.name}}</a>
							</p>
							<add-music-btns :songid="song.id"></add-music-btns>
							<div class="bd bd-open f-brk f-ib">
								<p v-for="(titem,tindex) in lrc?.slice(0,13)" :key="tindex">{{titem}}</p>
								<div class="f-thide" v-show="isShow">
									<p v-for="(litem,lindex) in lrc.slice(13,)" :key="lindex">{{litem}}</p>
								</div>
								<div class="crl">
									<span class="s-fc7" @click="changeShow">
										{{showtext[Number(isShow)]}}
										<i class="u-icn" :class="isShow ? 'u-icn-70':'u-icn-69'"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="lrc-user"></div>
				</div>
				<Comments :cid="song.id" :cmtNum="CommentNum" Curl="/music"></Comments>
			</div>
		</div>
		<div class="music-detail-right"></div>
	</div>

</template>

<script>
	import detailTitle from 'views/detail/detailTitle.vue'
	import addMusicBtns from 'views/common/btns/addMusicBtns.vue'
	import Comments from 'views/detail/Comments.vue'
	
	import {getSongLyric,getSongDetail,getPlaylistCom} from 'network/api.js'
	export default {
		name:'musicDetail',
		components:{
			detailTitle,
			addMusicBtns,
			Comments
		},
		data(){
			return {
				lrc:[],
				song:{},
				CommentNum:0,
				isShow:false,
				showtext:['展开','收起']
			}
		},
		methods:{
			getSonglyric(){
				getSongLyric({id:this.$route.query.id}).then(res=>{
					// console.log(res.data.lrc)
					this.lrc = res.data.lrc?.lyric.replace(/\[\S+\]/g,'').split('\n')
				})
			},
			getSongdetail(){
				getSongDetail({ids:this.$route.query.id}).then(res=>{
					// console.log(res.data.songs)
					this.song = res.data.songs[0];
					getPlaylistCom('/music',{id:this.song.id,limit:1}).then(res=>{
						// console.log(res.data.total)
						this.CommentNum = res.data.total
					})
				})
			},
			changeShow(){
				this.isShow = !this.isShow
			}
		},
		beforeRouteUpdate(next){
			next();
			this.getSongdetail()
		},
		created(){
			this.getSongdetail();
			this.getSonglyric();
		}
	}
</script>

<style>
	.music-detail-left{
		width: 710px;
		border: 1px solid #dbdbdb;
	}
	.md-wrap{
		padding: 47px 30px 40px 39px;
	}
	.m-lycifo{
		margin-top: -10px;
	}
	.m-lycifo .cvrwrap{
		float: left;
		width: 206px;
		margin-right: -226px;
	}
	.u-cover-6 img{
		display: block;
		width: 130px;
		height: 130px;
		margin: 34px;
	}
	.u-cover-6 .msk{
		width: 206px;
		height: 205px;
		top: -4px;
		left: -4px;
		background-position: -140px -580px;
	}
	.m-lycifo .cvrwrap .out{
		float: left;
		margin: 20px 0 0 46px;
	}
	.m-lycifo .des{
		margin: 10px 0;
	}
	.m-lycifo .cvrwrap .des{
		text-decoration: underline;
	}
	.m-lycifo .cnt{
		float: right;
		width: 414px;
	}
	.m-lycifo .cnt .bd-open p{
		margin: 8px 0;
	}
	.m-lycifo .crl{
		margin-top: 5px;
	}
	.m-lycifo .des span{
		color-rendering: #333;
	}
	.music-detail-right{
		width: 270px;
	}
</style>
