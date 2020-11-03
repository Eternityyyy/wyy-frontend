<template>
	<div class="g-bd4 user-level">
		<div class="n-mylv">
			<div class="n-lv">
				<div class="h3">
					当前等级：
					<span class="n-level-big">
						<i></i>
						{{userlevel.level}}
					</span>
					<span class="n-level-tips">等级数据每天下午2点更新</span>
				</div>
				<div class="sub">
					<div class="subbg">
						<div :style="{width:width + 'px'}">
							<span></span>
						</div>
					</div>
					<div class="subnum">
						<div class="divison">
							<template v-for="n in 11">
								<span :key="n" v-if="n < 10"></span>
							</template>
						</div>
						<div class="divnum">
							<ul>
								<li v-for="n in 11" :key="n" :class="{'z-ov':n -1 < userlevel.level,'z-on':userlevel.level == n-1}">{{n-1}}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="n-pow">
				<div class="h3">当前等级特权：</div>
				<div class="telist">
					<ul class="j-flag">
						<li v-for="(item,index) in userlevel?.info?.split('$')" :key="index">{{item}}</li>
					</ul>
				</div>
				<div class="aboutmore">
					<router-link to="/user/home">了解等级特权></router-link>
				</div>
			</div>
			<div class="n-nextlv">
				<div class="h4">
					距离下一个等级：
					<span class="n-level">
						<i></i>
						{{userlevel.level +1}}
					</span>
					<span class="n-iconpoint">
						<span class="icon u-icn2 u-icn2-5 j-flag"></span>
						<div class="tip">
							<p>听歌量是指累计播放的歌曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。</p>
							<p>登录天数是指使用云音乐的天数，在多端同时使用不会被重复计算。</p>
							<i class="t"></i>
							<i class="b"></i>
						</div>
					</span>
				</div>
				<div class="uitl">
					<span class="tit">听歌：</span>
					<div class="bar">
						<div class="barbox">
							<span :style="{width: (userlevel.nowPlayCount/userlevel.nextPlayCount)*100 + '%'}"></span>
						</div>
					</div>
					还需听歌{{userlevel.nextPlayCount - userlevel.nowPlayCount}}首
				</div>
				<div class="uitl">
					<span class="tit">登录：</span>
					<div class="bar">
						<div class="barbox">
							<span :style="{width: (userlevel.nowLoginCount/userlevel.nextLoginCount) * 100 + '%'}"></span>
						</div>
					</div>
					还需登录{{userlevel.nextLoginCount - userlevel.nowLoginCount}}天
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import {
		getUserLevel
	} from 'network/api.js'
	export default {
		name: "userLevel",
		data() {
			return {
				userlevel: {},
				width: 0,
			}
		},
		mounted() {
			getUserLevel().then(res => {
				// console.log(res.data.data)
				this.userlevel = res.data.data
				this.width = 25 + 81 * this.userlevel.level
			})
		}
	}
</script>

