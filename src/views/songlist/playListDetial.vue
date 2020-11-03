<template>
	<div class="rank-detail f-cb">
		<div class="rank-left">
			<div class="g-wrap6">
				<div class="mus-info f-cb">
					<div class="info-cover">
						<img :src="playlist.coverImgUrl+'?param=200y200'" alt="">
						<span class="msk bg-cover"></span>
					</div>
					<div class="cnt">
						<div class="cntc">
							<detail-title :Title="playlist.name" :isR="true" icn_class="u-icn-13"></detail-title>
							<div class="user f-cb">
								<a href="#" class="face">
									<img v-if="playlist.creator" :src="playlist.creator.avatarUrl+'?param=40y40'" alt="">
								</a>
								<span class="name">
									<a href="#" v-if="playlist.creator" class="s-fc7">{{playlist.creator.nickname}}</a>
								</span>
								<sup class="u-icn u-icn-84 bg-icon"></sup>
								<span class="time s-fc4">{{trunTime(playlist.createTime,'-')}}&nbsp;创建</span>
							</div>
							<detailBtns :subCount="playlist.subscribedCount" :shareCount="playlist.shareCount" :commentCount="playlist.commentCount" :Ptracks="playlist.tracks"></detailBtns>
							<div class="tags f-cb">
								<b>标签：</b>
								<a href="#" v-for="(tagitem,index) in playlist.tags" :key="index" class="u-tag">
									<i>{{tagitem}}</i>
								</a>
							</div>
							<p class="intr f-brk">
								<b>介绍：</b>
								{{playlist.description}}
							</p>
						</div>
					</div>
				</div>
				<discoverSection s_class="n-sontab">
					<template v-slot:title>歌曲列表</template>
					<template v-slot:container>
						<div class="j-flag">
							<detail-list :tracks="playlist.tracks"></detail-list>
						</div>
					</template>
				</discoverSection>
				<Comments :cid="$route.query.id" :cmtNum="cmtNum" Curl="/playlist"></Comments>
			</div>
		</div>
		<div class="rank-right g-wrap7">
			<recommend-user :userlist="reusers">喜欢这个歌单的人</recommend-user>
			<recommend-list :list="relists">相关推荐</recommend-list>
		</div>
	</div>

</template>

<script>
	import discoverSection from 'views/discover/discoverSection.vue'
	import Comments from 'views/detail/Comments.vue'
	import detailTitle from 'views/detail/detailTitle.vue'
	import detailBtns from 'views/detail/detailBtns.vue'
	import detailList from 'views/detail/detailList.vue'
	import recommendUser from 'views/detail/recommendUser.vue'
	import recommendList from 'views/detail/recommendList.vue'
	
	import { getListDetail,getRePlaylist,getSubPlaylist } from 'network/api.js'
	export default {
		name:'RankDetail',
		components:{
			discoverSection,
			Comments,
			detailTitle,
			detailBtns,
			detailList,
			recommendUser,
			recommendList
		},
		data(){
			return {
				playlist:{},
				cmtNum:0,
				reusers:[],
				relists:[]
			}
		},
		methods:{
			setPage(n){
				this.offset = n;
			}
		},
		created(){
			getListDetail({id:this.$route.query.id}).then(res=>{
				this.playlist = res.data.playlist
				// console.log(this.playlist)
				this.cmtNum = res.data.playlist.commentCount
			});
			getSubPlaylist({id:this.$route.query.id,limit:8}).then(res=>{
				// console.log(res.data)
				this.reusers = res.data.subscribers
			});
			getRePlaylist({id:this.$route.query.id}).then(res=>{
				this.relists = res.data.playlists
			})
		}
	}
</script>

<style>
	.u-title-1 .sub{
		margin: 9px 0 0 20px;
	}
	.rank-detail{
		background: #fff;
	}
	.rank-detail i{
		font-style: normal;
	}
	.rank-left{
		box-sizing: border-box;
		width: 710px;
		border-right: 0.5px solid #dbdbdb;
	}
	.rank-right{
		box-sizing: border-box;
		width: 270px;
		float: right;
	}
	.g-wrap6{
		padding: 47px 30px 40px 39px;
	}
	.mus-info .hd{
		line-height: 24px;
		position: relative;
		margin: 0 0 12px;
	}
	.mus-info .info-cover{
		float: left;
		position: relative;
		display: inline;
		margin: 0 -220px 0 0;
		width: 200px;
		height: 200px;
	}
	.info-cover img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.info-cover .msk{
		width: 208px;
		height: 208px;
		background-position: 0 -1285px;
		top: -4px;
		left: -4px;
		position: absolute;
	}
	.mus-info .cnt{
		float: right;
		width: 100%;
	}
	.mus-info .cntc{
		margin-left: 230px;
	}

	.mus-info .tit{
		margin-left: 64px;
		position: relative;
		line-height: 24px;
	}
	.mus-info .hd h2{
		line-height: 24px;
		font-size: 20px;
		font-weight: normal;
	}
	.mus-info .user{
		margin: 0 0 20px;
		line-height: 35px;
	}
	.mus-info .user .face{
		margin-right: 10px;
	}
	.mus-info .user .face,.mus-info .user .face img{
		float: left;
		width: 35px;
		height: 35px;
	}
	.mus-info .user .name{
		float: left;
		line-height: 35px;
	}
	.mus-info .user .time{
		margin-left: 15px;
		color: #999;
	}

	.mus-info .user .u-icn{
		float: left;
		margin: 9px 0 0 3px;
	}
	.rank-detail .u-icn-84{
		width: 12px;
		height: 13px;
		background-position: -65px -840px;
	}
	.mus-info .tags{
		margin: 25px 0 5px;
		line-height: 22px;
	}
	.mus-info .tags b{
		float: left;
		color: #666;
	}
	.mus-info .tags .u-tag{
		float: left;
		margin: 0 10px 3px 0;
	}
	.u-tag{
		color: #777;
		padding: 0 10px 0 0;
		text-shadow: 0 1px #fdfdfd;
		background-position: right -27px;
	}
	.u-tag,.u-tag i{
		float: left;
		height: 22px;
		line-height: 22px;
	}
	.u-tag i{
		position: relative;
		padding: 0 3px 0 13px;
		background-position: 0 0;
	}
	.mus-info .intr{
		margin-top: 4px;
		line-height: 18px;
		color: #666;
	}
	.mus-info b{
		font-weight: normal;
		color: #666;
	}
	.n-sontab{
		margin-top: 27px;
	}
	
</style>
