<template>
	<div class="artist-detail g-bd4">
		<div class="a-dt-l g-wrap6">
			<div class="n-artist f-cb">
				<div class="btm">
					<h2 class="sname f-thide sname-max" :title="artist.name">{{artist.name}}</h2>
					<h3 class="salias f-thide" v-if="artist.alias" :title="artist.alias.join(';')">{{artist.alias.join(';')}}</h3>
				</div>
				<img :src="artist.picUrl + '?param=640y300'">
				<div class="mask f-alpha"></div>
				<router-link v-if="artist.accountId" :to="`/user/home?id=${artist?.accountId}`">
					<span class="btn-rz f-tid bg-iconall">Ta的个人主页</span>
				</router-link>
				<span class="btnfav f-tid bg-iconall">收藏</span>
			</div>
			<ul class="m-tabs f-cb">
				<li v-for="(t,i) in tips" :key="i" :class="{fst:i == 0}" @click="setTip(t)">
					<span :class="{'z-slt': currentTip == t.c}">
						<em>{{t.title}}</em>
					</span>
				</li>
			</ul>
			<keep-alive>
				<component :is="currentComponent" :aid="this.$route.query.id" :count="count"></component>
			</keep-alive>
		</div>
		<div class="a-dt-r">
			<div class="g-wrap7">
				<h3 class="u-hd3">
					<span class="f-left">相似歌手</span>
				</h3>
				<ul class="m-hdlist f-cb">
					<li v-for="(a,i) in sartist" :key="i">
						<div class="hd">
							<router-link :to="`/discover/artist/detail?id=${a.id}`">
								<span :title="a.name">
									<img :src="a.picUrl + '?param=50y50'">
								</span>
							</router-link>
						</div>
						<p>
							<router-link :to="`/discover/artist/detail?id=${a.id}`">
								<span :title="a.name" class="nm nm-icn f-ib f-thide">
									{{a.name}}
								</span>
							</router-link>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
	import { getArtist,getSimiArtist } from 'network/api.js'
	import artistSongs from 'views/artist/artistSongs.vue'
	import artistAlbums from 'views/artist/artistAlbums.vue'
	import artistInfos from 'views/artist/artistInfos.vue'
	import artistMvs from 'views/artist/artistMvs.vue'
	export default {
		name:'artistDetail',
		components:{
			'artist-songs':artistSongs,
			'artist-albums':artistAlbums,
			'artist-mvs':artistMvs,
			'artist-infos':artistInfos
		},
		data(){
			return {
				artist:{},
				sartist:[],
				count:0,
				aid:this.$route.query.id,
				tips:[
					{
						title:'热门作品',
						c:'songs',
						count:0
					},
					{
						title:'所有专辑',
						c:'albums',
						count:0
					},
					{
						title:'相关MV',
						c:'mvs',
						count:0
					},
					{
						title:'相关介绍',
						c:'infos',
						count:0
					}
				],
				currentTip:'songs'
			}
		},
		computed:{
			currentComponent(){
				return 'artist-' + this.currentTip
			}
		},
		watch:{
			aid(){
				this.getartist()
				this.getsimi()
			}
		},
		methods:{
			setTip(t){
				this.currentTip = t.c;
				this.count = t.count
				// console.log(this.count)
			},
			getartist(){
				getArtist({id:this.aid}).then(res=>{
					this.artist = res.data.artist
					this.tips[0].count = res.data.artist.musicSize
					this.tips[1].count = res.data.artist.albumSize
					this.tips[2].count = res.data.artist.mvSize
				});
			},
			getsimi(){
				getSimiArtist({id:this.aid}).then(res=>{
					this.sartist = res.data.artists.slice(0,6)
				})
			}
		},
		beforeRouteUpdate(to,form,next){
			next();
			this.aid = to.query.id
		},
		created(){
			this.getartist()
			this.getsimi()
		}
	}
</script>

<style>
	.artist-detail{
		background: #fff;
	}
	.a-dt-l{
		width: 710px;
		box-sizing: border-box;
		border-right: 1px solid #DBDBDb;
	}
	.n-artist{
		position: relative;
		height: 333px;
		margin-top: -20px;
	}
	.n-artist .sname{
		float: left;
		max-width: 100%;
		height: 34px;
		line-height: 24px;
		font-weight: normal;
		font-size: 24px;
		color: #333;
	}
	.n-artist .sname-max{
		max-width: 75%;
	}
	.n-artist .salias{
		float: left;
		max-width: 23%;
		padding-left: 10px;
		font-size: 14px;
		line-height: 32px;
		color: #999;
		font-weight: normal;
	}
	.n-artist img, .n-artist .mask{
		display: block;
		width: 640px;
		height: 300px;
	}
	.n-artist .mask{
		position: absolute;
		top: 34px;
		left: 0;
	}
	.n-artist .btn-rz{
		display: block;
		position: absolute;
		bottom: 18px;
		right: 116px;
		width: 96px;
		height: 32px;
		background-position: 0 -1156px;
	}
	.n-artist .btnfav{
		display: block;
		position: absolute;
		bottom: 18px;
		right: 20px;
		width: 76px;
		height: 32px;
		background-position: 0 -500px;
	}
	.m-tabs{
		height: 39px;
		border: 1px solid #ccc;
		border-width: 0 1px;
		background-position: 0 0;
		background-repeat: repeat-x;
	}
	.m-tabs li, .m-tabs span, .m-tabs em{
		float: left;
		height: 39px;
		font-size: 14px;
	}
	.m-tabs li{
		position: relative;
		left: -1px;
	}
	.m-tabs span{
		padding-left: 2px;
	}
	.m-tabs em{
		height: 37px;
		width: 134px;
		padding: 2px 2px 0 0;
		line-height: 37px;
		cursor: pointer;
		text-align: center;
	}
	.m-tabs span.z-slt{
		background-position: left -90px;
	}
	.m-tabs span.z-slt em{
		background-position: right -90px;
	}
	.a-dt-r{
		width: 270px;
	}
	.m-hdlist{
		margin-left: -25px;
	}
	.m-hdlist li{
		float: left;
		width: 50px;
		height: 92px;
		padding-left: 25px;
	}
	.m-hdlist .hd, .m-hdlist .hd img{
		width: 50px;
		height: 50px;
	}
	.m-hdlist p{
		margin-top: 7px;
		text-align: center;
	}
</style>
