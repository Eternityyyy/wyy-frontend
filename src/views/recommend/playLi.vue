<template>
	<div class="play-li">
		<div class="play-li-pic">
			<div class="play-li-img">
				<img :src="imgUrl+'?param=140y140'" alt="">
				<router-link :to="`/discover/playlist?id=${liItem.id}`">
				</router-link>
			</div>
			<div class="play-bottom bg-cover">
				<add-play-list title="播放" className="bg-iconall a" :playlistid="liItem.id"></add-play-list>
				<span class="icon-headset bg-iconall"></span>
				<span class="nb">{{liItem.playCount ? showCount(liItem.playCount,10000) : showCount(liItem.playcount,10000)}}</span>
			</div>
		</div>
		<p class="dec">
			<slot></slot>
		</p>
	</div>

</template>

<script>
	import addPlayList from 'views/common/btns/addPlayList.vue'
	export default {
		name:'playLi',
		components:{
			addPlayList
		},
		props:{
			Playli:{
				type:Object
			},
			imgUrl:{
				type:String
			}
		},
		computed:{
			liItem(){
				return this.Playli || []
			},
			imgurl(){
				return this.imgUrl || ''
			}
		},
		data(){
			return {
			}
		}
	}
</script>

<style>
	.play-li{
		width: 140px;
		height: 204px;
		padding-bottom: 30px;
		line-height: 1.4;
	}
	.play-li-pic{
		width: 140px;
		height: 140px;
		position: relative;
	}
	.play-li-pic a,.play-li-pic img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.play-bottom{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 27px;
		background-position: 0 -537px;
		color: #ccc;
	}
	.play-bottom .a{
		display: inline-block;
		position: absolute;
		right: 10px;
		bottom: 5px;
		width: 16px;
		height: 17px;
		background-position: 0 0;
	}
	.play-bottom .icon-headset{
		float: left;
		width: 14px;
		height: 11px;
		background-position: 0 -24px;
		margin: 9px 5px 9px 10px;
	}
	.play-bottom .nb{
		float: left;
		margin: 7px 0 0;
	}
	.play-li .dec{
		margin: 8px 0 3px;
		font-size: 14px;
		width: 100%;
	}
	.play-li-img a{
		background: url(~assets/img/coverall.png) no-repeat 0 9999px;
		background-position: 0 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
