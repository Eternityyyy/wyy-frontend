<template>
	<span :class="className" @click="addPlayList">
		<slot></slot>
	</span>

</template>

<script>
	import { getListDetail,getAlbumById } from 'network/api.js'
	import {mapState} from 'vuex'
	export default {
		name:'addPlayList',
		props:{
			className:{
				type:String
			},
			playlist:{
				type:Array
			},
			isAlbum:{
				type:Boolean,
				default:false
			},
			isAdd:{
				type:Boolean,
				default:false
			},
			playlistid:{
				type:Number
			}
		},
		computed:{
			...mapState(['player_setting','track_queue'])
		},
		methods:{
			addPlayList(){
				// console.log('添加音乐列表')
				if(this.playlist){
					this.updatetq(this.playlist)
				}else if(this.isAlbum){
					getAlbumById({id:this.playlistid}).then(res=>{
						// this.$store.commit('update_TQ',res.data.songs)
						this.updatetq(res.data.songs)
						// window.localStorage.setItem('track-queue',JSON.stringify(res.data.songs))
					})
				}else{
					getListDetail({id:this.playlistid}).then(res=>{
						// this.$store.commit('update_TQ',res.data.playlist.tracks)
						this.updatetq(res.data.playlist.tracks)
					})
				}
				// if(this.isAlbum){
				// 	getAlbumById({id:this.playlistid}).then(res=>{
						// this.$store.commit('update_TQ',res.data.songs)
						// this.updatetq(res.data.songs)
						// window.localStorage.setItem('track-queue',JSON.stringify(res.data.songs))
				// 	})
				// }else{
					// getListDetail({id:this.playlistid}).then(res=>{
					// 	this.$store.commit('update_TQ',res.data.playlist.tracks)
					// 	this.updatetq(res.data.playlist.tracks)
					// 	window.localStorage.setItem('track-queue',JSON.stringify(res.data.playlist.tracks));
					// })
				// }
				// window.localStorage.setItem('playIndex',0);
			},
			setIndex(){
				this.player_setting.index = 0
				this.$store.commit('update_PS',this.player_setting)
			},
			updatetq(newtracks){
				if(this.isAdd){
					newtracks = this.track_queue.concat(newtracks)
					let map = new Map()
					newtracks= newtracks.filter(item=>{
						return !map.has(item.id) && map.set(item.id)
					})
					this.$store.commit('update_TQ',newtracks)
				}else{
					this.setIndex()
					this.$store.commit('update_TQ',newtracks)
				}
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>
	span{
		cursor: pointer;
	}
</style>
