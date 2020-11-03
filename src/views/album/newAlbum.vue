<template>
	<div class="new-album">
		<div class="album-wrap n-alblist f-pr">
				<div class="u-title f-cb">
					<h3>
						<span class="f-ff2">热门新碟</span>
					</h3>
				</div>
				<ul class="m-cvrlst m-cvrlst-alb2 f-cb">
					<albumItem Width="130px" Height="130px" :new_list="hotAlbums"></albumItem>
				</ul>
			<div class="u-title f-cb">
				<h3>
					<span class="f-ff2">全部新碟</span>
				</h3>
				<div class="tab">
					<a class="s-fc6" v-for="(titem,tindex) in albumType" :key="tindex">
						<span @click="setArea(titem.type)">{{titem.name}}</span>
						<span class="line" v-if="albumType[tindex + 1]">|</span>
					</a>
				</div>
			</div>
			<ul class="m-cvrlst m-cvrlst-alb2 f-cb">
				<albumItem Width="130px" Height="130px" :new_list="allNewAlbum"></albumItem>
			</ul>
			<Pagination :pageNum="Math.ceil(albumTotal/35)" @setpage="setPage" ref="pagination"></Pagination>
		</div>
	</div>

</template>

<script>
	import albumItem from 'views/recommend/albumItem.vue'
	import Pagination from 'views/common/Pagination.vue'
	
	import {getAlbum,getAllAlbum} from 'network/api.js'
	export default {
		name:'newAlbum',
		components:{
			albumItem,
			Pagination
		},
		data(){
			return {
				hotAlbums:[],
				allNewAlbum:[],
				albumType:[
					{
						name:'全部',
						type:'ALL'
					},
					{
						name:'华语',
						type:'ZH'
					},
					{
						name:'欧美',
						type:'EA'
					},
					{
						name:'韩国',
						type:'KP'
					},
					{
						name:'日本',
						type:'JP'
					}
				],
				limit:35,
				offset:1,
				area:'ALL',
				albumTotal:0
			}
		},
		watch:{
			offset(){
				this.getNewAlbumAll()
			},
			area(){
				this.$refs.pagination.activeIndex = 1
				this.getNewAlbumAll()
			}
		},
		methods:{
			getNewAlbumAll(){
				getAllAlbum({
					limit:this.limit,
					offset:(this.offset-1)*this.limit,
					area:this.area
				}).then(res=>{
					// console.log(res.data.albums)
					this.allNewAlbum = res.data.albums
					this.albumTotal = res.data.total
				})
			},
			setPage(n){
				this.offset = n
			},
			setArea(area){
				// console.log(area)
				this.area = area
			}
		},
		created(){
			getAlbum().then(res=>{
				// console.log(res.data.albums);
				this.hotAlbums = res.data.albums.slice(0,10);
			});
			this.getNewAlbumAll()
		}
	}
</script>

<style>
	.album-wrap{
		padding: 40px;
	}
	.n-alblist .m-cvrlst{
		margin: 20px 0 0 -33px;
	}
	.n-alblist .m-cvrlst-alb2 li{
		padding-left: 33px;
	}
	.new-album .album-cover .msk{
		width: 153px;
		height: 130px;
		background-position: 0 -845px;
	}
	
</style>
