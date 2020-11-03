import { createStore } from 'vuex'
import cookie from 'vue-cookies'
import { getUserDetail } from 'network/api.js'

const store = createStore({
	state(){
		return {
			player_setting:JSON.parse(window.localStorage.getItem('player-setting')) ?? {},
			track_queue:JSON.parse(window.localStorage.getItem('track-queue')),
			user_id:cookie.get('uid'),
			userProfile:null
		}
	},
	getters:{
		
	},
	mutations:{
		set_PS(state){
			// console.log('设置界面')
			// console.log(this)
			if(!window.localStorage.getItem('player-setting')){
				// console.log('首次设置')
				let playerSetting = {
						autoPlay:false,
						index:0,
						lock:true,
						mode:4,
						volume:1
					}
				window.localStorage.setItem('player-setting',JSON.stringify(playerSetting));
				state.player_setting = playerSetting;
				// mutations.update_PS(state,playerSetting)
			}
		},
		update_PS(state,playsetting){
			// console.log(playsetting)
			state.player_setting = playsetting;
			window.localStorage.setItem('player-setting',JSON.stringify(playsetting));
		},
		update_TQ(state,trackqueue){
			// console.log(trackqueue)
			state.track_queue = trackqueue;
			window.localStorage.setItem('track-queue',JSON.stringify(trackqueue));
		},
		setUserId(state,uid){
			// console.log(uid)
			state.user_id = uid;
			cookie.set('uid',uid,'15d')
		},
		clearUserId(state){
			state.user_id = null
			cookie.remove('uid')
			// this.userProfile = null
		},
		async setUser(state){
			if(!state.userProfile&&state.user_id){
				// console.log('请求用户')
				await getUserDetail({uid:state.user_id}).then(res=>{
					state.userProfile = res.data
				})
			}else{
				state.userProfile = null
			}
		}
	},
	actions:{
		
	}
})

export default store