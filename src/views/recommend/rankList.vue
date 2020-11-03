<template>
	<dl class="blk">
		<dt class="top">
			<div class="bill-cover">
				<img :src="rank_list.coverImgUrl+'?param=100y100'" alt="">
				<a href="#" class="bg-cover" :title="rank_list.name"></a>
			</div>
			<div class="bill-tit">
				<a href="#">
					<h3 class="f-thide">{{rank_list.name}}</h3>
				</a>
				<div class="bill-btn">
					<add-play-list className="bill-play bg-index" :playlist="rank_list.tracks"></add-play-list>
					<a href="#" class="bill-coll bg-index"></a>
				</div>
			</div>
		</dt>
		<dd class="rank-list-l">
			<ul>
				<li v-for="(listitem,index) in rank_list?.tracks?.slice(0,10)" :key="index" @mouseenter="displayBtns" @mouseleave="hideBtns">
					<span class="num" :class="{'num-top':index<3}">{{index+1}}</span>
					<router-link :to="`/discover/song?id=${listitem.id}`" ><span :title="listitem.name" class="rank-name f-thide a">{{listitem.name}}</span></router-link>
					<div class="oper">
						<play-btn class="s-bg s-bg-11" :songid="listitem.id"></play-btn>
						<add-music class="u-icn u-icn-81" :songid="listitem.id"></add-music>
						<collect-btn class="s-bg s-bg-12"></collect-btn>
					</div>
				</li>
			</ul>
			<div class="more">
				<a href="#">查看全部></a>
			</div>
		</dd>
	</dl>

</template>

<script>
	import addMusic from 'views/common/btns/addMusic.vue'
	import CollectBtn from 'views/common/btns/CollectBtn.vue'
	import playBtn from 'views/common/btns/playBtn.vue'
	import addPlayList from 'views/common/btns/addPlayList.vue'
	import {getListDetail} from 'network/api.js'
	export default {
		name:'rankList',
		components:{
			addMusic,
			CollectBtn,
			playBtn,
			addPlayList
		},
		props:{
			rankid:{
				type:Number
			}
		},
		data(){
			return {
				rank_list:[]
			}
		},
		methods:{
			displayBtns(e){
				e.target.className = 'z-hvr';
			},
			hideBtns(e){
				e.target.className = ''
			}
		},
		created(){
			getListDetail({id:this.rankid}).then(res=>{
				this.rank_list = res.data.playlist
			})
		}
	}
</script>

<style>
	.rank-list-l ul{
		height: 319px;
		margin-left: 50px;
		line-height: 32px;
	}
	.rank-list-l ul li{
		height: 32px;
	}
	.rank-list-l .num{
		float: left;
		position: relative;
		width: 35px;
		height: 32px;
		margin-left: -35px;
		text-align: center;
		color: #666;
		font-size: 16px;
	}
	.rank-list-l .num-top{
		color: #C10D0C;
	}
	.rank-list-l .rank-name{
		float: left;
		width: 170px;
		height: 32px;
	}
	.more{
		clear: both;
		height: 32px;
		margin-right: 32px;
		text-align: right;
		line-height: 32px;
	}
	.n-blist ul .oper{
		display: none;
		float: right;
		width: 82px;
		margin-top: 7px;
	}
	.n-blist ul li.z-hvr .a{
		text-decoration: underline;
		width: 96px;
	}
	.n-blist ul li.z-hvr .oper{
		display: block;
	}
	.n-blist ul li *{
		vertical-align: middle;
	}
	.n-blist ul .oper span{
		float: left;
		width: 17px;
		height: 17px;
		margin-right: 10px;
	}
</style>
