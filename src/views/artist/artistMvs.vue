<template>
	<no-list v-if="list.length">暂无MV</no-list>
	<pagination :pageNum="Math.ceil(count/limit)" @setpage="setPage"></pagination>

</template>

<script>
	import Pagination from 'views/common/Pagination.vue'
	import noList from 'views/common/noList.vue'
	import { getArtistMv } from 'network/api.js'
	export default {
		name:'artistMvs',
		components:{
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
				getArtistMv({id:this.aid,limit:this.limit,offset:(this.offset -1) * 12}).then(res=>{
					console.log(res.data)
					this.list = res.data
				})
			},
			setPage(n){
				this.offset = n
			}
		},
		created(){
			// console.log(this.count)
			this.getList()
		}
	}
</script>

<style>
</style>