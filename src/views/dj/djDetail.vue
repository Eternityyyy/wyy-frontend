<template>
	<div class="dj-detail">
		<div class="dj-detail-left">
			<div class="dj-l-wrap">
				<div class="m-info f-cb">
					<div class="cover u-cover u-cover-dj">
						<img :src="djdetail.picUrl + '?param=200y200'" alt="">
						<span class="msk bg-cover"></span>
					</div>
					<div class="cnt">
						<div class="cntc">
							<detail-title icn_class="u-icn-93" :Title="djdetail.name"></detail-title>
							<div class="user f-cb">
								<a href="" class="face">
									<img :src="djdetail?.dj?.avatarUrl + '?param=50y50'" alt="">
								</a>
								<span class="name">
									<a href="" class="s-fc7" :title="djdetail?.dj?.nickname">{{djdetail?.dj?.nickname}}</a>
								</span>
								<sup class="icn u-icn2 u-icn2-music2"></sup>
							</div>
							<div class="btns f-cb j-flag">
								<span class="u-btni u-btni-sub">
									<i>订阅({{djdetail.subCount}})</i>
								</span>
								<add-play-list className="u-btni u-btni-playall">
									<i>播放全部</i>
								</add-play-list>
								<span class="u-btni u-btni-share">
									<i>分享</i>
								</span>
							</div>
							<p class="intr f-brk">
								<a href="" class="cat u-type u-type-red">{{djdetail.category}}</a>
								{{djdetail.desc}}
							</p>
						</div>
					</div>
				</div>
				<div class="n-songtb">
					<div class="u-title u-title-1 f-cb">
						<h3>
							<span class="f-ff2">节目列表</span>
						</h3>
						<span class="sub s-fc4">共{{djdetail.programCount}}期</span>
						<div class="u-sort f-fr f-cb">
							<span class="desc z-sel" title="降序"></span>
							<span class="asc" title="升序"></span>
						</div>
						<div class="out f-fr">
							<i class="u-icn u-icn-95"></i>
							<a href="" class="s-fc7">生成外链播放器</a>
						</div>
					</div>
					<table class="m-table m-table-program">
						<tbody>
							<tr class="j-tr" v-for="(pitem,pindex) in programs" :key="pindex">
								<td class="col1">
									<div class="hd">
										<play-btn class="ply" :songid="pitem?.mainSong?.id"></play-btn>
										<span class="num">{{pitem.serialNum}}</span>
									</div>
								</td>
								<td class="col2">
									<div class="tt f-thide">
										<router-link :to="`/discover/program/?id=${pitem.id}`" :title="pitem.name">{{pitem.name}}</router-link>
									</div>
									<div class="opt hshow">
										<add-music class="u-icn icn-add" :songid="pitem?.mainSong?.id"></add-music>
										<share-btn class="u-icn icn-share" :songid="pitem?.mainSong?.id"></share-btn>
										<download-btn class="u-icn icn-dl" :songid="pitem?.mainSong?.id">下载</download-btn>
									</div>
								</td>
								<td class="col3">
									<span class="s-fc3">播放{{pitem.listenerCount>100000?Math.floor(pitem.listenerCount/100000)+'万':pitem.listenerCount}}</span>
								</td>
								<td class="col4">
									<span class="s-fc3">赞{{pitem.likedCount}}</span>
								</td>
								<td class="col5">
									<span class="s-fc4">{{trunTime(pitem.createTime,'-')}}</span>
								</td>
								<td class="f-pr">
									<music-time :musictime="pitem.duration/1000"></music-time>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="dj-detail-right"></div>
		
	</div>

</template>

<script>
	import detailTitle from 'views/detail/detailTitle.vue'
	import musicTime from 'views/common/musicTime.vue'
	import {addPlayList,addMusic,shareBtn,downloadBtn,playBtn} from 'views/common/btns/index.js'
	import { getDjDetail,getDjPrograms} from 'network/api.js'
	export default {
		name:'djDetail',
		components:{
			detailTitle,
			addPlayList,
			addMusic,
			shareBtn,
			downloadBtn,
			playBtn,
			musicTime
		},
		data(){
			return {
				programN:0,
				djdetail:{},
				programs:[]
			}
		},
		watch:{
			programN(val){
				getDjPrograms({rid:this.$route.query.id,limit:val}).then(res=>{
					// console.log(res.data.programs)
					this.programs = res.data.programs
				})
			}
		},
		created(){
			getDjDetail({rid:this.$route.query.id}).then(res=>{
				this.djdetail = res.data.djRadio;
				this.programN = res.data.djRadio.programCount;
			})
		}
	}
</script>

<style>
	.dj-detail{
		background-color: #fff;
	}
	.dj-detail-left{
		width: 710px;
		border-right: 1px solid #e6e6e6;
	}
	.dj-l-wrap{
		padding: 47px 30px 40px 39px;
	}
	.u-cover-dj .msk{
		width: 208px;
		height: 208px;
		background-position: 0 -1285px;
		top: -4px;
		left: -4px;
	}
	.u-sort .desc,.u-sort .asc{
		float: left;
		height: 25px;
		width: 29px;
	}
	.u-sort .desc.z-sel{
		background-position: 0 -30px;
	}
	.u-sort .asc{
		width: 28px;
		background-position: -40px 0;
	}
	.m-table-program{
		border-top: none;
	}
	.m-table-program tr{
		height: 55px;
	}
	.m-table-program .col1{
		width: 62px;
	}
	.m-table-program td{
		padding: 0 10px;
	}
	.m-table-program .hd .num{
		margin-left: 10px;
	}
	.m-table-program .col2{
		width: 230px;
		padding-left: 0;
	}
	.m-table-program .tt{
		float: left;
		width: 100%;
	}
	.m-table-program .col3{
		width: 60px;
	}
	.m-table-program .col4{
		width: 70px;
	}
	.m-table-program .col5{
		width: 66px;
	}
	.m-table-program .last{
		position: absolute;
		top: 0;
		left: 19px;
		width: 12px;
		height: 12px;
		background-position: 0 -100px;
	}
</style>
