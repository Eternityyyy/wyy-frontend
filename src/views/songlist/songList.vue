<template>
	<div class="songlist">
		<div class="s-wrap">
			<div class="n-sltlyr d-flag " v-show="isShow">
				<div class="hd"><i class="icn bg-iconall"></i></div>
				<div class="bd">
					<h3>
						<span class="j-flag u-btn u-btn-g s-fc1" data-cat="全部">
							<em>全部风格</em>
						</span>
					</h3>
					<dl class="f-cb" v-for="(cateItem,index) in categories" :key="index">
						<dt><i class="u-icn" :class="{'u-icn-71':index == 0,'u-icn-6':index == 1,'u-icn-7':index == 2,'u-icn-8':index == 3,'u-icn-9':index == 4}"></i>{{cateItem}}</dt>
						<dd :class="{last:index == 4}">
							<span  v-for="(catItem,catindex) in catlist[index]" :key="catindex" class="s-fc1" :data-cat="catItem.name">
								<!-- <a @click="setCat(catItem.name)" :class="{'z-slt':cat == catItem.name}">{{catItem.name}}</a> -->
								<router-link :to="`/discover/songlist?cat=${catItem.name}`" :active-class="cat == catItem.name ? 'z-slt' : ''">{{catItem.name}}</router-link>
								<span class="line">|</span>
							</span>
						</dd>
						
					</dl>
				</div>
				<div class="ft"></div>
			</div>
			<discover-section>
				<template v-slot:title>{{cat}}</template>
				<template v-slot:titleLi>
					<a class="u-btn2 u-btn2-1 menu" @click="toggleShow">
						<i>选择分类
							<em class="u-icn u-icn-38"></em>
						</i>
					</a>
				</template>
				<template v-slot:titleR>
					<span class="u-btn u-btn-hot">
						<a class="a1">热门</a>
					</span>
				</template>
				<template v-slot:container>
					<div class="m-cvrlst f-cb">
						<play-li v-for="(playli,index) in songlist" :Playli="playli" :key="index" :imgUrl="playli.coverImgUrl">
							<p class="dec" :title="playli.name">{{playli.name}}</p>
							<p>
								<span>by</span>
								<a href="">{{playli.creator.nickname}}</a>
								<sup class="u-icn u-icn-1"></sup>
							</p>
						</play-li>
					</div>
				</template>
			</discover-section>
			<Pagination :pageNum="Math.ceil(totalSong/limit)" @setpage="setPage" ref="pagination"></Pagination>
		</div>
	</div>
	

</template>

<script>
	import discoverSection from 'views/discover/discoverSection.vue'
	import playLi from 'views/recommend/playLi.vue'
	import Pagination from 'views/common/Pagination.vue'
	
	import {getSongList,getCatList} from 'network/api.js'
	export default {
		name:'songList',
		components:{
			discoverSection,
			playLi,
			Pagination
		},
		data(){
			return {
				isShow:false,
				order:'hot',
				limit:35,
				cat:'全部',
				offset:1,
				songlist:[],
				catlist:{},
				totalSong:0,
				categories:{}
			}
		},
		watch:{
			offset(){
				this.getSonglist()
			},
			cat(){
				this.getSonglist()
			},
			order(){
				this.getSonglist()
			}
		},
		methods:{
			getSonglist(){
				getSongList({limit:this.limit,order:this.order,cat:this.cat,offset:(this.offset-1)*this.limit}).then(res=>{
					// console.log(res.data.playlists)
					this.songlist = res.data.playlists
					this.totalSong = res.data.total
				})
			},
			getCatlist(){
				getCatList().then(res=>{
					// console.log(res.data.sub)
					res.data.sub.forEach(item=>{
						if(!this.catlist[item.category]){
							this.catlist[item.category] = []
						}
						this.catlist[item.category].push(item)
					})
					this.categories = res.data.categories
				})
			},
			setPage(n){
				this.offset = n
			},
			toggleShow(){
				this.isShow = !this.isShow
			},
			// setCat(cat){
			// 	this.cat = cat;
			// 	this.isShow = !this.isShow
			// 	this.$refs.pagination.activeIndex = 1;
			// }
		},
		beforeRouteUpdate(to,form,next){
			next();
			this.cat = to.query.cat
		},
		created(){
			this.cat =this.$route.query?.cat ?? '全部';
			this.getSonglist();
			this.getCatlist();
		}
	}
