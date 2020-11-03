<template>
	<span @click="addMusic" title="添加到播放列表">
		<slot></slot>
	</span>

</template>

<script>
	import { getSongDetail } from 'network/api.js'
	import { mapState } from 'vuex'
	export default {
		name:'addMusic',
		props:{
			songid:{
				type:Number
			}
		},
		computed:{
			...mapState(['track_queue'])
		},
		data(){
			return {
				
			}
		},
		methods:{
			addMusic(){
				// console.log('添加到播放列表')
				getSongDetail({ids:this.songid}).then(res=>{
					let track = this.track_queue;
					let findex= track.findIndex(item=>{
						return item.id == res.data.songs[0].id
					})
					if(findex<0){
						// 直接赋值无法更新值，原因待查
						// this.track_queue = track.concat(res.data.songs)
						this.$store.commit('update_TQ',track.concat(res.data.songs))
					}
				})
			}
		}
	}
</script>

<style>
</style>
