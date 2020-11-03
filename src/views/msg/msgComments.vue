<template>
	<div class="msg-at g-wrap msg-wrap">
		<h3 class="v-hd3">
			<span class="f-left tit">评论</span>
		</h3>
		<div v-if="comments?.length > 0" class="n-msgnt n-msgnt-1 j-flag">
			<div class="item f-cb" v-for="(c,i) in comments" :key="i">
				<router-link :to="`/user/home?id=${c?.user?.userId}`">
					<span class="ava">
						<img :src="c?.user?.avatarUrl + '?param=50y50'">
					</span>
				</router-link>
				<div class="cont cont-1">
					<div class="sec1">
						<div class="time s-fc3">
							{{msgTime(c.time)}}
							<i class="u-icn u-icn-57"></i>
						</div>
						<div class="mn">
							<router-link :to="`/user/home?id=${c?.user?.userId}`">
								<span class="s-fc7">{{c?.user?.nickname}}</span>
							</router-link>
						</div>
					</div>
					<div class="sec3 f-brk">回复我：{{c.content}}</div>
					<div class="sec2">
						<div class="oper">
							<span class="s-fc7">回复</span>
							<p class="s-fc4">
								<router-link :to="`/discover/playlist?id=${c?.resourceJson?.id}`">
									<span class="s-fc4 f-brk">{{c?.beRepliedContent}}</span>
								</router-link>
							</p>
						</div>
					</div>
					<div class="corr u-arr u-arr-3">
						<em class="arrline">◆</em>
					</div>
				</div>
			</div>
		</div>
		<no-list v-else>暂时还没收到评论</no-list>
		<pagination v-if="count>0" :pageNum="count/30"></pagination>
	</div>
</template>

<script>
	import noList from 'views/common/noList.vue'
	import Pagination from 'views/common/Pagination.vue'
	import { mapState } from 'vuex'
	import { getMsgComments } from 'network/api.js'
	export default {
		name:"magComments",
		components:{
			noList,
			Pagination,
		},
		data(){
			return {
				comments:[],
				newCount:0,
				count:0,
				offset:1
			}
		},
		computed:{
			...mapState(['user_id'])
		},
		created(){
			getMsgComments({uid:this.user_id,offset:this.offset -1}).then(res=>{
				res.data.comments.forEach(item=>{
					item.resourceJson = JSON.parse(item.resourceJson)
				})
				// console.log(res.data.comments)
				this.comments = res.data.comments;
				this.count = res.data.total;
			})
		}
	}

</script>

<style>
	.m-dlist{
		position: relative;
	}
	.n-msgnt .m-dlist{
		line-height: normal !important;
	}
	.m-dlist .src, .m-dlist .card, .m-dlist .hotrecmt .bar, .m-dlist .showpic{
		background: #f5f5f5;
	}
	.m-dlist .src{
		display: block;
		position: relative;
		padding: 10px;
		margin: 4px 0 5px;
	}
	.m-dlist .src .cover{
		position: relative;
		width: 40px;
		height: 40px;
		float: left;
	}
	.m-dlist .src .cover:hover .ply{
		display: block;
	}
	.m-dlist .src .cover img{
		width: 40px;
		height: 40px;
	}
	.m-dlist .src .cover .ply{
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 40px;
		height: 40px;
		margin: 0;
		background-position: -100px -70px;
		opacity: .8;
		cursor: pointer;
	}
	.m-dlist .src .scnt{
		display: block;
		position: absolute;
		top: 10px;
		left: 60px;
		right: 30px;
		height: 40px;
		line-height: 22px;
	}
	.m-dlist .src .scnt .tit .tag{
		position: relative;
		top: -1px;
	}
	.m-dlist .src .tag{
		margin-right: 6px;
	}
	.m-dlist h3, .m-dlist h4{
		font-weight: normal;
	}
	.m-dlist .doper{
		margin: 18px 0 -2px;
		text-align: right;
		line-height: normal;
	}
	.m-dlist .doper .line{
		color: #c7c7c7;
		margin: 0 10px 0 12px;
	}
	.m-dlist-msg .time{
		position: absolute;
		right: 0;
		top: 1px;
		margin: 0;
	}

</style>