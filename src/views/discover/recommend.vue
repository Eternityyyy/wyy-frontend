<template>
	<div class="recommend">
		<Banner :imglist="imglist" width="982px" height="285px">
			<div class="banner-up bg-d">
				<a href="#" class="download-btn  bg-d">
					下载客户端
				</a>
				<p>下载客户端</p>
				<span class="shadow bg-banner"></span>
				<span class="shadowr bg-banner"></span>
			</div>
		</Banner>
		<div class="discover-module">
			<div class="g-wrap3">
				<!-- 热门推荐 -->
				<discover-section :titleUrl="hots.url" s_class="hot-recommed">
					<template v-slot:title>{{hots.name}}</template>
					<template v-slot:titleLi>
						<ul>
							<li v-for="(hotli,index) in hots.hots_li" :key="index">
								<!-- <a>{{hotli.name}}</a> -->
								<router-link :to="`/discover/songlist?cat=${hotli.name}`">{{hotli.name}}</router-link>
								<span v-if="index<hots.hots_li.length-1">|</span>
							</li>
						</ul>
					</template>
					<template v-slot:titleR>
						<router-link :to="hots.url">
							<span class="more-text">更多</span>
						</router-link>
						<i class="bg-index more-arr"></i>
					</template>
					<template v-slot:container>
						<div class="hots-list">
							<playLi v-for="(playli,index) in hots.hots_play" :key="index" :Playli="playli" :imgUrl="playli.picUrl">
								<router-link :to="`/discover/playlist?id=${playli.id}`">{{playli.name}}</router-link>
							</playLi>
						</div>
					</template>
				</discover-section>
				<person-re v-if="userProfile"></person-re>
				<!-- 新碟上架 -->
				<discover-section :titleUrl="new_album.url" s_class="n-new">
					<template v-slot:title>{{new_album.name}}</template>
					<template v-slot:titleR>
						<router-link :to="new_album.url"><span class="more-text">更多</span></router-link>
						<i class="bg-index more-arr"></i>
					</template>
					<template v-slot:container>
						<div class="n-disk">
							<div class="disk-inner">
								<span class="disk-pre bg-index" @click="rollPre"></span>
								<div class="roll">
									<ul id="ul0" ref="ul0" :style="{left:ulLeft[0]+'px','transition-duration':tlTime+'s'}">
										<albumItem :new_list="new_album.new_list.slice(0,5)" Width="100px" Height="100px"></albumItem>
									</ul>
									<ul id="ul1" ref="ul1" :style="{left:ulLeft[1]+'px','transition-duration':tlTime+'s'}">
										<albumItem :new_list="new_album.new_list.slice(5,)" Width="100px" Height="100px"></albumItem>
									</ul>
								</div>
								<span class="disk-af bg-index" @click="rollAfter"></span>
							</div>
						</div>
					</template>
				</discover-section>
				<!-- 榜单 -->
				<discover-section :titleUrl="rank.url" s_class="n-bill">
					<template v-slot:title>{{rank.name}}</template>
					<template v-slot:titleR>
						<router-link :to="rank.url"><span class="more-text">更多</span></router-link>
						<i class="bg-index more-arr"></i>
					</template>
					<template v-slot:container>
						<div class="n-blist bg-bill">
							<rank-list :rankid="rankitem.id" v-for="(rankitem,index) in rank.rank_list" :key="index"></rank-list>
						</div>
					</template>
				</discover-section>
			</div>
			<div class="wrap-right">
				<user-info-easy v-if="this.userProfile" :userinfo="userProfile"></user-info-easy>
				<div v-else class="n-user-profile">
					<div class="n-myinfo n-myinfo-1 s-bg s-bg-1 bg-index">
						<p class="note s-fc3">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
						<span class="btn s-bg s-bg-2 f-btn" @click="login">用户登录</span>
					</div>
				</div>
				<div class="n-singer">
					<h3 class="v-hd4">
						<span class="f-left">热门歌手</span>
						<router-link :to="`/discover/artist`">
							<span class="more s-fc3">查看全部></span>
						</router-link>
					</h3>
					<ul class="n-enter f-cb">
						<li v-for="(hitem,hindex) in hotArtist" :key="hindex">
							<router-link :to="`/discover/artist/detail?id=${hitem.id}`">
								<span class="itm f-tdn">
									<div class="head">
										<img :src="hitem?.picUrl + '?param=62y62'" alt="">
									</div>
									<div class="ifo">
										<h4>
											<span class="nm f-fs1 f-ib f-thide">{{hitem?.name}}</span>
										</h4>
									</div>
								</span>
							</router-link>
						</li>
					</ul>
					<div>
						<a class="u-btn2 u-btn2-1">
							<i>申请成为网易音乐人</i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	import Banner from 'views/recommend/Banner.vue'
	import discoverSection from 'views/discover/discoverSection.vue'
	import playLi from 'views/recommend/playLi.vue'
	import albumItem from 'views/recommend/albumItem.vue'
	import rankList from 'views/recommend/rankList.vue'
	import userInfoEasy from 'views/user/userInfoEasy.vue'
	import personRe from 'views/recommend/personRe.vue'
	
	import {getBanner,getPlayList,getHotRecommed,getAlbum,getToplist,getHotArtists} from 'network/api.js'
	export default {
		name:'Recommend',
		components:{
			Banner,
			discoverSection,
			playLi,
			albumItem,
			rankList,
			userInfoEasy,
			personRe
		},
		computed:{
			...mapState(['userProfile'])
		},
		data(){
			return {
				imglist:[],
				hots:{
					name:'热门推荐',
					url:'/discover/songlist',
					hots_li:[],
					hots_play:[]
				},
				personal:{
					name:'个性化推荐',
					url:'/discover/songlist',
					personal_list:[]
				},
				new_album:{
					name:'新碟上架',
					url:'/discover/album',
					new_list:[]
				},
				rank:{
					name:'榜单',
					url:"/discover/rank",
					rank_list:[]
				},
				albumIndex:0,
				ulLeft:[0,645],
				tlTime:1,
				timer:null,
				hotArtist:[]
			}
		},
		methods:{
			controlLeft(op,n){
				if(this.timer){
					return
				}
				let index= Number(!this.albumIndex)
				if(op == 'after'){
					this.ulLeft[index] = 645
					// document.getElementById(`ul${index}`).style.left = '645px'
					// console.log(document.getElementById(`ul${index}`))
				}
				if(op == 'pre'){
					this.ulLeft[index] = -645
					console.log(`ul${index}`)
					// this.$refs.[`ul${index}`].style.left = '-645px'
					// document.getElementById(`ul${index}`).style.left = '-645px'
					// console.log(this.$refs.[`ul${index}`].style.left)
				}
				this.tlTime = 1;
				this.ulLeft[0] += n;
				this.ulLeft[1] += n;
				this.albumIndex = index;
				// this.timer = setTimeout(()=>{
				// 	this.tlTime = 0;
				// 	this.timer = null;
				// },1000)
			},
			rollAfter(){
				this.controlLeft('after',-645);
			},
			rollPre(){
				this.controlLeft('pre',645);
			},
			login(){
				this.$root.isLogin = true;
			}
		},
		created(){
			getBanner().then(res=>{
				// console.log(res.data.banners)
				this.imglist = res.data.banners
			});
			getPlayList().then(res=>{
				// console.log(res.data.tags)
				this.hots.hots_li = res.data.tags.slice(0,5)
			});
			getHotRecommed().then(res=>{
				console.log(res.data.result)
				this.hots.hots_play = res.data.result
			});
			getAlbum().then(res=>{
				// console.log(res.data.products);
				this.new_album.new_list = res.data.albums.slice(0,10);
			});
			getToplist().then(res=>{
				// console.log(res.data.list);
				this.rank.rank_list = res.data.list.slice(0,3);
			});
			getHotArtists({limit:5}).then(res=>{
				console.log(res.data.artists)
				this.hotArtist = res.data.artists
			});
		},
	}
