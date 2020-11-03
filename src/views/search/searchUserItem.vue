<template>
	<tr class="h-flag">
		<td class="first w7">
			<div class="u-cover u-cover-3">
				<!-- <router-link> -->
					<img :src="user.avatarUrl + '?param=180y180'">
					<span class="msk bg-cover" :title="user.nickname"></span>
				<!-- </router-link> -->
			</div>
		</td>
		<td>
			<div class="ttc">
				<span class="txt f-fs1">
					<span v-trunHtml="{str:user.nickname,keyword:keyword}"></span>
					__
					<i v-if="user.gender == 1" class="icnfix u-icn u-icn-s-01"></i>
					<i v-else class="icnfix u-icn u-icn-s-02"></i>
				</span>
			</div>
			<div class="dec s-fc4 f-thide" :title="user.signature">{{user.signature}}</div>
		</td>
		<td class="w9">
			<span class="u-btn u-btn-3 f-tdn">
				<i>关注</i>
			</span>
		</td>
		<td class="w9 s-fc4">歌单：{{user.playlistCount}}</td>
		<td class="last w9 s-fc4">
			粉丝：
			<span>{{user.follows}}</span>
		</td>
	</tr>

</template>

<script>
	export default {
		name:'searchUserItem',
		props:{
			user:{
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
</style>
