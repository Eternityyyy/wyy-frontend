<template>
	<div class="ztag">
		<div class="n-srchrst">
			<template v-if="type == 1">
				<div class="srchsongst">
					<search-song-item v-for="(item) in searchTypes[type].list" :key="item.id" :song="item" :keyword="keywords"></search-song-item>
				</div>
			</template>
			<template v-if="type == 100">
				<div class="m-sgerlist m-sgerlist-1">
					<ul class="m-cvrlst m-cvrlst-5 f-cb">
						<artist-item v-for="(item,index) in searchTypes[type].list" :key="index" :artist="item"></artist-item>
					</ul>
				</div>
			</template>
			<template v-if="type == 10">
				<ul class="m-cvrlst m-cvrlst-alb3 f-cb">
					<album-item :new_list="searchTypes[type].list" Height="130px" Width="130px"></album-item>
				</ul>
			</template>
			<template v-if="type == 1006">
				<div class="srchsongst">
					<search-lyric-item v-for="(item,index) in searchTypes[type].list" :key="index" :song="item"></search-lyric-item>
				</div>
			</template>
			<template v-if="type == 1000">
				<table class="m-table m-table-2 m-table-2-cover">
					<search-play-item v-for="(item,index) in searchTypes[type].list" :key="index" :playitem="item" :keyword="keywords"></search-play-item>
				</table>
			</template>
			<template v-if="type == 1009">
				<h2 class="head2">主播电台</h2>
				<ul class="m-rdilist f-cb">
					<search-dj-item v-for="(item,index) in searchTypes[type].list" :key="index" :djitem="item" :keyword="keywords"></search-dj-item>
				</ul>
			</template>
			<template v-if="type == 1002">
				<table class="m-table m-table-2 m-table-2-cover">
					<search-user-item v-for="(item,index) in searchTypes[type].list" :key="index" :user="item" :keyword="keywords"></search-user-item>
				</table>
			</template>
		</div>
		<pagination :pageNum="Math.ceil(count/this.limit)" @setpage="setPage" ref="pagination"></pagination>
	</div>

</template>

<script>
	import { searchDjItem,searchPlayItem,searchSongItem,searchUserItem,searchLyricItem } from 'views/search/index.js'
	import artistItem from 'views/artist/artistItem.vue'
	import albumItem from 'views/recommend/albumItem.vue'
	import Pagination from 'views/common/Pagination.vue'
	import { getSearchList } from 'network/api.js'
	export default {
		name:'searchContainer',
		components:{
			searchDjItem,
			searchPlayItem,
			searchSongItem,
			searchUserItem,
			searchLyricItem,
			albumItem,
			artistItem,
			Pagination
		},
		data(){
			return {
				keywords:this.$route.query.s,
				type:this.$route.query?.type ?? 1,
				count:0,
				offset:1,
				limit:30,
				searchTypes:{
					1:{
						title:'单曲',
						list:[],
						name:'song'
					},
					100:{
						title:'歌手',
						list:[],
						name:'artist'
					},
					10:{
						title:'专辑',
						list:[],
						name:'album'
					},
					1014:{
						title:'视频',
						list:[],
						name:'video'
					},
					1006:{
						title:'歌词',
						list:[],
						name:'song'
					},
					1000:{
						title:'歌单',
						list:[],
						name:'playlist'
					},
					1009:{
						title:'主播电台',
						list:[],
						name:'djRadios'
					},
					1002:{
						title:'用户',
						list:[],
						name:'userprofile'
					},
				}
			}
		},
		watch:{
			keywords(){
				this.$refs.pagination.activeIndex = 1
				this.getList()
			},
			type(){
				this.$refs.pagination.activeIndex = 1
				this.getList()
			},
			offset(){
				this.getList()
			}
		},
		methods:{
			getList(){
				getSearchList({keywords:this.keywords,type:this.type,offset:(this.offset - 1)*this.limit,limit:this.limit}).then(res=>{
					// console.log(res.data)
					let key = this.searchTypes[this.type].name
					// console.log(res.data.result)
					this.count = res.data.result[key+'Count']
					// console.log(this.count)
					key = key.charAt(key.length -1) == 's' ? key : key + 's'
					// console.log(key.charAt(key.length -1))
					this.searchTypes[this.type].list = res.data.result[key]
					// console.log(this.searchTypes)
				})
			},
			setPage(n){
				this.offset = n;
			}
		},
		beforeRouteUpdate(to,form,next){
			next();
			this.keywords = to.query.s;
			this.type = to.query.type;
		},
		created(){
			// console.log(this.$route.query)
			this.getList()
		}
	}
</script>

<style>
	.n-srchrst{
		margin-top: 20px;
	}
	.n-srchrst .srchsongst b{
		font-weight: normal;
	}
	.n-srchrst .srchsongst .item{
		padding: 10px 10px 8px 8px;
		border: 1px solid #fff;
	}
	.n-srchrst .srchsongst .td{
		float: left;
		margin-right: 5px;
	}
	.n-srchrst .srchsongst .hd{
		height: 17px;
		width: 17px;
	}
	.n-srchrst .srchsongst .hd .ply{
		display: inline-block;
		width: 17px;
		height: 17px;
		margin-right: 15px;
		cursor: pointer;
		background-position: 0 -103px;
	}
	.n-srchrst .srchsongst .w0{
		width: 370px;
	}
	.n-srchrst .srchsongst .text{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.n-srchrst .w0 .text{
		position: relative;
		display: inline-block;
		padding-right: 25px;
		width: auto;
		max-width: 100%;
		height: 20px;
	}
	.n-srchrst .srchsongst .td{
		float: left;
		margin-left: 5px;
	}
	.n-srchrst .srchsongst .w1{
		width: 15%;
		margin-right: 12px;
	}
	.n-srchrst .srchsongst .w2{
		width: 18%;
		margin-right: 12px;
		min-height: 16px;
	}
	.m-sgerlist-1 .m-cvrlst{
		margin: 0 0 0 -24px;
	}
	.m-cvrlst-5 li{
		width: 130px;
		height: 154px;
	}
	.m-sgerlist-1 .m-cvrlst li{
		padding-left: 24px;
	}
	.m-sgerlist .m-cvrlst li p{
		margin-top: 8px;
	}
	.m-cvrlst li .nm{
		display: inline-block;
		max-width: 85px;
		vertical-align: middle;
	}
	.n-srchrst .album-cover .msk{
		width: 153px;
		height: 130px;
		background-position: 0 -845px;
	}
	.m-cvrlst-alb3 li{
		padding-left: 33px;
	}

</style>
