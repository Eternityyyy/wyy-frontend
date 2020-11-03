<template>
	<div class="n-cmt">
		<discoverSection s_class='cmt'>
			<template v-slot:title>评论</template>
			<template v-slot:titleLi>
				<span class="sub s-fc3">共{{cmtNum}}条评论</span>
			</template>
			<template v-slot:container>
				<div class="m-cmmt">
					<comment-area :type="commentType[Curl]" :Cid="cid" @addcomment="addComment"></comment-area>
					<div class="cmmts j-flag" v-if="playCom?.length>0">
						<commet-list :comments="playComHot" Title="精彩评论" v-if="offset<=1&&playComHot?.length>0" :Id="cid" :type="commentType[Curl]" @like="Like"></commet-list>
						<br>
						<br>
						<commet-list :comments="playCom" Title="最新评论" :Id="cid" :type="commentType[Curl]" @like="Like" @delcomment="delComment"></commet-list>
					</div>
					<div class="j-flag auto-1599531072728-parent">
						<Pagination :pageNum="pagination" :selectIndex="selectIndex" @setpage="setPage" ref="pagination"></Pagination>
					</div>
				</div>
			</template>
		</discoverSection>
	</div>

</template>

<script>
	import discoverSection from 'views/discover/discoverSection.vue'
	import Pagination from 'views/common/Pagination.vue'
	import commetList from 'views/detail/commetList.vue'
	import commentArea from 'views/detail/commentArea.vue'
	
	import {getPlaylistCom} from 'network/api.js'
	export default {
		name:'Comments',
		props:{
			cid:{},
			cmtNum:{
				type:Number
			},
			Curl:{
				type:String
			}
		},
		components:{
			Pagination,
			commetList,
			commentArea,
			discoverSection
		},
		computed:{
			pagination(){
				return Math.ceil(this.cmtNum/20)
			}
		},
		watch:{
			offset(val){
				this.getCommetlist(this.cid,val)
			},
			cid(val){
				this.$refs.pagination.activeIndex = 1
				this.getCommetlist(val,1)
			}
		},
		data(){
			return {
				playComHot:[],
				playCom:[],
				selectIndex:1,
				offset:1,
				commentType:{
					'/music':0,
					'/mv':1,
					'/playlist':2,
					'/album':3,
					'/dj':4,
					'/video':5,
					'/event':6
				}
			}
		},
		methods:{
			getCommetlist(id,off){
				// console.log(this.Curl)
				getPlaylistCom(this.Curl,{id:id,offset:(off-1)*20}).then(res=>{
					// console.log(res.data)
					this.playComHot = res.data.hotComments
					this.playCom = res.data.comments
				})
			},
			setPage(n){
				this.offset = n;
			},
			Like(){
				this.getCommetlist(this.cid,this.offset);
			},
			addComment(comment){
				this.playCom.unshift(comment)
			},
			delComment(index){
				this.playCom.splice(index,1)
			}
		},
		created(){
			console.log(this.cid)
			console.log(this.Curl)
			if(this.cid){
				this.getCommetlist(this.cid,this.offset)
			}
		}
	}
</script>

<style>
	.n-cmt{
		margin-top: 40px;
	}
	.m-cmmt{
		margin-top: 20px;
	}
	.m-cmmt .head,.m-cmmt .head img{
		float: left;
		width: 50px;
		height: 50px;
		margin-right: -100px;
	}
	.m-cmmt .cmmts img{
		vertical-align: middle;
	}
</style>
