<template>
	<div class="new">
		<div class="u-title f-cb">
			<h3>
				<span class="f-ff2">优秀新电台</span>
			</h3>
		</div>
		<ul class="m-rdilist f-cb">
			<li v-for="(pitem,pindex) in prefdjs.slice(0,5)" :key="pindex">
				<router-link :to="`/discover/djradio/detail?id=${pitem.id}`">
					<span class="u-cover u-cover-rdi2">
						<img :src="pitem?.picUrl + '?param=200y200'" alt="">
					</span>
				</router-link>
				<h3 class="f-fs2">
					<a href="" class="s-fc1" :title="pitem.name">{{pitem.name}}</a>
				</h3>
				<p class="f-thide2 s-fc4">{{pitem.rcmdtext}}</p>
			</li>
		</ul>
	</div>
	<div class="rdimore">
		<div class="u-title f-cb">
			<h3>
				<span class="f-ff2">电台排行榜</span>
			</h3>
			<div class="tab tab-r">
				<a class="z-sel">上升最快</a>
				<span class="line">|</span>
				<a>最热电台</a>
			</div>
		</div>
		<ul class="rdilist rdilist-2 f-cb">
			<li v-for="(ditem,dindex) in djhots" :key="dindex">
				<router-link :to="`/discover/djradio/detail?id=${ditem.id}`">
					<span href="" class="cvr u-cover u-cover-rdi f-left">
						<img :src="ditem.picUrl + '?param=200y200'" alt="">
					</span>
				</router-link>
				<div class="cnt">
					<a href="" class="s-fc1">{{ditem.name}}</a>
					<p class="note s-fc4">{{ditem.rcmdtext}}</p>
				</div>
			</li>
		</ul>
		<Pagination :pageNum="djsNum" @setpage="setPage"></Pagination>
	</div>

</template>

<script>
	import Pagination from 'views/common/Pagination.vue'
	import { getDjRebytype,getDjHotBycate } from 'network/api.js'
	export default {
		name:'djCategory',
		components:{
			Pagination
		},
		data(){
			return {
				cateId:this.$route.query.id,
				offset:1,
				djhots:[],
				prefdjs:[],
				djsNum:0
			}
		},
		beforeRouteUpdate(to,form,next){
			next();
			this.cateId = to.query.id;
		},
		watch:{
			cateId(){
				this.getdjhotBycate();
				this.getDjre();
			},
			offset(){
				this.getdjhotBycate()
			}
		},
		methods:{
			getdjhotBycate(){
				getDjHotBycate({limit:28,offset:this.offset -1,cateId:this.cateId}).then(res=>{
					// console.log(res.data.djRadios)
					this.djhots = res.data.djRadios
					this.djsNum = res.data.count
				})
			},
			getDjre(){
				getDjRebytype({type:this.cateId}).then(res=>{
					// console.log(res.data.djRadios)
					this.prefdjs = res.data.djRadios
				})
			},
			setPage(n){
				this.offset = n
			}
		},
		created(){
			this.getdjhotBycate();
			this.getDjre();
		}
	}
</script>

<style>
	.m-radio .rditop,.m-radio .new{
		margin-top: 10px;
	}
	.m-rdilist{
		margin: 16px 0 0 -37px;
	}
	.m-rdilist li{
		float: left;
		width: 150px;
		margin-left: 37px;
	}
	.u-cover-rdi2{
		width: 150px;
		height: 150px;
	}
	.m-rdilist h3{
		margin: 13px 0 6px;
		line-height: 16px;
		font-size: 14px;
		font-weight: normal;
	}
	.m-rdilist p{
		line-height: 18px;
	}
	
</style>