</script>

<style>
	.songlist{
		background-color: white;
	}
	.s-wrap{
		padding: 40px;
		position: relative;
	}
	.n-sltlyr .hd, .n-sltlyr .bd, .n-sltlyr .ft{
		background: url(~assets/img/sltlyr.png) no-repeat;
	}
	.n-sltlyr{
		position: absolute;
		top: 75px;
		z-index: 5;
		width: 720px;
		left: 0;
	}
	.n-sltlyr .hd{
		height: 32px;
	}
	.n-sltlyr .icn{
		position: absolute;
		top: 2px;
		left: 132px;
		display: inline-block;
		width: 24px;
		height: 11px;
		background-position: -48px 0;
		vertical-align: middle;
	}
	.n-sltlyr .bd{
		width: 700px;
		padding: 0 10px;
		background-position: -720px 0;
		background-repeat: repeat-y;
	}
	.n-sltlyr h3{
		height: 37px;
		padding-left: 26px;
		border-bottom: 1px solid #e6e6e6;
		font-weight: normal;
	}
	.n-sltlyr dt{
		float: left;
		display: inline;
		width: 70px;
		margin: 0 -100px 0 26px;
		padding-top: 15px;
		border-right: 1px solid #e6e6e6;
		font-weight: bold;
	}
	.n-sltlyr .u-icn{
		margin-right: 8px;
		margin-bottom: 4px;
	}
	.u-icn-71{
		width: 23px;
		height: 23px;
		background-position: -20px -735px;
	}
	.u-icn-6{
		width: 24px;
		height: 24px;
		background-position: 0 -60px;
	}
	.u-icn-7{
		width: 24px;
		height: 24px;
		background-position: 0 -88px;
	}
	.u-icn-8{
		width: 24px;
		height: 24px;
		background-position: 0 -117px;
	}
	.u-icn-9{
		width: 24px;
		height: 24px;
		background-position: 0 -141px;
	}
	.n-sltlyr dd{
		margin-left: 96px;
		padding: 16px 15px 0 15px;
		border-left: 1px solid #e6e6e6;
		line-height: 24px;
		word-wrap: break-word;
		word-break: break-word;
	}
	.n-sltlyr dd .z-slt{
		background: #a7a7a7;
		color: #fff;
		padding: 2px 6px;
	}
	.n-sltlyr dd a{
		white-space: nowrap;
	}
	.n-sltlyr dd .line{
		margin: 0 8px 0 10px;
		color: #d8d8d8;
	}
	.n-sltlyr .ft{
		height: 20px;
		background-position: -1440px -12px;
	}
	.n-sltlyr dd.last{
		padding-bottom: 25px;
	}
	.songlist .titleLi{
		margin: 0px;
		display: inline-block;
	}
	.songlist .title-more{
		margin: 0;
	}
	.m-cvrlst{
		display: flex;
		flex-wrap: wrap;
		margin: 30px 0 0 -50px;
	}
	.m-cvrlst .play-li{
		padding: 0 0 30px 50px;
	}
	.titleLi .menu{
		font-size: 12px;
		font-weight: normal;
		margin: 2px 0 0 12px;
	}
	.u-btn2-1{
		color: #333;
		background-position: right -100px;
	}
	.u-btn2-1:hover i{
		color:#333;
		background-position:0 -141px;
		}
	.u-btn2-1 i{
		background-position: 0 -59px;
	}
	.section-title .menu i{
		color: #0c73c2 !important;
		padding: 0 10px 0 15px;
	}
	.section-title .menu .u-icn-38{
		margin-left: 5px;
	}
	.u-icn-38{
		width: 8px;
		height: 5px;
		background-position: -70px -543px;
	}
	.u-btn-hot{
		display: inline-block;
		height: 29px;
		background-position: 0 0;
		border-radius: 3px;
	}
	.section-title .u-btn .a1{
		float: left;
		width: 46px;
		height: 29px;
		line-height: 29px;
		text-align: center;
	}
</style>
