<template>
	<div class="dj-radio">
		<div class="dj-radio-wrap m-radio">
			<div class="rditype f-pr f-cb">
				<div class="boxes muti">
					<ul class="box f-cd" v-show="selectIndex == 1">
						<li v-for="(citem,index) in djCatelist.slice(0,18)" :key="index">
							<router-link :to="`/discover/djradio/category?id=${citem.id}`" :exact-active-class="this.$route.query.id == citem.id ? 'z-sel':''">
								<div class="icon" :style="{'background-image':`url(${citem.picWebUrl})`}"></div>
								<em>{{citem.name}}</em>
							</router-link>
						</li>
					</ul>
					<ul class="box f-cb" v-show="selectIndex ==2">
						<li v-for="(citem,index) in djCatelist.slice(18)" :key="index">
							<a href="">
								<div class="icon" :style="{'background-image':`url(${citem.picWebUrl})`}"></div>
								<em>{{citem.name}}</em>
							</a>
						</li>
					</ul>
				</div>
				<span class="turn turn-left" :class="{'z-dis':selectIndex > 1}" @click="prev">向左</span>
				<span class="turn turn-right" :class="{'z-dis':selectIndex <= 1}" @click="nextv">向右</span>
				<div class="dotpage">
					<span class="dot" :class="{'z-curr':selectIndex == 1}" @click="turnPage(1)">1</span>
					<span class="dot" :class="{'z-curr':selectIndex == 2}" @click="turnPage(2)">2</span>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>

</template>

<script>
	import {getDjCatelist} from 'network/api.js'
	export default {
		name:'djRadio',
		data(){
			return {
				djCatelist:[],
				pushCatelist:[
					{
						name:'常见问题',
						picWebUrl:require('assets/img/radio_faq.png')
					},
					{
						name:'我要做主播',
						picWebUrl:require('assets/img/radio_apply.png')
					}
				],
				selectIndex:1,
				back:'url(~assets/img)'
			}
		},
		methods:{
			prev(){
				if(this.selectIndex <=1){
					return
				}
				this.selectIndex --
			},
			nextv(){
				if(this.selectIndex >1){
					return
				}
				this.selectIndex ++
			},
			turnPage(n){
				this.selectIndex = n
			}
		},
		created(){
			getDjCatelist().then(res=>{
				// console.log(res.data.categories)
				this.djCatelist = res.data.categories.concat(this.pushCatelist)
			});
			
		}
	}
</script>

