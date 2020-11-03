<template>
	<ul class="m-cvrlst m-cvrlst-alb4 f-cb" v-if="list.length>0">
		<album-item :new_list="list"></album-item>
	</ul>
	<no-list v-else>暂无专辑</no-list>
	<pagination :pageNum="Math.ceil(count/limit)" @setpage="setPage"></pagination>

</template>

<script>
	import albumItem from 'views/recommend/albumItem.vue'
	import Pagination from 'views/common/Pagination.vue'
	import noList from 'views/common/noList.vue'
	import { getArtistAlbum } from 'network/api.js'
	export default {
		name:'artistAlbums',
		components:{
			albumItem,
			Pagination,
			noList
		},
		props:['aid','count'],
		data(){
			return {
				offset:1,
				limit:12,
				list:[]
			}
		},
		watch:{
			offset(){
				this.getList()
			}
		},
		methods:{
			getList(){
				getArtistAlbum({id:this.aid,limit:this.limit,offset:(this.offset -1) * 12}).then(res=>{
					// console.log(res.data)
					this.list = res.data.hotAlbums
				})
			},
			setPage(n){
				this.offset = n
			}
		},
		created(){
			this.getList()
		}
	}
</script>

<style>
	.m-cvrlst-alb4{
		margin: 20px 0 0 -18px;
	}
	.m-cvrlst-alb4 li{
		width: 145px;
		height: 175px;
		padding-left: 18px;
	}
	.u-cover-alb3{
		width: 120px;
		height: 120px;
	}
</style>