</script>

<style>
	.discover-module{
		background: #fff;
		margin: auto;
		width: 980px;
		display: flex;
	}
	.g-wrap3{
		width: 730px;
		box-sizing: border-box;
		border-left: 0.5px solid #dbdbdb;
		border-right: 0.5px solid #dbdbdb;
		padding: 20px 20px 40px;
	}
	.hot-recommed li{
		float: left;
	}
	.hot-recommed li{
		color: #666;
	}
	.hot-recommed li span{
		margin: 0 10px;
	}
	.bg-d{
		background: url(~assets/img/download.png) no-repeat 0 0;
	}
	.banner-up{
		position: absolute;
		top: 0px;
		right: -1px;
		width: 254px;
		height: 285px;
	}
	.download-btn{
		display: block;
		width: 215px;
		height: 56px;
		margin: 186px 0 0 19px;
		background-position: 0 9999px;
		text-indent: -9999px;
	}
	.banner-up p{
		margin: 0 auto;
		text-align: center;
		color: #8d8d8d;
	}
	.banner-up span{
		display: block;
		position: absolute;
		top: 0px;
		left: -20px;
		width: 20px;
		height: 285px;
		background-position: -1px 0;
		/* background: url(~assets/img/banner.png) 0 9999px no-repeat; */
	}
	.banner-up .shadowr{
		left: auto;
		right: -20px;
		background-position: -20px 0;
	}
	.hots-list{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 20px;
	}
	.wrap-right{
		width: 250px;
		box-sizing: border-box;
		border-right: 0.5px solid #dbdbdb;
	}
	.n-disk{
		position: relative;
		height: 186px;
		margin: 20px 0 37px;
		border: 1px solid #d3d3d3;
	}
	.disk-inner{
		height: 184px;
		padding-left: 16px;
		background: #f5f5f5;
		border: 1px solid #fff;
	}
	.n-disk .roll{
		float: left;
		width: 645px;
		height: 180px;
		overflow: hidden;
		position: relative;
	}
	.n-disk ul{
		position: absolute;
		top: 0;
		width: 645px;
		margin: 28px 0 0;
		transition-property: left;
	}
	.n-disk li{
		float: left;
		display: inline;
		width: 118px;
		height: 150px;
		margin-left: 11px;
		background-position: -260px 100px;
	}
	.disk-inner span{
		position: absolute;
		top: 71px;
		width: 17px;
		height: 17px;
		cursor: pointer;
	}
	.disk-pre{
		left: 4px;
		background-position: -260px -75px;
	}
	.disk-af{
		background-position: -300px -75px;
	}
	.n-blist{
		height: 472px;
		margin-top: 20px;
		padding-left: 1px;
	}
	.blk{
		float: left;
		width: 230px;
	}
	.blk:last-child{
		width: 228px;
	}
	.n-blist .top{
		height: 100px;
		padding: 20px 0 0 19px;
	}
	.bill-cover{
		float: left;
		display: inline;
		width: 80px;
		height: 80px;
		position: relative;
	}
	.bill-cover img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.bill-cover a{
		background-position: -145px -57px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.bill-tit{
		float: left;
		width: 116px;
		margin: 6px 0 0 10px;
	}
	.bill-btn{
		margin-top: 10px;
	}
	.bill-btn a,.bill-btn span{
		display: block;
		float: left;
		width: 22px;
		height: 22px;
		margin-left: 10px;
	}
	.bill-btn .bill-play{
		background-position: -267px -205px;
	}
	.bill-btn .bill-coll{
		background-position: -300px -205px;
	}
	.n-myinfo-1{
		height: 126px;
		padding-top: 0;
	}
	.n-myinfo .note{
		width: 205px;
		margin: 0 auto;
		padding: 16px 0;
		line-height: 22px;
	}
	.n-myinfo-1 .btn{
		margin: 0 auto;
	}
	.n-myinfo .btn{
		display: block;
		width: 100px;
		height: 31px;
		line-height: 31px;
		text-align: center;
		color: #fff;
		text-shadow: 0 1px 0 #8a060b;
	}
	.n-singer{
		margin-top: 15px;
	}
	.v-hd3{
		position: relative;
		height: 23px;
		margin: 0 20px;
		border-bottom: 1px solid #ccc;
		color: #333;
	}
	.n-enter{
		margin: 6px 0 14px 20px;
	}
	.n-enter li,.n-enter .itm{
		float: left;
		width: 210px;
		height: 62px;
		background: #fafafa;
	}
	.n-enter li{
		margin-top: 14px;
	}
	.n-enter .head, .n-enter .head img{
		float: left;
		width: 62px;
		height: 62px;
	}
	.n-enter .ifo{
		float: left;
		width: 133px;
		height: 60px;
		padding-left: 14px;
		border: 1px solid #e9e9e9;
		border-left: none;
	}
	.n-enter h4{
		margin-top: 8px;
	}
	.n-enter .nm{
		width: 90%;
	}
	.n-singer .u-btn2{
		margin-left: 20px;
		border-radius: 4px;
	}
	.n-singer .u-btn2 i{
		width: 170px;
		font-weight: bold;
	}
	
</style>
