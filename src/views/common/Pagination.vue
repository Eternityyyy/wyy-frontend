<template>
	<div class="u-page" v-if="this.pageNum>1">
		<a class="zbtn zprv" :class="{'js-disabled':activeIndex == 1}" @click="prePage">上一页</a>
		<a class="zpgi" :class="{'js-selected':activeIndex==1}" @click="jumpPage">1</a>
		<span class="zdot" v-show="activeIndex>5">...</span>
		<a v-for="n in pagenum" class="zpgi" :key="n" :class="{'js-selected':activeIndex==firstn + n}" @click="jumpPage">{{firstn + n}}</a>
		<span class="zdot" v-show="pageNum - activeIndex > 5">...</span>
		<a class="zpgi zpg9" v-if="pageNum>=9" :class="{'js-selected':activeIndex==pageNum}" @click="jumpPage">{{pageNum}}</a>
		<a class="zbtn znxt" :class="{'js-disabled':activeIndex == pageNum}" @click="nextPage">下一页</a>
	</div>
</template>

<script>
	export default {
		name:'Pagination',
		props:{
			pageNum:{
				type:Number
			},
			selectIndex:{
				type:Number,
				default:1
			}
		},
		computed:{
			pagenum(){
				return this.pageNum >= 9 ? 7 : this.pageNum -1
			},
			firstn(){
				return this.activeIndex > 5 ? (this.activeIndex > this.pageNum - 4 ? this.pageNum - 8  : this.activeIndex -4) : 1
			}
		},
		watch:{
			activeIndex(val){
				this.$emit('setpage',val)
			}
		},
		data(){
			return {
				fixn:3,
				activeIndex:this.selectIndex
			}
		},
		methods:{
			prePage(){
				if(this.activeIndex <= 1){
					return
				}
				this.activeIndex --
			},
			nextPage(){
				if(this.activeIndex >=this.pageNum){
					return 
				}
				this.activeIndex ++ 
			},
			jumpPage(e){
				this.activeIndex = Number(e.target.innerText)
			}
		}
	}
</script>

<style>
	div.u-page{
		margin: 20px 0;
		text-align: center;
		font-size: 12px;
	}
	div.u-page .zbtn, div.u-page .zpgi{
		margin: 0 1px 0 2px;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 2px;
		vertical-align: middle;
	}
	div.u-page .zbtn{
		width: 69px;
		line-height: 24px;
		color: #333;
		text-align: left;
		padding: 0;
	}
	div.u-page .zprv{
		width: 47px;
		padding-left: 22px;
		background-position: 0 -560px;
	}
	div.u-page .zpgi{
		height: 22px;
		padding: 0 8px;
		background-color: #fff;
		line-height: 22px;
	}
	div.u-page a.js-selected,div.u-page a.js-selected:hover{
		background-position: 0 -650px;
		border-color: #a2161b;
		color: #fff;
	}
	div.u-page a.zprv.js-disabled, div.u-page a.zprv.js-disabled:hover{
		background-position: 0 -620px;
		color: #cacaca;
	}
	div.u-page .znxt{
		width: 57px;
		padding-left: 12px;
		background-position: -75px -560px;
	}
	div.u-page a.znxt.js-disabled, div.u-page a.znxt.js-disabled:hover{
		background-position: -75px -620px;
		color: #cacaca;
	}
</style>
