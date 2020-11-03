<template>
	<div class="list" v-if="isList">
		<div class="listhd">
			<div class="listhdc">
				<h4>
					播放列表(<span class="j-flag">{{track_queue?.length}}</span>)
				</h4>
				<span class="addall">
					<span class="ico ico-add"></span>
					收藏全部
				</span>
				<span class="line"></span>
				<span class="clear" @click="clearList">
					<span class="ico icn-del"></span>
					清除
				</span>
				<p class="lytit f-ff0 f-thide j-flag">{{track_queue?.name}}</p>
				<span class="close" @click="isList = false">关闭</span>
			</div>
		</div>
		<div class="listbd">
			<img class="imgbg j-flag" alt="" :src="`//music.163.com/api/img/blur/${track_queue[player_setting.index]?.al?.pic_str}`">
			<div class="msk"></div>
			<Scroll c_class="listbdc j-flag" bar_class="bline j-flag" :c_length="scrollLH" :barTO="(player_setting?.index)/listn*260 -30">
				<div class="nocnt" v-if="!track_queue?.length">
					<i class="ico ico-face"></i>
					你还没有添加任何歌曲
					<br>
					去首页
					<router-link to="/discover">
						<span class="f-tdu">发现音乐</span>
					</router-link>
					或在
					<router-link to="/my">
						<span class="f-tdu">我的音乐</span>
					</router-link>
					收听自己收藏的歌单
				</div>
				<ul class="f-cb" ref="listul" v-else>
					<foot-list-item v-for="(t,i) in track_queue" :key="i" :index="i"></foot-list-item>
				</ul>
			</Scroll>
			<div class="ask j-flag">
				<span class="ico ico-ask"></span>
			</div>
			<div class="msk2"></div>
			<Scroll c_class="listlyric j-flag" bar_class="bline bline-1 j-flag" sb_class="scrol-1 j-flag" :c_length="scrollRH" refName="lyricprent" :step="10" :c_heigth="219" ref="lyricScroll">
				<div class="lyrics" ref="lyric" v-if="lrc?.length">
					<template v-for="(litem,lindex) in lrc">
						<p v-if="litem" :key="lindex" :data-time="litem.time" :class="{'z-sel':(duration >= litem.time && (duration < lrc[lindex+1]?.time) || !lrc[lindex+1])}">{{litem.title}}</p>
					</template>
				</div>
				<no-list v-else>暂无歌词</no-list>
			</Scroll>
		</div>
	</div>

</template>

<script>
	import Scroll from 'views/footer/Scroll.vue'
	import FootListItem from 'views/footer/FootListItem.vue'
	import noList from 'views/common/noList.vue'
	import { mapState } from 'vuex'
	import { getSongLyric } from 'network/api.js'
	export default {
		name:'FootList',
		components:{
			FootListItem,
			Scroll,
			noList
			// 'Scroll': () => import('./Scroll.vue')
		},
		props:{
			duration:{
				type:Number
			}
		},
		data(){
			return {
				lrc:[],
				scrollLH:0,
				scrollRH:0,
				lyricT:0,
				lyricIndex:0,
				isList:false
			}
		},
		computed:{
			...mapState(['player_setting','track_queue']),
			sid(){
				return this.track_queue ? this.track_queue[this.player_setting?.index]?.id : null
			},
			listn(){
				return this.track_queue?.length || 0
			}
		},
		watch:{
			sid(){
				if(this.sid){
					this.getLyric()
				}
			},
			isList(){
				// console.log(val)
				// console.log(this.$refs)
				// 此元素为原声dom，不能自动响应
				this.$nextTick(()=>{
					// console.log(this.$refs)
					this.scrollLH = this.$refs?.listul?.offsetHeight
				})
				this.$nextTick(()=>{
					// console.log(this.$refs)
					this.scrollRH = this.$refs?.lyric?.offsetHeight
				})
			},
			duration(){
				if(document.querySelector('.lyrics .z-sel')){
					this.lyricT = document.querySelector('.lyrics .z-sel').offsetTop;
				}
			},
			lyricT(val){
				if(val > 100){
					this.$refs.lyricScroll.barT = (val-50) * 260 / this.scrollRH
				}
			}
		},
		methods:{
			getLyric(){
				console.log(this.sid)
				getSongLyric({id:this.sid}).then(res=>{
					// console.log(res.data.lrc.lyric)
					if(res.data.lrc){
						this.lrc = res.data.lrc.lyric.split('\n').map(item=>{
							let arr = item.replace('[','').split(']');
							if(arr.length == 2 && /^\d+:\d+.\d+$/.test(arr[0])){
								return {
									time:this.trunSecond(arr[0]),
									title:arr[1]
								}
							}else{
								return null
							}
						}).filter(item=>item);
						// console.log(this.lrc)
						this.lrc.sort((f,a)=>f.time-a.time)
						this.$nextTick(()=>{
							// console.log(this.$refs?.lyric?.offsetHeight)
							this.scrollRH = this.$refs?.lyric?.offsetHeight;
						})
					}else{
						this.lrc = null
					}
					// console.log(this.lrc)
				})
			},
			trunSecond(time){
				let arr = time.split(':')
				return Number(arr[0])*60 + Number(arr[1])
			},
			clearList(){
				this.player_setting.index = null;
				this.$store.commit('update_PS',this.player_setting);
				this.$store.commit('update_TQ',[])
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// console.log(this.$refs)
				this.scrollLH = this.$refs?.listul?.offsetHeight
			})
			console.log(this.sid)
			if(this.sid){
				this.getLyric()
			}
		}
	}
