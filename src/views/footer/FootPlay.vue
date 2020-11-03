<template>
	<div class="g-btmbar" >
		<audio :src="musicUrl" ref="audio" @ended="nextMusicByWay" @timeupdate="setProgess" @loadedmetadata="setDuration"></audio>
		<div class="m-playbar" :class="lock?'m-playbar-lock' : 'm-playbar-unlock'" :style="{top: islock || lock? '-53px' : '-7px'}" @mouseenter="islock = true" @mouseleave="islock = false">
			<div class="updn">
				<div class="left f-f1 bg-playbar">
					<span class="bg-playbar btn" @click="setLock"></span>
				</div>
				<div class="right f-f1 bg-playbar"></div>
			</div>
			<div class="bar-bg bg-playbar"></div>
			<div class="bar-hand" title="展开播放条"></div>
			<div class="bar-wrap" style="margin-left: -498.5px;">
				<div class="bar-btns f-left">
					<span class="prv bg-playbar" @click="preMusic">上一首</span>
					<span class="ply bg-playbar" :class="{pas:isPlay}" @click="playMusic">播放/暂停</span>
					<span class="next bg-playbar" @click="nextMusic">下一首</span>
				</div>
				<div class="song-img f-left">
					<img v-if="nowMusic" :src="nowMusic.al.picUrl+'?param=34y34'" alt="">
					<a href=""></a>
				</div>
				<div class="play f-left">
					<div class="bar-song-info">
						<a href="" v-if="nowMusic" class="f-thide name f-left fc1">{{nowMusic.name}}</a>
						<span class="art f-thide f-left" v-if="nowMusic">
							<a href="" v-for="(ar,index) in nowMusic.ar" :key="index">{{ar.name}}</a>
						</span>
						<a href="" class="art-src bg-playbar"></a>
					</div>
					<div class="p-bar">
						<div class="barbg" @click.prevent="drogClickMove">
							<div class="rdy"></div>
							<div class="cur" :style="{width:playProgess+'%'}">
								<span class="f-btn f-alpha bg-iconall" @mousedown="drogDown" @click.stop>
									<i :style="{display: isLoad? 'block':'none'}"></i>
								</span>
							</div>
						</div>
						<span class="ply-time">
							<em>{{currentStr}}</em>
							/{{duration}}
						</span>
					</div>
				</div>
				<div class="operator f-left">
					<span class="icn icn-coll bg-playbar">收藏</span>
					<span class="icn icn-share bg-playbar">分享</span>
				</div>
				<div class="ctrl-plyway f-left bg-playbar">
					<volume-bar :isShow="isVol"></volume-bar>
					<span class="icn icn-vol bg-playbar" @click="isVol = !isVol"></span>
					<span class="icn bg-playbar" :class="playicn" :title="playway" @click="setMode"></span>
					<span class="add f-pr" @click="showPlaylist">
						<span class="tip bg-playbar" style="display: none;">已添加到播放列表</span>
						<span class="icn icn-list bg-playbar">{{playList.length}}</span>
					</span>
					<div class="tip tip1 bg-playbar" :style="{display: istip ? 'block' : 'none'}">{{playway}}</div>
				</div>
			</div>
			<foot-list :duration="curTime" ref='playlist'></foot-list>
		</div>
	</div>

</template>

