<template>
	<div class="m-sgerlist">
		<ul class="m-cvrlst m-cvrlst-5 f-cb">
			<artist-item v-for="(l,i) in list.slice(0,10)" :key="i" :class="{line:i>4}" :artist="l"></artist-item>
			<li class="sml" v-for="(l,i) in list.slice(10)" :key="i">
				<router-link :to="`/discover/artist/detail?id=${l.id}`">
					<span class="nm nm-icn f-thide s-fc0" :title="`${l.name}`">{{l.name}}</span>
				</router-link>
				<router-link v-if="l.accountId" :to="`/user/home?id=${l.accountId}`">
					<span class="f-tdn" :title="`${l.name}的个人主页`">
						<i class="u-icn u-icn-5"></i>
					</span>
				</router-link>
			</li>
		</ul>
	</div>

</template>

<script>
	import artistItem from 'views/artist/artistItem.vue'
	export default {
		name:'artistList',
		components:{
			artistItem
		},
		props:{
			list:{
				type:Array
			}
		}
	}
</script>

<style>
</style>