<style>
	@-webkit-keyframes subbar {
		0% {width: 0;}
		100% {width: 100%;}
	}
	@keyframes subbar {
		0% {width: 0;}
		100% {width: 100%;}
	}
	@-webkit-keyframes show {
		0% {color: #c4c6cc;}
		100% {olor: #ed5757;}
	}
	@keyframes show {
		0% {color: #c4c6cc;}
		100% {color: #ed5757;}
	}
	@-webkit-keyframes show1 {
		0% {
			color: #c4c6cc;
			background-position: 999px 999px;
		}
		50% {
			color: #c4c6cc;
			background-position: 0 -50px;
		}
		100% {color: #fff;}
	}
	@keyframes show1 {
		0% {
			color: #c4c6cc;
			background-position: 9999px 9999px;
		}
		50% {
			color: #c4c6cc;
			background-position: 0 -50px;
		}
		100% {color: #fff;}
	}
	.user-level {
		background: #fff;
	}
	.n-mylv {
		width: 100%;
		padding: 70px 68px;
	}
	.n-lv {
		margin-bottom: 52px;
	}
	.n-mylv .h3 {
		position: relative;
		z-index: 1;
		height: 32px;
		line-height: 32px;
		color: #333;
		font-size: 22px;
		margin-bottom: 4px;
		font-family: "microsoft yahei";
	}
	.n-level-big {
		position: relative;
		z-index: 1;
		height: 32px;
		line-height: 32px;
		margin-left: 30px;
		font-family: arial;
		font-size: 24px;
		font-weight: 700;
		color: #e03a24;
		font-style: italic;
	}
	.n-level-big i {
		position: absolute;
		left: -30px;
		top: 0;
		z-index: 1;
		width: 30px;
		height: 30px;
		background-position: left 5px;
	}
	.n-mylv .h3 .n-level-tips {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 101px;
		font-size: 12px;
		color: #999;
		font-family: Arial, Helvetica, sans-serif;
	}
	.n-lv .sub {
		width: 100%;
		position: relative;
		z-index: 1;
		padding-top: 31px;
		height: 34px;
		overflow: hidden;
	}
	.n-lv .sub .subbg {
		width: 835px;
		height: 10px;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		border-radius: 10px;
		background: #dcdfe6;
	}
	.n-lv .sub .subbg span {
		background: url(~assets/img/mylevelbar.png) 0 0 repeat-y;
		width: 100%;
		height: 10px;
		display: block;
		border-radius: 10px;
		animation: subbar 2s;
	}
	.n-lv .sub .subnum {
		width: 100%;
		height: 40px;
		left: 0;
		bottom: 0;
		position: absolute;
		z-index: 2;
	}
	.n-lv .divison {
		position: absolute;
		left: 13px;
		bottom: 0;
		width: 100%;
		height: 10px;
	}
	.n-lv .divison span {
		float: left;
		display: inline;
		width: 1px;
		background: #fff;
		height: 10px;
		margin-left: 80px;
	}
	.n-lv .divnum {
		position: absolute;
		left: 0;
		top: 0;
		font-family: "microsoft yahei";
		font-size: 18px;
		color: #c4c6cc;
		width: 980px;
	}
	.n-lv .divnum li {
		float: left;
		width: 25px;
		height: 28px;
		line-height: 24px;
		display: inline;
		margin-right: 56px;
		text-align: center;
	}
	.n-lv .divnum li.z-ov {
		color: #ed5757;
		animation: show 3s;
	}
	.n-lv .divnum li.z-on {
		color: #fff;
		background-position: 0 -50px;
		animation: show1 2s;
	}
	.n-pow {
		border-bottom: solid 1px #ddd;
		margin-bottom: 36px;
	}
	.n-mylv .h3 {
		position: relative;
		z-index: 1;
		height: 32px;
		line-height: 32px;
		color: #333;
		font-size: 22px;
		margin-bottom: 4px;
		font-family: "microsoft yahei";
	}
	.n-pow .telist {
		padding-bottom: 10px;
	}
	.n-pow .telist li {
		height: 30px;
		line-height: 30px;
		color: #666;
		padding-left: 13px;
		background-position: -17px -82px;
		font-size: 14px;
	}
	.n-pow .aboutmore {
		color: #0e73ba;
		margin-top: 28px;
		padding-left: 4px;
		margin-bottom: 26px;
		height: 20px;
		line-height: 20px;
	}
	.n-pow .aboutmore a {
		color: #0e73ba;
	}
	.n-nextlv .h4 {
		height: 22px;
		line-height: 22px;
		font-size: 14px;
		color: #333;
		margin-bottom: 20px;
	}
	.n-level {
		position: relative;
		margin-left: 25px;
		font-family: arial;
		font-size: 18px;
		font-weight: 700;
		color: #e03a24;
		font-style: italic;
	}
	.n-level i {
		position: absolute;
		left: -25px;
		top: 0;
		width: 25px;
		height: 22px;
		background-position: 0 -25px;
	}
	.n-iconpoint {
		position: relative;
		margin-left: 10px;
		left: -5px;
		top: -2px;
		z-index: 2;
	}
	.n-iconpoint .icon {
		display: inline-block;
	}
	.n-iconpoint div.tip i.t {
		position: absolute;
		width: 327px;
		height: 16px;
		background: url(~assets/img/top_t.png) 0 0 no-repeat;
		top: -16px;
		left: 0;
	}
	.n-iconpoint div.tip i.b {
		position: absolute;
		width: 327px;
		height: 12px;
		background: url(~assets/img/top_b.png) 0 0 no-repeat;
		left: 0;
		bottom: -12px;
	}
	.n-iconpoint:hover .tip {
		display: block;
	}
	.n-nextlv .uitl {
		font-size: 12px;
		color: #999;
		height: 32px;
		line-height: 32px;
	}
	.n-nextlv .uitl .tit {
		line-height: 32px;
		color: #666;
	}
	.n-nextlv .bar {
		display: inline-block;
		width: 160px;
		height: 12px;
		margin-right: 6px;
		position: relative;
	}
	.n-nextlv .barbox {
		position: absolute;
		top: 7px;
		left: 0;
		z-index: 1;
		width: 160px;
		height: 4px;
		line-height: 0;
		background: #dcdfe6;
		border-radius: 4px;
	}
	.n-nextlv .barbox span {
		width: 100%;
		height: 100%;
		background: #f75757;
		border-radius: 4px;
		display: block;
	}
</style>
