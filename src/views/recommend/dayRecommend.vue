<template>
	<div class="day-rec g-bd4">
		<div class="day-rec-left">
			<div class="g-wrap6">
				<div class="n-daily">
					<div class="bg j-flag">
						<div class="cal u-date u-date-2 f-alpha">
							<calendar></calendar>
							<span class="mask f-alpha"></span>
						</div>
					</div>
					<div class="btnwrap f-cb j-flag">
						<div class="btn f-left">
							<add-play-list :playlist="list" className="u-btn2 u-btn2-2 u-btni-addply f-left">
								<i>
									<em class="ply"></em>
									播放全部
								</i>
							</add-play-list>
							<add-play-list :playlist="list" :isAdd="true" class="u-btni u-btni-add"></add-play-list>
							<collect-btn class="u-btni u-btni-fav f-left">
								<i>收藏全部</i>
							</collect-btn>
						</div>
					</div>
				</div>
				<div class="n-songtb n-songtb-1 j-flag">
					<div class="u-title u-title-1 f-cb">
						<h3>
							<span class="f-ff2">歌曲列表</span>
						</h3>
						<span class="sub s-fc3">
							<span class="j-flag">{{list?.length}}</span>
							首歌
						</span>
					</div>
					<div class="j-flag">
						<detail-list :tracks="list"></detail-list>
					</div>
				</div>
			</div>
		</div>
		<div class="day-rec-right">
			<div class="g-wrap7">
				<div class="n-cmdsd">
					<div class="hd f-ff2">
						<span class="icn u-icn2 u-icn2-1"></span>
						个性化推荐如何工作
					</div>
					<p class="s-fc3">它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。</p>
					<p class="s-fc3">他通过你每一次操作来记录你的口味</p>
					<ul class="type s-fc4 j-flag">
						<li>
							<span class="icn u-icn2 u-icn2-2"></span>
							你播放了
							<strong class="s-fc6">{{userProfile?.profile?.playlistCount}}</strong>
							首音乐
						</li>
						<li>
							<span class="icn u-icn2 u-icn2-3"></span>
							你喜欢了
							<strong class="s-fc6">{{userProfile?.profile?.sCount}}</strong>
							首音乐
						</li>
						<li>
							<span class="icn u-icn2 u-icn2-4"></span>
							你收藏了
							<strong class="s-fc6">{{userProfile?.profile?.sCount}}</strong>
							首音乐
						</li>
					</ul>
					<p class="s-fc3">你提供给云音乐的信息越多，它就越了解你的音乐喜好。</p>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { addPlayList,CollectBtn } from 'views/common/btns/index.js'
	import calendar from 'views/common/calendar.vue'
	import detailList from 'views/detail/detailList.vue'
	import {mapState} from 'vuex'
	import { getDayRe } from 'network/api.js'
	export default {
		name:'dayRecommend',
		components:{
			calendar,
			addPlayList,
			CollectBtn,
			detailList
		},
		data(){
			return {
				list:[],
			}
		},
		computed:{
			...mapState(['userProfile'])
		},
		created(){
			getDayRe().then(res=>{
				// console.log(res.data.data.dailySongs)
				this.list = res.data.data.dailySongs
			});
		}
	}
</script>

<style>
	.day-rec{
		background: #fff;
	}
	.day-rec-left{
		width: 710px;
		border-right: 1px solid #dbdbdb;
	}
	.n-daily .bg{
		width: 640px;
		height: 179px;
		padding-top: 1px;
	}
	.n-daily .bg{
		background: url(~assets/img/recmd_daily.jpg) no-repeat;
	}
	.n-daily .cal{
		float: left;
		margin: 34px 0 0 54px;
	}
	.u-date-2 .head{
		height: 26px;
		line-height: 26px;
		font-size: 12px;
	}
	.u-date-2{
		font-size: 74px;
		line-height: 80px;
	}
	.u-date-2{
		width: 114px;
		height: 114px;
		background-position: 0 -270px;
	}
	.u-date-2 .bd{
		font-size: 74px;
		line-height: 80px;
	}
	.u-date-2 .mask{
		top: 26px;
		background-position: 0 -400px;
	}
	.n-daily .btnwrap{
		margin-top: 30px;
	}
	.n-daily .btnwrap .btn{
		margin-right: 8px;
	}
	.n-songtb-1{
		margin-top: 15px;
	}
	.n-cmdsd{
		margin-bottom: 30px;
	}
	.n-cmdsd .hd{
		height: 22px;
		padding: 5px 0 8px;
		border-bottom: 1px solid #ccc;
		line-height: 22px;
		font-size: 18px;
	}
	.n-cmdsd .hd .icn{
		float: left;
		margin-right: 6px;
	}
	.n-cmdsd p{
		margin: 1em 0;
		line-height: 19px;
	}
	.n-cmdsd .type{
		background: #f7f7f7;
		padding: 17px 0 17px 12px;
	}
	.n-cmdsd .type li{
		width: 188px;
		height: 40px;
		line-height: 20px;
	}
	.n-cmdsd .type li.last{
		height: 20px;
	}
	.n-cmdsd .type .icn{
		float: left;
		margin-right: 8px;
	}
</style>
