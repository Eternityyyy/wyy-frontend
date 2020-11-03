<template>
	<li>
		<span class="u-cover u-cover-rdi2">
			<img :src="djitem.picUrl + '?param=200y200'">
		</span>
		<h3 class="f-fs2 f-thide">
			<span class="s-fc1" v-trunHtml="{str:djitem.name,keyword:keyword}">
			</span>
		</h3>
		<p class="f-thide s-fc4">
			by
			<span v-trunHtml="{str:djitem.name,keyword:keyword}"></span>
			<sup class="u-icn2 u-icn2-music2"></sup>
			<i class="icnfix u-icn u-icn-s-01 f-sep"></i>
		</p>
	</li>

</template>

<script>
	export default {
		name:'searchDjItem',
		props:{
			djitem:{
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
