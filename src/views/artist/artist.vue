<template>
	<div class="artist g-bd4">
		<div class="artist-left">
			<div class="artist-left-wrap n-sgernav">
				<h2 class="tit">推荐</h2>
				<ul class="f-cb">
					<li>
						<router-link to="/discover/artist" :exact-active-class="url == '/discover/artist' ? 'z-slt' : ''" active-class="">
							<span class="cat-flag">推荐歌手</span>
						</router-link>
					</li>
				</ul>
				<div class="blk" v-for="(a,i) in areas" :key="i">
					<h2 class="tit">{{a}}</h2>
					<ul class="" v-for="(t,k) in types" :key="k">
						<li>
							<router-link 
							:to="`/discover/artist?type=${k}&area=${i}`" 
							:exact-active-class="this.$route.query.type == k && this.$route.query.area == i?'z-slt' : ''">
								<span class="cat-flag">{{a}}{{t}}</span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="artist-right">
			<div class="g-wrap">
				<div class="u-title f-cb">
					<h3>
						<span class="f-ff2">{{title}}</span>
					</h3>
				</div>
				<ul v-if="this.$route.query.type" class="n-ltlst f-cb">
					<li @click="setInitial(-1)">
						<span class="ch f-fs0" :class="{'z-slt':initial == -1}">热门</span>
					</li>
					<li v-for="n in 26" :key="n" @click="setInitial(String.fromCharCode(n+64))">
						<span :class="{'z-slt':String(initial).charCodeAt() == n + 64}" >{{String.fromCharCode(n+64)}}</span>
					</li>
					<li @click="setInitial(0)">
						<span class="ch f-fs0" :class="{'z-slt':initial == 0}">其他</span>
					</li>
				</ul>
				<artist-list :list="list"></artist-list>
			</div>
		</div>
	</div>

</template>

<script>
	import artistList from 'views/artist/artistList.vue'
	import { getHotArtist,getArtistList } from 'network/api.js'
	export default {
		name:'artist',
		components:{
			artistList
		},
		data(){
			return {
				list:[],
				offset:1,
				initial:'-1',
				limit:100,
				areas:{
					// -1:'全部',
					7:'华语',
					96:'欧美',
					8:'日本',
					16:'韩国',
					0:'其他'
				},
				types:{
					// -1:'全部',
					1:'男歌手',
					2:'女歌手',
					3:'乐队'
				},
				area: this.$route.query?.area,
				type: this.$route.query?.type,
				url: this.$route.fullPath
			}
		},
		computed:{
			title(){
				return this.$route.query?.area ? this.areas[this.area] + this.types[this.type] : '热门推荐'
			}
		},
		watch:{
			initial(){
				this.getList()
			},
			title(){
				this.url = this.$route.fullPath
				// console.log(this.$route)
				this.getList()
			}
		},
		beforeRouteUpdate(to,form,next){
			next()
			if(to.query.type){
				this.area = to.query.area;
				this.type = to.query.type;
			}else{
				this.getHotArtist()
			}
		},
		methods:{
			getList(){
				if(this.$route.query.type){
					getArtistList({
						type:this.type,
						area:this.area,
						initial:this.initial,
						offset:(this.offset-1),
						limit:this.limit})
						.then(res=>{
							// console.log(res.data)
							this.list = res.data.artists
						})
				}else{
					getHotArtist({limit:100}).then(res=>{
						// console.log(res.data)
						this.list = res.data.artists
					})
				}
			},
			setInitial(i){
				// console.log(i)
				this.initial = i;
			}
		},
		created(){
			// console.log(this.$route)
			this.getList()
		}
	}
</script>

<style>
	.artist-left{
		width: 180px;
		border-right: 1px solid #bdbdbd;
	}
	.artist-left-wrap{
		padding: 0 10px 40px;
	}
	.artist-right{
		background: #fff;
	}
	.n-sgernav{
		margin-top: 51px;
	}
	.n-sgernav .tit{
		height: 25px;
		padding-left: 14px;
		font-size: 16px;
		font-family: "microsoft yahei";
	}
	.n-sgernav li a{
		background: url(~assets/img/singer.png) no-repeat 0 9999px;
	}
	.n-sgernav li, .n-sgernav li a{
		float: left;
		width: 160px;
		height: 29px;
		line-height: 29px;
	}
	.n-sgernav li{
		margin-bottom: 2px;
	}
	.n-sgernav li a{
		width: 133px;
		padding-left: 27px;
		padding-right: 0px;
		background-position: 0 -30px;
		color: #333;
	}
/* 	.n-sgernav .nav li a:hover{
		background: #f5f5f5;
		color: #1b1818;
	} */
	.n-sgernav li a.z-slt, .n-sgernav li a.z-slt:hover{
		background-position: 0 0;
		text-decoration: none;
		color: #c20c0c;
	}
	.n-sgernav .blk{
		margin: 5px 0 0;
		padding-top: 16px;
		border-top: 1px solid #D3D3D3;
	}
	.m-sgerlist .m-cvrlst{
		margin: 20px 0 0 -17px;
	}
	.m-sgerlist .m-cvrlst li{
		padding-left: 17px;
	}
	.m-cvrlst-5 li{
		width: 130px;
		height: 154px;
	}
	.m-cvrlst li.line{
		margin-bottom: 12px;
		border-bottom: 1px dotted #999;
	}
	.m-cvrlst li.sml{
		height: 30px;
		width: 130px;
		padding-bottom: 0;
		line-height: 23px;
	}
	.m-cvrlst-5 li .nm-icn{
		float: left;
	}
	.m-cvrlst li.sml .nm-icn{
		max-width: 105px;
	}
	.m-cvrlst-5 li.sml .u-icn-5{
		float: left;
		margin: 4px 0 0 2px;
	}
	.n-ltlst{
		margin-top: 20px;
		margin-left: -3px;
	}
	.n-ltlst li{
		display: inline;
		float: left;
		margin-left: 3px;
		font-size: 14px;
	}
	.n-ltlst li span{
		float: left;
		width: 21px;
		line-height: 24px;
		text-align: center;
	}
	.n-ltlst li .ch{
		width: 45px;
		height: 24px;
	}
	.n-ltlst li span.z-slt, .n-ltlst li span.z-slt:hover{
		background: #c20c0c;
		border-radius: 2px;
		color: #fff;
	}
	
</style>