</script>

<style>
	.m-playbar .list{
		position: absolute;
		left: 50%;
		bottom: 47px;
		width: 986px;
		height: 301px;
		margin-left: -493px;
	}
	.m-playbar .listhd{
		background-position: 0 0;
		height: 41px;
	}
	.m-playbar .imgbg{
		top: -360px;
		position: absolute;
		left: 2px;
		z-index: 1;
		width: 980px;
		height: auto;
		opacity: .2;
	}
	.m-playbar .listhd,.m-playbar .listbd{
		padding: 0 5px
	}
	.m-playbar .listhdc{
		position: relative;
		height: 40px;
	}
	.m-playbar .listhdc h4{
		position: absolute;
		left: 25px;
		top: 0;
		height: 39px;
		line-height: 39px;
		font-size: 14px;
		color: #e2e2e2;
	}
	.m-playbar .listhdc span{
		color: #ccc;
	}
	.m-playbar .listhdc .clear, .m-playbar .listhdc .addall{
		position: absolute;
		left: 490px;
		top: 12px;
		height: 15px;
		line-height: 15px;
		cursor: pointer;
	}
	.m-playbar .listhdc .addall{
		left: 398px;
	}
	.m-playbar .ico{
		height: 16px;
	}
	.m-playbar .listhdc .ico{
		float: left;
		margin: 1px 6px 0 0;
	}
	.m-playbar .listhdc .line{
		position: absolute;
		top: 13px;
		left: 477px;
		height: 15px;
		border-left: 1px solid #000;
		border-right: 1px solid #2c2c2c;
	}
	.m-playbar .ico-del{
		width: 13px;
		background-position: -51px 0;
	}
	.m-playbar .ico-dl{
		width: 14px;
		background-position: -57px -50px;
	}
	.m-playbar .listhdc .lytit{
		position: absolute;
		left: 595px;
		top: 0;
		width: 346px;
		text-align: center;
		height: 39px;
		line-height: 39px;
		color: #fff;
		font-size: 14px;
	}
	.m-playbar .listhdc .close{
		position: absolute;
		top: 6px;
		right: 8px;
		width: 30px;
		height: 30px;
		overflow: hidden;
		text-indent: -999px;
		cursor: pointer;
		background-position: -195px 9px;
	}
	.m-playbar .list .nocnt{
		padding-top: 85px;
		text-align: center;
		line-height: 43px;
	}
	.m-playbar .list .nocnt, .m-playbar .list .nocnt a{
		color: #aaa;
	}
	.m-playbar .list .nocnt .ico{
		float: none;
		display: inline-block;
		position: relative;
		top: -4px;
		width: 36px;
		height: 29px;
		margin-right: 3px;
		background-position: -138px 0;
		vertical-align: middle;
	}
	.m-playbar .msk{
		position: absolute;
		left: 2px;
		top: 0;
		z-index: 2;
		width: 558px;
		height: 260px;
		background: #121212;
		opacity: .5;
	}
	.m-playbar .listbd{
		position: absolute;
		left: 0;
		top: 41px;
		width: 976px;
		height: 260px;
		overflow: hidden;
		background-position: -1014px 0;
		background-repeat: repeat-y;
	}
	.m-playbar .listbdc{
		position: absolute;
		left: 2px;
		top: 0;
		z-index: 4;
		height: 260px;
		width: 553px;
		overflow: hidden;
	}
	.m-playbar .list ul{
		color: #ccc;
		overflow: hidden;
	}
	.m-playbar .listbd .bline{
		position: absolute;
		left: 555px;
		top: -1px;
		z-index: 2;
		width: 6px;
		height: 260px;
		background: #000;
		opacity: .5;
	}
	.m-playbar .listbd .scrol{
		position: absolute;
		left: 0;
		top: 0px;
		width: 4px;
		border-radius: 5px;
		height: 100px;
		cursor: pointer;
		background: #868686;
		border: 1px solid #a6a6a6;
		opacity: .8;
	}
	.m-playbar .ask{
		position: absolute;
		right: 25px;
		top: 12px;
		cursor: pointer;
		z-index: 5;
	}
	.m-playbar .ico-ask{
		display: inline-block;
		width: 21px;
		height: 21px;
		background-position: 0 -50px;
		text-indent: 0;
	}
	.m-playbar .msk2{
		position: absolute;
		left: 560px;
		top: 0;
		z-index: 3;
		width: 420px;
		height: 250px;
		background: #121212;
		opacity: .01;
	}
	.m-playbar .listlyric{
		position: absolute;
		right: 40px;
		top: 0;
		z-index: 4;
		margin: 21px 0 20px 0;
		height: 219px;
		width: 354px;
		overflow: hidden;
	}
	.m-playbar .lyrics{
		overflow: hidden;
	}
	.m-playbar .listlyric p{
		color: #989898;
		word-wrap: break-word;
		text-align: center;
		line-height: 32px;
		height: auto !important;
		min-height: 32px;
		transition: color 0.7s linear;
	}
	.m-playbar .listbd .bline-1{
		left: auto;
		right: 2px;
	}
	.m-playbar .listhd .scrol-1{
		left: auto;
		right: 0;
	}
	.m-playbar .playicn{
	display: none;
	margin-top: 8px;
	width: 10px;
	height: 13px;
	background-position: -182px 0;
}
.m-playbar .listlyric p.z-sel{
	color: #fff;
	font-size: 14px;
	transition: color 0.7 linear;
}
	
</style>
