<template>
	<h3 class="u-hd3">
		<span class="f-left">
			<slot></slot>
		</span>
	</h3>
	<ul class="m-rctlist f-cb">
		<li v-for="(l,i) in list" :key="i">
			<div class="cver u-cover u-cover-3">
				<router-link :to="`/discover/playlist?id=${l.id}`">
					<span :title="l.name">
						<img :src="l.coverImgUrl + '?param=50y50'">
					</span>
				</router-link>
			</div>
			<div class="info">
				<p class="f-thide">
					<router-link :to="`/discover/playlist?id=${l.id}`">
						<span :title="l.name">
							{{l.name}}
						</span>
					</router-link>
				</p>
				<p>
					<span class="by s-fc4">by</span>
					<router-link :to="`/user/home?id=${l?.creator?.userId}`">
						<span class="nm f-thide s-fc3" :title="l?.creator?.nickname">
							{{l?.creator?.nickname}}
						</span>
					</router-link>
				</p>
			</div>
		</li>
	</ul>

</template>

<script>
	export default {
		name:'recommendList',
		props:{
			list:{
				type:Array
			}
		}
	}
</script>

<style>
	.m-rctlist{
		margin-bottom: 25px;
	}
	.m-rctlist li{
		float: left;
		width: 200px;
		height: 50px;
		margin-bottom: 15px;
		line-height: 24px;
	}
	.m-rctlist .cver{
		margin-right: -60px;
	}
	.m-rctlist .cver, .n-rctlist .cver img{
		float: left;
		width: 50px;
		height: 50px;
	}
	.m-rctlist .info{
		margin-left: 60px;
		line-height: 24px;
	}
	.m-rctlist .info p{
		width: 140px;
	}
	.m-rctlist .by{
		float: left;
	}
	.m-rctlist .nm{
		float: left;
		max-width: 106px;
		margin: 0 2px 0 4px;
	}
</style>