<script>
	import {getSongUrl} from 'network/api.js'
	import { mapState } from 'vuex'
	import FootList from 'views/footer/FootList.vue'
	import volumeBar from 'views/footer/volumeBar.vue'
	export default {
		name:'FootPlay',
		components:{
			FootList,
			volumeBar
		},
		data(){
			return {
				musicUrl:'',
				isPlay:false,
				playProgess:0,
				currentStr:'00:00',
				duration:'00:00',
				isLoad:true,
				isMove:false,
				curTime:0,
				startX:0,
				startH:0,
				isVol:false,
				istip:false,
				islock:false
			}
		},
		computed:{
			...mapState(['player_setting','track_queue']),
			nowMusic(){
				return this.playList[this.musicIndex]
			},
			playList(){
				return this.track_queue || []
			},
			musicIndex(){
				return this.player_setting?.index ?? null
			},
			volume(){
				return this.player_setting?.volume
			},
			mode(){
				return this.player_setting?.mode
			},
			playicn(){
				return this.mode == 2 ? 'icn-one' : (this.mode == 4 ? 'icn-loop' : this.mode == 5 ? 'icn-shuffle' : '') 
			},
			playway(){
				return this.mode == 2 ? '单曲' : (this.mode == 4 ? '循环' : this.mode == 5 ? '随机' : '')
			},
			lock(){
				return this.player_setting?.lock
			}
		},
		watch: {
			musicUrl(){
				// console.log(this.$refs.audio);
				if(this.isPlay){
					this.$refs.audio.play();
				}
			},
			musicIndex(newIndex){
				this.player_setting.index = newIndex;
				this.$store.commit('update_PS',this.player_setting)
				this.playProgess = 0;
				if(this.playList.length > 0){
					this.getSongurl();
					this.isPlay = true;
				}
			},
			playList(){
				this.getSongurl();
			},
			volume(val){
				this.$refs.audio.volume = val;
			},
			mode(){
				// console.log(this.playicn)
				// console.log(this.playway)
				setTimeout(()=>{
					this.istip = false;
				},1000)
			}
		},
		methods:{
			drogClickMove(e){
				this.updateProgess(e.offsetX / 493)
			},
			drogDown(e){
				this.startX = e.clientX;
				this.startH = Number(this.playProgess) / 100;
				window.addEventListener('mousemove',this.drogMove);
				window.addEventListener('mouseup',this.drogLeave);
				// console.log(e);
			},
			drogLeave(){
				window.removeEventListener('mousemove',this.drogMove);
				window.removeEventListener('mouseup',this.drogLeave);
			},
			drogMove(e){
				// console.log(this.playProgess)
				let tmpW = this.startH + (e.clientX - this.startX)  / 493;
				tmpW = tmpW > 0 ? (tmpW > 1 ? 1 : tmpW) : 0;
				// console.log(tmpW)
				this.updateProgess(tmpW);
				e.preventDefault();
			},
			updateProgess(precentW){
				// console.log(precentW)
				this.$refs.audio.currentTime = precentW * this.$refs.audio.duration;
				this.curTime = this.$refs.audio.currentTime;
			},
			// 音乐加载时，设置歌曲时间
			setDuration(){
				this.isLoad = false;
				// console.log(this.$refs.audio)
				this.$refs.audio.volume = this.player_setting.volume
				this.duration = this.trunMTime(this.$refs.audio.duration);
			},
			trunMTime(second){
				let minute = second/60>=10 ? Math.floor(second/60) : '0' + Math.floor(second/60);
				let seconds = second%60>=10 ? Math.floor(second%60) : '0' + Math.floor(second%60);
				return minute + ':' + seconds
			},
			nextMusic(){
				console.log('下一首')
				this.isLoad = true;
				this.player_setting.index ++;
				if(this.musicIndex >= this.playList.length){
					this.player_setting.index =0;
				}
			},
			// 一首歌结束后的播放下一首
			nextMusicByWay(){
				this.isLoad = true;
				if(this.mode == 4){
					this.nextMusic()
				}else if(this.mode == 2){
					this.$refs.audio.loop = true
				}else{
					let random = Math.floor(Math.random()*this.track_queue.length);
					this.musicIndex = random;
				}
			},
			preMusic(){
				console.log('上一首');
				this.isLoad = true;
				this.player_setting.index --;
				if(this.musicIndex < 0){
					this.player_setting.index = this.playList.length -1
				}
			},
			playMusic(){
				// 播放暂停
				if(this.isLoad){
					return
				}
				this.isPlay = !this.isPlay;
				if(!this.isPlay){
					this.$refs.audio.pause();
				}else if(this.musicIndex == null){
					this.musicIndex = 0;
				}else{
					this.$refs.audio.play()
				}
			},
			// 设置播放进度条
			setProgess(){
				// console.log('自动更新')
				this.curTime = this.$refs.audio.currentTime;
				// 音乐未加载时，duratition为0，会导致分母为0，结果为NaN
				this.playProgess = Number((this.$refs.audio.currentTime / this.$refs.audio.duration * 100).toFixed(2)) || 0
				this.currentStr = this.trunMTime(this.$refs.audio.currentTime);
			},
			showPlaylist(){
				// console.log(e)
				this.$refs.playlist.isList = !this?.$refs?.playlist?.isList;
				// console.log()
				// document.querySelector('#app').addEventListener('click',this.cancelList);
			},
			cancelList(){
				// console.log('点击')
				this.$refs.playlist.isList = false;
				// document.querySelector('#app').removeEventListener('click',this.cancelList);
			},
			setMode(){
				let modes = [2,4,5];
				let modeIndex = modes.indexOf(this.mode) +1;
				if(modeIndex >= modes.length){
					modeIndex = 0
				}
				this.mode = modes[modeIndex];
				this.istip = true;
				this.player_setting.mode = modes[modeIndex];
				this.$store.commit('update_PS',this.player_setting);
			},
			setLock(){
				this.player_setting.lock = !this.lock
				this.$store.commit('update_PS',this.player_setting);
			},
			getSongurl(){
				if(this.playList.length > 0){
					this.player_setting.index = this.player_setting.index || 0
					// console.log(this.musicIndex)
					getSongUrl({id:this.playList[this.musicIndex].id}).then(res=>{
						this.musicUrl  = res.data.data[0].url
					})
				}
			}
		},
		created(){
			if(this.playList.length > 0){
				// console.log(this.musicIndex)
				this.getSongurl()
			}
		}
	}
