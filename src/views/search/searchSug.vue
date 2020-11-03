<template>
	<div class="u-lstlay j-flag" v-show="isShow && Object.keys(searchList).length">
		<div class="m-schlist">
			<p class="note s-fc3">
				<!-- <router-link> -->
					<span class="xtag s-fc3">搜索“{{keyword}}”相关用户</span>
				<!-- </router-link> -->
			</p>
			<div class="rap">
				<div class="itm f-cb" v-for="(s,key) in searchList" :key="key">
					<h3 class="hd">
						<i class="icn u-icn" :class="listCate[key]?.icn"></i>
						<em class="f-f1">{{listCate[key]?.title}}</em>
					</h3>
					<ul class="f-cb">
						<li v-for="(i,index) in searchList[key]" :key="index">
							<!-- <router-link> -->
								<span class="s-fc0 f-thide xtag a" v-trunHtml="{str:i.name,keyword:keyword}">
									<!-- {{i.name.replace(keyword, `<span class="s-fc7 f-tdn">${keyword}</span>`)}} -->
								</span>
							<!-- </router-link> -->
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { getSearchSug } from 'network/api.js'
	export default {
		name:'searchSug',
		props:{
			keyword:{
				type:String
			},
			isShow:{
				type:Boolean
			}
		},
		data(){
			return {
				searchList:{},
				listCate:{
					songs:{
						icn:'u-icn-26',
						title:'单曲'
					},
					artists:{
						icn:'u-icn-27',
						title:'歌手'
					},
					albums:{
						icn:'u-icn-28',
						title:'专辑'
					},
					playlists:{
						icn:'u-icn-29',
						title:'歌单'
					}
				}
			}
		},
		watch:{
			keyword(){
				// console.log(this.keyword)
				if(this.keyword){
					this.getSearchlist()
				}else{
					this.searchList = {}
				}
			},
			isShow(){
				if(this.keyword & this.isShow){
					this.getSearchlist()
				}
			}
		},
		methods:{
			getSearchlist(){
				getSearchSug({keywords:this.keyword}).then(res=>{
					// console.log(res.data.result)
					if(res.data.result.order){
						res.data.result.order.map(item=>{
							this.searchList[item] = res.data.result[item]
						})
					}else{
						console.log('没有order')
						this.searchList = {};
					}
				})
			}
		}
		// created(){
			// getSearchSug().then(res=>{
			// 	console.log(res.data)
			// })
		// }
	}
</script>

<style>
	.search .u-lstlay{
		clear: both;
		top: 43px;
		width: 240px;
	}
	.u-lstlay{
		position: absolute;
		z-index: 120;
		left: 0;
		box-sizing: border-box;
		border: 1px solid #bebebe;
		border-radius: 4px;
		background: #fff;
		box-shadow: 0 4px 7px #555;
		text-shadow: 0 1px 0 rgba(255,255,255,0.9);
	}
	.m-schlist .note{
		height: 17px;
		padding: 11px 10px;
		border-bottom: 1px solid #e2e2e2;
	}
	.m-schlist .hd{
		float: left;
		width: 52px;
		margin-right: -100px;
		padding: 10px 0 0 10px;
		border-right: 1px solid #e2e2e2;
		line-height: 17px;
		font-weight: normal;
	}
	.m-schlist .hd .icn{
		float: left;
		margin: 2px 4px 0 0;
	}
	.m-schlist ul{
		margin-left: 62px;
		margin-top: -1px;
		padding: 6px 0 5px;
		border-top: 1px solid #e2e2e2;
		border-left: 1px solid #e2e2e2;
	}
	.m-schlist li{
		width: 100%;
		float: left;
	}
	.m-schlist li .a{
		display: block;
		width: 100%;
		text-indent: 12px;
		line-height: 24px;
	}
	.m-schlist li .a span{
		display: inline-block;
	}
</style>
