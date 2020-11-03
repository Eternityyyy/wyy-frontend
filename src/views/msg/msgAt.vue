<template>
	<div class="msg-at g-wrap msg-wrap">
		<h3 class="v-hd3">
			<span class="f-left tit">@我的</span>
		</h3>
		<div v-if="forwards.length > 0" class="n-msgnt n-msgnt-hvr j-flag">
			<div class="item f-cb" v-for="(c,i) in forwards" :key="i">
				<i class="icon u-icn u-icn-43 j-flag"></i>
				<div class="ava f-pr">
					<router-link :to="`/user/home?id=${c?.json?.comment?.user?.userId}`">
						<img :src="c?.json?.comment?.user?.avatarUrl + '?param=50y50'">
					</router-link>
				</div>
				<div class="cont m-dlist m-dlist-msg j-flag">
					<div class="type f-pr f-fs1">
						<router-link :to="`/user/home?id=${c?.json?.comment?.user?.userId}`">
							<span class="s-fc7">{{c?.json?.comment?.user?.nickname}}</span>
							<span>评论</span>
						</router-link>
					</div>
					<div class="time">
						<router-link :to="`/discover/playlist?id=${c?.json?.id}`">
							<span class="s-fc4">{{msgTime(c.time)}}</span>
						</router-link>
					</div>
					<div class="text f-brk">
						<router-link :to="`/user/home?id=${c?.userId}`">
							<span class="s-fc7">{{c?.json?.comment?.content}}</span>
						</router-link>
					</div>
					<div>
						<div class="src f-cb">
							<div class="cover">
								<span class="lnk">
									<img :src="c?.json?.resource?.coverImgUrl + '?param=40y40'">
									<add-play-list :playlistid="c?.json?.resource?.id" className="ply u-dicn u-dicn-8 f-alpha"></add-play-list>
								</span>
							</div>
							<div class="scnt">
								<h3 class="tit f-thide s-fc1 f-fs1">
									<span class="tag u-dtag">
										歌单
										<i class="rt"></i>
									</span>
									<router-link :to="`/discover/playlist?id=${c?.json?.resource?.id}`">
										<span class="s-fc1">{{c?.json?.name}}</span>
									</router-link>
								</h3>
								<h4 class="from f-thide s-fc3">
									by{{c?.json?.resource?.creator?.nickname}}
									<router-link :to="`/user/home?id=${c?.json?.resource?.creator?.userId}`"></router-link>
								</h4>
							</div>
						</div>
					</div>
					<div class="doper">
						<router-link :to="`/discover/playlist?id=${c?.json?.resource?.id}`">
							<span class="s-fc7">查看音乐</span>
						</router-link>
						<span class="line">|</span>
						<span class="s-fc7">回复</span>
					</div>
				</div>
			</div>
		</div>
		<no-list v-else>暂时还没收到@</no-list>
		<pagination v-if="count>0" :pageNum="count/30"></pagination>
	</div>
</template>

<script>
	import addPlayList from 'views/common/btns/addPlayList.vue'
	import noList from 'views/common/noList.vue'
	import Pagination from 'views/common/Pagination.vue'
	import { getMsgForwords } from 'network/api.js'
	export default {
		name:"magAt",
		components:{
			noList,
			Pagination,
			addPlayList
		},
		data(){
			return {
				forwards:[],
				newCount:0,
				count:0
			}
		},
		created(){
			getMsgForwords().then(res=>{
				res.data.forwards.forEach(item=>{
					item.json = JSON.parse(item.json)
				})
				this.forwards = res.data.forwards;
				this.newCount = res.data.newCount;
				// console.log(res.data)
				this.count = res?.data?.forwards?.length;
			})
		}
	}

</script>

<style>

</style>