</script>

<style>
	.p-bar .barbg,.p-bar .cur,.p-bar .rdy{
		background: url(~assets/img/statbar.png) no-repeat 0 9999px;
	}
	.g-btmbar{
		position: fixed;
		zoom: 1;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0;
		width: 100%;
		z-index: 1002;
	}
	.m-playbar{
		position: absolute;
		zoom: 1;
		left: 0;
		width: 100%;
		height: 53px;
		margin: 0 auto;
		transition: top 0.3s linear; 
	}
	.m-playbar .updn{
		position: relative;
		z-index: 11;
	}
	.m-playbar .updn .left{
		position: absolute;
		top: -14px;
		right: 15px;
		width: 52px;
		height: 67px;
		background-position: 0 -380px;
	}
	.m-playbar .updn .btn{
		display: block;
		width: 18px;
		height: 18px;
		margin: 6px 0 0 17px;
	}
	.m-playbar-lock .updn .btn{
		background-position: -100px -380px;
	}
	.m-playbar-lock .updn .btn:hover{
		background-position: -100px -400px;
	}
	.m-playbar-unlock .updn .btn{
		background-position: -80px -380px;
	}
	.m-playbar-unlock .updn .btn:hover{
		background-position: -80px -400px;
	}
	.m-playbar .updn .right{
		position: absolute;
		top: -1px;
		right: 0;
		width: 15px;
		height: 54px;
		background-position: -52px -393px;
		pointer-events: none;
	}
	.m-playbar .bar-bg{
		height: 53px;
		zoom: 1;
		margin-right: 67px;
		background-position: 0 0;
		background-repeat: repeat-x;
	}
	.m-playbar .bar-hand{
		position: absolute;
		top: -10px;
		width: 100%;
		height: 20px;
		cursor: pointer;
	}
	.m-playbar .bar-wrap{
		position: absolute;
		left: 50%;
		top: 6px;
		z-index: 15;
		width: 980px;
		height: 47px;
		margin: 0 auto;
	}
	.m-playbar .bar-btns{
		width: 137px;
		padding: 6px 0 0 0;
	}
	.m-playbar .bar-btns span{
		display: block;
		float: left;
		width: 28px;
		height: 28px;
		margin-right: 8px;
		margin-top: 5px;
		text-indent: -9999px;
		cursor: pointer;
	}
	.m-playbar .bar-btns .prv{
		background-position: 0 -130px;
	}
	.m-playbar .bar-btns .next{
		background-position: -80px -130px;
	}
	.m-playbar .bar-btns .ply{
		width: 36px;
		height: 36px;
		margin-top: 0;
		background-position: 0 -204px;
	}
	.m-playbar .bar-btns .ply:hover{
		background-position: -40px -204px;
	}
	.m-playbar .bar-btns .pas{
		background-position: 0px -165px;
	}
	.m-playbar .bar-btns .pas:hover{
		background-position: -40px -165px;
	}
	.m-playbar .bar-btns .prv:hover{
		background-position: -30px -130px;
	}
	.m-playbar .bar-btns .next:hover{
		background-position: -110px -130px;
	}
	.m-playbar .song-img,.m-playbar .song-img img{
			width: 34px;
			height: 34px;
		}
	.m-playbar .song-img{
		position: relative;
		margin: 6px 15px 0 0;
	}
	.m-playbar .song-img a{
		position: absolute;
		top: 0px;
		left: 0px;
		display: block;
		width: 34px;
		height: 34px;
		background-position: 0 -80px;
	}
	.m-playbar .play{
		position: relative;
		width: 608px;
	}
	.m-playbar .bar-song-info{
		height: 28px;
		overflow: hidden;
		color: #e8e8e8;
		text-shadow: 0 1px 0 #171717;
		line-height: 28px;
	}
	.m-playbar .bar-song-info .name{
		max-width: 300px; 
	}
	.m-playbar .bar-song-info .fc1{
		color: #e8e8e8;
	}
	.m-playbar .bar-song-info .art{
		max-width: 220px;
		margin-left: 15px;
		color: #9b9b9b;
	}
	.m-playbar .bar-song-info .art a{
		color: #9b9b9b;
	}
	.m-playbar .bar-song-info .art-src{
		float: left;
		width: 14px;
		height: 15px;
		margin: 7px 0 0 13px;
		background-position: -110px -103px;
	}
	.p-bar,.p-bar .barbg{
		width: 493px;
	}
	.p-bar{
		position: relative;
	}
	.p-bar .barbg,.p-bar .cur,.p-bar .rdy{
		height: 9px;
		background-position: right 0; 
	}
	.p-bar .rdy{
		background-position: right -30px;
	}
	.p-bar .cur{
		position: absolute;
		top: 0;
		left: 0;
		background-position: left -66px; 
	}
	.p-bar .f-btn{
		position: absolute;
		top: -7px;
		right: -13px;
		width: 22px;
		height: 24px;
		margin-left: -11px;
		background-position: 0 -250px;
	}
	.p-bar .f-btn i{
		/* visibility: hidden; */
		position: absolute;
		left: 5px;
		top: 5px;
		width: 12px;
		height: 12px;
		background: url(~assets/img/loading.gif);
	}
	.p-bar .ply-time{
		position: absolute;
		top: -3px;
		right: -84px;
		color: #797979;
		text-shadow: 0 1px 0 #121212;
	}
	.p-bar .ply-time em{
		color: #a1a1a1;
	}
	.m-playbar .operator{
		width: 60px;
	}
	.m-playbar .icn{
		float: left;
		width: 25px;
		height: 25px;
		margin: 11px 2px 0 0;
		text-indent: -9999px;
	}
	.m-playbar .icn-coll{
		background-position: -88px -163px;
	}
	.m-playbar .icn-coll:hover{
		background-position: -88px -189px;
	}
	.m-playbar .icn-share{
		background-position: -114px -163px;
	}
	.m-playbar .icn-share:hover{
		background-position: -114px -189px;
	}
	.m-playbar .ctrl-plyway{
		position: relative;
		z-index: 10;
		width: 113px;
		padding-left: 13px;
		background-position: -147px -238px;
	}
	.ctrl-vol{
		position: absolute;
		top: -113px;
		left: 9px;
		clear: both;
		width: 32px;
		height: 113px;
	}
	.m-playbar .icn-vol{
		background-position: -2px -248px;
	}
	.m-playbar .icn-vol:hover{
		background-position: -31px -248px;
	}
	.m-playbar .icn-loop{
		background-position: -3px -344px;
	}
	.m-playbar .icn-one{
		background-position: -66px -344px;
	}
	.m-playbar .icn-shuffle{
		background-position: -66px -248px;
	}
	.m-playbar .icn-loop:hover{
		background-position: -33px -344px;
	}
	.m-playbar .icn-one:hover{
		background-position: -93px -344px;
	}
	.m-playbar .icn-shuffle:hover{
		background-position: -93px -248px;
	}
	.m-playbar .add{
		float: left;
		width: 59px;
		height: 36px;
		cursor: pointer;
	}
	.f-pr{
		position: relative;
		zoom: 1;
	}
	.m-playbar .tip{
		position: absolute;
		top: -51px;
		left: -65px;
		clear: both;
		width: 152px;
		height: 49px;
		background-position: 0 -287px;
		text-align: center;
		color: #fff;
		line-height: 37px;
	}
	.m-playbar .icn-list{
		display: block;
		float: none;
		width: 38px;
		padding-left: 21px;
		background-position: -42px -68px;
		line-height: 27px;
		text-align: center;
		color: #666;
		text-shadow: 0 1px 0 #080707;
		text-indent: 0;
	}
	.m-playbar .icn-list:hover{
		background-position: -42px -98px;
		text-decoration: none;
	}
	.m-playbar .tip1{
		top: -35px;
		left: 12px;
		width: 81px;
		height: 39px;
		line-height: 34px;
		background-position: 0 -457px;
	}
		
</style>
