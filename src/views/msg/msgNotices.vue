<template>
	<div class="msg-at g-wrap msg-wrap">
		<h3 class="v-hd3">
			<span class="f-left tit">通知</span>
		</h3>
		<div v-if="notices?.length > 0" class="n-msgnt n-msgnt-hvr j-flag">
			<div class="item f-cb" v-for="(p,i) in notices" :key="i">
				<div class="ava f-pr">
					<router-link :to="`/user/home?id=${p?.notice?.user?.userId}`">
						<img :src="p?.notice?.user?.avatarUrl + '?param=40y40'">
					</router-link>
				</div>
				<div class="cont">
					<div class="sec1">
						<div class="time s-fc4">
							{{msgTime(p?.time)}}
							<i class="u-icn u-icn-57"></i>
						</div>
						<div class="mn">
							<router-link :to="`/user/home?id=${p?.notice?.user?.userId}`">
								<span class="s-fc0 f-fs1 f-fw1" :title="p?.notice?.user?.nickname">
									{{p?.notice?.user?.nickname}}
								</span>
							</router-link>
							<sup class="u-icn u-icn-1"></sup>
						</div>
					</div>
					<div class="sec">
						<p class="f-thide">
							{{p?.notice?.comment?.content}}
						</p>
					</div>
				</div>
			</div>
		</div>
		<no-list v-else>暂时还没收到通知</no-list>
		<pagination v-if="count>0" :pageNum="count/30"></pagination>
	</div>
</template>

<script>
	import noList from 'views/common/noList.vue'
	import Pagination from 'views/common/Pagination.vue'
	import { getMsgNotices } from 'network/api.js'
	export default {
		name:"msgNotices",
		components:{
			noList,
			Pagination
		},
		data(){
			return {
				notices:[],
				newCount:0,
				count:0,
				offset:1
			}
		},
		created(){
			getMsgNotices({offset:this.offset -1}).then(res=>{
				res.data.notices.forEach(item=>{
					item.notice = JSON.parse(item.notice)
				})
				// console.log(res.data)
				this.notices = res.data.notices;
				this.count = res.data.notices.length;
			})
		}
	}

</script>

<style>

</style>