<style>
	.dj-radio{
		background-color: white;
	}
	.dj-radio-wrap{
		padding: 40px;
		width: 100%;
	}
	.m-radio .rditype{
		margin-bottom: 20px;
		position: relative;
	}
	.m-radio .rditype .boxes{
		overflow: hidden;
		max-height: 194px;
	}
	.m-radio .rditype .boxes.muti{
		height: 194px;
	}
	.m-radio .rditype ul{
		margin-left: -33px;
	}
	.m-radio .rditype li{
		float: left;
		margin: 0 0 25px 33px;
	}
	.m-radio .rditype a{
		background-image: url(~assets/img/radio_bg.png);
		background-repeat: no-repeat;
	}
	.m-radio .rditype a{
		display: block;
		width: 70px;
		height: 70px;
		background-position: 0 9999px;
		text-align: center;
		color: #888;
	}
	.m-radio .rditype a.z-sel,.m-radio .rditype a.z-sel:hover{
		background-position: -70px 0;
		color: #d35757;
	}
	.m-radio .rditype a.z-sel .icon{
		background-position: -48px 0;
	}
	.m-radio .rditype .icon{
		width: 48px;
		height: 48px;
		margin: 2px auto 0;
		background-position: 0 0;
	}
	.m-radio .rditype a em{
		margin-top: -3px;
	}
	.m-radio .rditype .turn{
		position: absolute;
		top: 50%;
		width: 20px;
		height: 30px;
		margin-top: -15px;
		opacity: 0.25;
		text-indent: -9999px;
	}
	.m-radio .rditype .turn-left{
		left: -26px;
		background-position: 0 -30px;
	}
	.m-radio .rditype .turn-right{
		right: -26px;
		background-position: -30px -30px;
	}
	.m-radio .rditype .turn.z-dis{
		opacity: 0.8;
	}
	.m-radio .rditype .dotpage{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0px;
		width: 100%;
		height: 20px;
		text-align: center;
		line-height: 0;
	}
	.m-radio .rditype .dot{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-position: 0 0;
		text-indent: -9999px;
	}
	.m-radio .rditype .dot.z-curr,.m-radio .rditype .dot:hover{
		background-position: -30px 0;
	}
	.section-title .more{
		margin-top: 14px;
	}
	.m-radio .rditop .blk{
		width: 426px;
	}
	.m-radio .rditop .blk li:nth-child(even){
		background-color: #f5f5f5;
	}
	.rditop .f-fr{
		float: right;
	}
	.m-radio .toplist{
		height: 600px;
		border: 1px solid #e2e2e2;
		border-top: none;
	}
	.m-radio .toplist .item{
		width: 424px;
		height: 40px;
		padding: 10px 0;
		line-height: 40px;
		float: left;
		background: #fff;
	}
	.m-radio .toplist .cvr{
		margin-left: 20px;
	}
	.u-cover-tiny{
		width: 40px;
		height: 40px;
	}
	.u-cover-tiny .ply{
		position: absolute;
		display: none;
		width: 22px;
		height: 22px;
		top: 50%;
		left: 50%;
		overflow: hidden;
		margin: -11px 0 0 -11px;
		background-position: 0 -85px;
	}
	.m-radio .toplist .cnt{
		width: 254px;
		margin: 1px 0 0 10px;
		line-height: 20px;
	}
	.m-radio .toplist .tag{
		margin: 1px 0 0 10px;
	}
	.m-radio .toplist .dj-rank{
		width: 47px;
		margin: 6px 0 0 0;
		text-align: center;
		line-height: normal;
	}
	.m-radio .toplist .dj-rank .red{
		color: #da4545;
	}
	.m-radio .toplist .dj-rank em{
		display: block;
		width: 100%;
		text-align: center;
	}
	.u-rnk-up{
		color: #ba2226;
	}
	.u-rnk{
		line-height: normal;
		font-size: 10px;
	}
	.u-rnk i{
		margin: -1px 2px 0 0;
		vertical-align: middle;
	}
	.u-icn-73{
		background-position: -74px -304px;
	}
	.m-radio .toplist-r .cvr{
		margin-left: 0;
	}
	.u-cover img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.m-radio .toplist-r .cnt{
		width: 208px;
	}
	.m-radio .toplist .hot{
		margin-top: 16px;
	}
	.u-hot,.u-hot i{
		display: block;
		height: 8px;
	}
	.u-hot{
		display: block;
		position: relative;
		width: 100px;
		background-position: 0 -240px;
		line-height: normal;
	}
	.u-hot i{
		overflow: hidden;
		padding: 0 4px;
		background-position: right -318px;
	}
	.u-hot i i{
		margin-left: -4px;
		padding: 0 0 0 4px;
		background-position: 0 -304px;
	}
	.m-radio .rdimore{
		margin-top: 35px;
	}
	.rdimore .s-title{
		font-size: 24px;
	}
	.m-radio .rdilist{
		margin-left: -30px;
	}
	.m-radio .rdilist li{
		float: left;
		width: 435px;
		height: 120px;
		margin-left: 30px;
		padding: 20px 0;
		border-bottom: 1px solid #e7e7e7;
	}
	.m-radio .rdilist .cvr{
		margin-right: -200px;
	}
	.u-cover-rdi{
		width: 120px;
		height: 120px;
	}
	.m-radio .rdilist .cnt{
		margin-left: 140px;
	}

	
</style>
