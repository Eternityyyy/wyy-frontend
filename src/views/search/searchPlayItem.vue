<template>
	<tr class="h-flag">
		<td class="first w0">
			<div class="hd">
				<play-btn class="ply" :songid="playitem.id"></play-btn>
			</div>
		</td>
		<td class="w7">
			<div class="u-cover u-cover-3">
				<img :src="playitem.coverImgUrl +'?param=180y180'">
				<span class="msk bg-cover" :title="playitem.name"></span>
			</div>
		</td>
		<td>
			<div class="f-cb">
				<div class="opt hshow">
					<add-music :songid="playitem?.id" class="u-icn u-icn-81 icn-add"></add-music>
					<collect-btn class="icn icn-fav"></collect-btn>
					<share-btn class="icn icn-share"></share-btn>
				</div>
				<div class="tt">
					<div class="ttc">
						<div class="txt">
							<router-link :to="`/discover/songlist?id=${playitem.id}`">
								<span v-trunHtml="{str:playitem.name,keyword:keyword}"></span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td class="w11 s-fc4">{{playitem.trackCount}}首</td>
		<td class="w4">
			<div class="text">
				<span class="s-fc3">by</span>
				&nbsp;&nbsp;
				<span class="s-fc3" :title="playitem?.creator?.nickname">{{playitem?.creator?.nickname}}</span>
			</div>
		</td>
		<td class="w6 s-fc4">
			收藏：
			<span>{{showCount(playitem.bookCount,10000)}}</span>
		</td>
		<td class="last w6 s-fc4">
			收听：
			<span>{{showCount(playitem.playCount,10000)}}</span>
		</td>
	</tr>

</template>

<script>
	import { playBtn,addMusic,CollectBtn,shareBtn } from 'views/common/btns/index.js'
	export default {
		name:'searchPlayItem',
		components:{
			playBtn,
			addMusic,
			CollectBtn,
			shareBtn
		},
		props:{
			playitem:{
				type:Object 
			},
			keyword:{
				type:String
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.m-table-2 tr td{
		padding-top: 8px;
		padding-bottom: 8px;
		border: 1px solid #fff;
		border-width: 1px 0;
	}
	.m-table-2-cover tr td{
		padding-top: 5px;
		padding-bottom: 5px;
	}
	.m-table .w0{
		width: 25px;
	}
	.m-table .hd{
		padding-left: 5px;
	}
	.m-table-2 tr td.first{
		border-left: 1px solid #fff;
	}
	.m-table-2 .opt{
		float: right;
	}
	.m-table-2 .tt{
		margin-right: -100px;
	}
	.m-table-2 tr:hover .hshow{
		display: inline-block;
	}
	
</style>
