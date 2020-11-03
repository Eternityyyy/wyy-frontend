<template>
	<subNav></subNav>
	<!-- 副导航的链接路由视图出口 -->
	<div class="searchs">
		<div class="s-wrap n-srch">
			<div class="pgsrch f-pr j-suggest">
				<input type="text" class="srch j-flag" @focus="isShow = true" @blur="isShow = false" v-model="keywords" @keyup.enter="search">
				<span class="j-flag"></span>
				<a class="btn j-flag" title="搜索" @click="search"></a>
				<search-sug :keyword="keywords" :isShow="isShow"></search-sug>
			</div>
			<div class="m-search">
				<div class="snote s-fc4 ztag">
					<!-- 搜索“{{keywords}}",找到<em class="s-fc6">{{$children}}</em>个{{}} -->
				</div>
				<ul class="m-tabs m-tabs-srch f-cb ztag">
					<li v-for="(item,key) in searchTypes" :key="key">
						<router-link :to="`/search/m?s=${keywords}&type=${key}`" :exact-active-class="key == type ? 'z-slt':''">
							<em>{{item}}</em>
						</router-link>
					</li>
				</ul> 
				<router-view></router-view>
			</div>
			<!-- <router-view></router-view> -->
		</div>
	</div>

</template>

<script>
	import subNav from 'views/Header/subNav.vue'
	import searchSug from 'views/search/searchSug.vue'
	export default {
		name:'',
		components:{
			subNav,
			searchSug
		},
		data(){
			return {
				keywords:this.$route.query.s,
				type:this.$route.query?.type ?? 1,
				count:0,
				isShow:false,
				searchTypes:{
					1:'单曲',
					100:'歌手',
					10:'专辑',
					1014:'视频',
					1006:'歌词',
					1000:'歌单',
					1009:'主播电台',
					1002:'用户'
				}
			}
		},
		beforeRouteUpdate(to,form,next){
			next();
			this.keywords = to.query.s;
			this.type = to.query.type;
		},
		methods:{
			search(){
				this.$router.push({path:'/search/m',query:{s:this.keywords,type:this.type}})
			}
		}
	}
</script>

<style>
	.searchs{
		background: #fff;
	}
	.s-wrap{
		padding: 40px;
	}
	.n-srch .pgsrch{
		width: 420px;
		height: 40px;
		margin: 0 auto;
		background-position: 0 0;
		z-index: 10;
	}
	.n-srch .pgsrch .srch{
		float: left;
		width: 320px;
		height: 17px;
		margin: 12px 0 0 20px;
		padding: 0;
		background: #fff;
		border: none;
	}
	.n-srch .pgsrch .btn{
		float: right;
		width: 50px;
		height: 40px;
		text-indent: -9999px;
	}
	.n-srch .pgsrch .u-lstlay{
		top: 43px;
		width: 418px;
	}
	.n-srch .snote{
		margin: 28px 0 17px;
	}
	.m-tabs{
		height: 39px;
		border: 1px solid #ccc;
		border-width: 0 1px;
		background-position: 0 0;
		background-repeat: repeat-x;
	}
	.m-tabs li, .m-tabs a, .m-tabs em{
		float: left;
		height: 39px;
		font-size: 14px;
	}
	.m-tabs li{
		position: relative;
		left: -1px;
	}
	.m-tabs a{
		padding-left: 2px;
	}
	.m-tabs a.z-slt{
		background-position: left -90px;
	}
	.m-tabs em{
		height: 37px;
		width: 134px;
		padding: 2px 2px 0 0;
		line-height: 37px;
		cursor: pointer;
		text-align: center;
	}
	.m-tabs-srch em{
		width: 108px;
	}
	.m-tabs a.z-slt em{
		background-position: right -90px;
	}
	.n-srch .head2{
		margin-top: 8px;
		padding-bottom: 6px;
		border-bottom: 6px;
		line-height: 17px;
		font-weight: bold;
	}
</style>
