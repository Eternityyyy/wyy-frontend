<template>
	<div class="iptarea">
		<div class="head">
			<img v-if="userProfile" :src="userProfile?.profile?.avatarUrl + '?param=50y50'" >
			<img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50">
		</div>
		<div class="j-flag">
			<div>
				<div class="m-cmmtipt f-cb f-pr">
					<div class="u-txtwrap holder-parent f-pr">
						<textarea class="u-txt area j-flag" placeholder="评论" v-model="content" @keyup.enter="sendC" @click="verify"></textarea>
					</div>
					<div class="btns f-cb f-pr">
						<i class="icn u-icn u-icn-36 j-flag"></i>
						<i class="icn u-icn u-icn-41 j-flag"></i>
						<span class="btn u-btn u-btn-1 j-flag" @click="sendC">评论</span>
						<span class="zs s-fc4 j-flag">{{textCount}}</span>
					</div>
					<div class="corr u-arr">
						<em class="arrline">◆</em>
						<span class="arrclr">◆</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { Comment } from 'network/api.js'
	export default {
		name:'commentArea',
		data(){
			return {
				content:''
			}
		},
		computed:{
			...mapState(['userProfile']),
			textCount(){
				return 140 - this.content.length
			}
		},
		props:{
			type:{
				type:Number
			},
			Cid:{}
		},
		methods:{
			sendComment(){
				Comment({t:1,type:this.type,id:this.Cid,content:this.content}).then(res=>{
					// console.log(res.data)
					this.content = '';
					this.$emit('addcomment',res.data.comment)
				})
			},
			sendC(){
				if(this.textCount < 140){
					return
				}
				this.sendComment();
			},
			verify(){
				if(!this.userProfile){
					this.$root.isLogin = true;
				}
			}
		}
	}
</script>

<style>
	.iptarea{
		margin-bottom: 20px;
	}
	.iptarea .m-cmmtipt{
		margin-left: 62px;
	}	
	.u-txtwrap{
		padding-right: 14px;
	}
	div.holder-parent{
		position: relative;
		zoom: 1;
	}
	.m-cmmtipt .area{
		height: 50px;
		display: block;
	}
	.u-txt{
		margin: 0;
		padding: 5px 6px 6px;
		border: 1px solid #cdcdcd;
		border-radius: 2px;
		line-height: 19px;
		box-sizing: content-box;
	}
	textarea.u-txt,div.u-txt{
		width: 100%;
		margin-right: -20px;
	}
	.m-cmmtipt .btns{
		clear: both;
		padding-top: 10px;
	}
	.m-cmmtipt .btns .icn{
		float: left;
		margin: 0px 10px 0 0;
		cursor: pointer;
	}
	.u-icn-36{
		width: 18px;
		height: 18px;
		background-position: -40px -490px;
	}
	.u-icn-41{
		width: 18px;
		height: 18px;
		background-position: -60px -490px;
	}
	.m-cmmtipt .btns .btn{
		float: right;
	}
	.u-btn-1{
		width: 46px;
		height: 25px;
		background-position: -84px -64px;
		color: #fff;
		text-align: center;
		line-height: 25px;
	}
	.m-cmmtipt .btns .zs{
		float: right;
		margin-right: 10px;
		line-height: 25px;
	}
	.m-cmmtipt .corr{
		position: absolute;
		top: 11px;
		left: -7px;
	}
	.u-arr{
		width: 13px;
		height: 14px;
		overflow: hidden;
	}
	.u-arr .arrline, .u-arr .arrclr, .u-arr .arriner{
		display: block;
		font-family: "SimSun";
		font-size: 15px;
		font-style: normal;
		font-weight: normal;
		height: 10px;
		line-height: normal;
	}
	.u-arr .arrline{
		color: #cdcdcd;
	}
	.u-arr .arrclr{
		margin: -10px 0 0 1px;
		color: #fff;
	}
</style>
