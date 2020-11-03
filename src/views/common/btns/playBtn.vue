<template>
	<span @click="playMusic" title="播放">
		<slot></slot>
	</span>
	<!-- <span @click="addMusic"></span> -->

</template>

<script>
	import {getSongDetail} from 'network/api.js'
	import { mapState } from 'vuex'
	export default {
		name:'playBtn',
		props:{
			songid:{
				type:Number
			}
		},
		computed:{
			...mapState(['player_setting','track_queue'])
		},
		methods:{
			getSongdetail(){
				return new Promise((resolve)=>{
					getSongDetail({ids:this.songid}).then(res=>{
						// console.log(res.data.songs)
						this.songdetail = res.data.songs
						resolve()
					})
				})
			},
			async playMusic(){
				// getSongDetail({ids:this.songid}).then(res=>{
					// let track = this.track_queue;
					// let findex= track.findIndex(item=>{
					// 	return item.id == res.data.songs[0].id
					// })
					// this.haveSong(res.)
					// if(findex>=0){
					// 	this.player_setting.index = findex
						// this.$store.commit('update_PS',this.player_setting)
					// 	this.updatePS(this.player_setting)
					// }else{
					// 	this.player_setting.index = track.length
						// 直接赋值无法更新值，原因待查
						// this.track_queue = track.concat(res.data.songs)
				// 		this.updatePS(this.player_setting)
				// 		this.updateTQ(track.concat(res.data.songs))
				// 	}
				// })
				if(this.songdetail.length<=0){
					await this.getSongdetail();
				}
				// console.log('请求后')
				this.haveSong(this.songdetail[0].id);
				if(this.findex>=0){
						this.player_setting.index = this.findex
						this.updatePS(this.player_setting)
					}else{
						this.player_setting.index = this.track_queue.length
						// 直接赋值无法更新值，原因待查
						// this.track_queue = track.concat(res.data.songs)
						// console.log(this.track_queue.concat(this.songdetail))
						this.updatePS(this.player_setting)
						this.updateTQ(this.track_queue.concat(this.songdetail))
					}
			},
			updatePS(newps){
				this.$store.commit('update_PS',newps)
			},
			updateTQ(newtq){
				this.$store.commit('update_TQ',newtq)
			},
			haveSong(sid){
				if(this.findex==null){
					this.findex = this.track_queue.findIndex(item =>{
						return item.id == sid
					})
				}
			}
		},
		data(){
			return {
				findex:null,
				songdetail:[]
			}
		}
	}
</script>

<style>
</style>
