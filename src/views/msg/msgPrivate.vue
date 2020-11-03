<template>
	<div class="msg-private g-wrap msg-wrap">
		<h3 class="v-hd3">
			<span class="f-left tit">私信</span>
			<span class="mail u-btn u-btn-2 j-flag">发送私信</span>
		</h3>
		<div v-if="privates?.length > 0" class="n-msgnt n-msgnt-1 n-msgnt-hvr j-flag">
			<div class="item f-cb" v-for="(p,i) in privates" :key="i" :title="p?.fromUser?.nickname">
				<div class="ava f-pr">
					<router-link :to="`/user/home?id=${p?.fromUser?.userId}`">
						<img :src="p?.fromUser?.avatarUrl + '?param=50y50'">
					</router-link>
					<i class="u-bub" v-if="p?.newMsgCount > 0">
						<b class="f-alpha"></b>
						<em>{{p?.newMsgCount}}</em>
					</i>
				</div>
				<div class="cont">
					<div class="sec1">
						<div class="time s-fc4">
							{{msgTime(p.lastMsgTime)}}
							<i class="u-icn u-icn-57"></i>
						</div>
						<div class="mn">
							<router-link :to="`/user/home?id=${p?.fromUser?.userId}`">
								<span class="s-fc0 f-fs1 f-fw1" :title="p?.fromUser?.nickname">
									{{p?.fromUser?.nickname}}
								</span>
							</router-link>
							<sup class="u-icn u-icn-1"></sup>
						</div>
					</div>
					<div class="sec sec2-1 f-thide s-fc4">
						<div class="oper">
							<span class="dlt">
								<span class="s-fc7">删除</span>
							</span>
						</div>
						<p class="f-thide">
							{{p?.lastMsg?.msg}}
						</p>
					</div>
				</div>
			</div>
		</div>
		<no-list v-else>暂时没有私信</no-list>
		<pagination v-if="count>0" :pageNum="count/30"></pagination>
	</div>

</template>

<script>
	import Pagination from 'views/common/Pagination.vue'
	import noList from 'views/common/noList.vue'
	import { getMsgPrivate } from 'network/api.js'
	import { mapState } from 'vuex'
	export default {
		name:"msgPrivate",
		components:{
			Pagination,
			noList
		},
		computed:{
			...mapState(['user_id'])
		},
		data(){
			return {
				offset:1,
				privates:[],
				newCount:0,
				count:0,
			}
		},
		methods:{
			getPrivate(){
				getMsgPrivate({offset:this.offset -1}).then(res=>{
					// console.log(res.data)
					res.data.msgs.forEach(item=>{
						item.lastMsg = JSON.parse(item.lastMsg)
					})
					this.privates = res.data.msgs
					this.count = res.data.newMsgCount
					this.count = this.privates.length;
				})
			}
		},
		created(){
			this.getPrivate()
		}
	}

</script>

<style>
	.n-msgnt .item:hover .dlt{
		visibility: visible;
	}

</style> 