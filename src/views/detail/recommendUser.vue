<template>
	<h3 class="u-hd3">
		<span class="f-left">
			<slot></slot>
		</span>
	</h3>
	<ul class="m-piclist f-cb">
		<li v-for="(u,i) in userlist" :key="i">
			<router-link :to="`/user/home?id=${u?.userId}`">
				<span class="f-tdn" :title="u?.nickname">
					<img :src="u?.avatarUrl + '?param=40y40'">
				</span>
			</router-link>
		</li>
	</ul>

</template>

<script>
	export default {
		name:'recommendUser',
		props:{
			userlist:{
				type:Array
			}
		}
	}
</script>

<style>
	.m-piclist{
		margin-left: -13px;
		padding-bottom: 25px;
	}
	.m-piclist li{
		display: inline;
		padding: 0 0 13px 13px;
	}
	.m-piclist li, .m-piclist li img{
		float: left;
		width: 40px;
		height: 40px;
	}
</style>
