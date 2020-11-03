<template>
	<div class="hot-recommed person-re">
		<div class="v-hd2">
			<span class="tit f-ff2 f-tdn">个性化推荐</span>
		</div>
		<div class="hots-list">
			<div class="calendar">
				<router-link to="/discover/recommend/taste">
					<span class="date u-date f-alpha">
						<calendar></calendar>
						<span class="mask f-alpha" title="每日歌曲推荐"></span>
					</span>
				</router-link>
				<p class="dec">
					<router-link to="/discover/recommend/taste">
						<span class="tit s-fc0">每日歌曲推荐</span>
					</router-link>
				</p>
				<p class="idv s-fc4" title="根据你的口味生成,每天6:00更新">
					根据你的口味生成
					<br>
					每天6:00更新
				</p>
			</div>
			<play-li v-for="(ritem,rindex) in personlist.slice(0,3)" :imgUrl="ritem.picUrl" :key="rindex" :Playli="ritem"></play-li>
		</div>
	</div>

</template>

<script>
	import playLi from 'views/recommend/playLi.vue'
	import calendar from 'views/common/calendar.vue'
	import { getPersonRe } from 'network/api.js'
	export default {
		name:'personRe',
		components:{
			playLi,
			calendar
		},
		data(){
			return {
				personlist:[],
			}
		},
		created(){
			getPersonRe().then(res=>{
				// console.log(res.data.recommend)
				this.personlist = res.data.recommend
			})
		}
	}
</script>

<style>
	.u-date{
		position: relative;
		display: block;
		width: 140px;
		height: 140px;
		background-position: 0 0;
	}
	.u-date .head{
		display: block;
		height: 33px;
		line-height: 33px;
		color: #fed9d9;
		font-size: 14px;
		text-shadow: 0 -1px #962626;
		text-align: center;
	}
	.u-date .bd{
		display: block;
		line-height: 102px;
		text-align: center;
		font-size: 94px;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
		color: #202020;
	}
	.u-date .mask{
		position: absolute;
		top: 33px;
		left: 0;
		width: 142px;
		height: 107px;
		background-position: 0 -150px;
	}
	.calendar .dec{
		margin: 8px 0 3px;
		font-size: 14px;
	}
	.calendar .tit{
		display: inline-block;
		max-width: 100%;
		height: auto;
		max-height: 36px;
		overflow: hidden;
		vertical-align: middle;
	}
	.calendar .idv{
		margin-top: 3px;
		position: relative;
		z-index: 2;
	}
	
</style>
