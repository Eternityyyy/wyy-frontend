<template>
	<li>
		<div class="u-cover u-cover-5">
			<router-link :to="`/discover/artist/detail?id=${artist.id}`">
				<img v-if="artist.picUrl != null" :src="artist.picUrl + '?param=130y130'">
				<img v-else src="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130">
				<span class="msk bg-cover" :title="artist.name"></span>
			</router-link>
			<p>
				<span class="nm f-thide s-fc0" :title="artist.name">{{artist.name}}</span>
				<router-link v-if="artist.accountId" :to="`/user/home?id=${artist?.accountId}`">
					<i class="u-icn u-icn-5"></i>
				</router-link>
			</p>
		</div>
	</li>

</template>

<script>
	export default {
		name:'artistItem',
		props:{
			artist:{
				type:Object
			}
		}
	}
</script>

<style>
	.m-cvrlst-5 li .u-icn-5{
		position: relative;
		float: right;
	}
	.m-cvrlst li p .u-icn{
		margin-top: -1px;
	}
	
</style>
