<template>
	<div class="m-layer z-show">
		<div class="zbar">
			<div class="zttl f-thide">手机号登录</div>
		</div>
		<div class="zcnt">
			<div class="lyct lyct-1">
				<div class="n-log2 n-log2-2">
					<div class="j-mod">
						<div class="u-phonewrap">
							<a class="current">
								<span class="j-code"></span>
								<span class="icn u-icn2 i-icn2-17"></span>
							</a>
							<div class="txtwrap">
								<input type="text" placeholder="请输入手机号" class="j-phone txt u-txt" v-model="phone">
							</div>
						</div>
					</div>
					<div class="f-mgt10">
						<input type="password" class="j-pwd u-txt" placeholder="请输入密码" v-model="psd">
					</div>
					<div class="j-err u-err" v-if="errmsg">
						<i class="u-icn u-icn-25"></i>
						<span>{{errmsg}}</span>
					</div>
					<div class="f-mgt10">
						<label for="" class="s-fc3">
							<input type="checkbox" checked="checked" class="j-auto u-auto">
							自动登录
						</label>
						<a href="" class="f-fr s-fc3">忘记密码?</a>
					</div>
					<div class="f-mgt20">
						<span class="j-primary u-btn2 u-btn2-2" @click="login">
							<i>登录</i>
						</span>
					</div>
				</div>
				<div class="js-btmbar n-loglink2 f-cb">
					<a href="" class="f-left s-primary">&lt;&nbsp;&nbsp;其他方式登录</a>
					<a href="" class="f-fr">没有账号？免费注册&nbsp;&nbsp;></a>
				</div>
			</div>
		</div>
		<span class="zcls" title="关闭窗体" @click="closeLogin">x</span>
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	
	import {loginByphone} from 'network/api.js'
	export default {
		name:'login',
		data(){
			return {
				phone:'',
				psd:'',
				errmsg:null,
			}
		},
		computed:{
			...mapState(['user_id'])
		},
		methods:{
			checkPhone(){
				return /^1[3456789]\d{9}$/.test(this.phone)
			},
			login(){
				if(!this.checkPhone()){
					this.errmsg = '请输入正确的手机号';
					return
				}
				if(this.psd.length<=0){
					this.errmsg = '请输入登录密码';
					return
				}
				// loginByphone({phone:this.phone,md5_password:md5(this.psd)}).then(res=>{
				loginByphone({phone:this.phone,password:this.psd}).then(res=>{
					// console.log(res.data)
					if(res.data.code == 502){
						this.errmsg = "手机号或密码错误"
					}else{
						// this.$store.commit('setCookies',res.data.token);
						this.$store.commit('setUserId',res.data.account.id)
						this.$root.isLogin = false
					}
				});
			},
			closeLogin(){
				this.$root.isLogin = false;
			}
		}
	}
</script>

<style>
	div.m-layer .zbar, div.m-layer .zcls{
		background: url(~assets/img/layer.png) no-repeat 0 9999px;
	}
	div.m-layer{
		position: fixed;
		z-index: 9998;
		width: 530px;
		border-radius: 4px;
		box-shadow: 0 5px 16px rgba(0,0,0,0.8);
		border: none;
		background: #fff;
		/*top: 306px;*/
		/*left: 337px;*/
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	div.m-layer .zbar{
		position: relative;
		z-index: 10;
		border-bottom: 1px solid #191919;
		border-radius: 4px 4px 0 0;
		background: #2d2d2d;
		line-height: 30px;
	}
	div.m-layer .zttl{
		padding-right: 45px;
		margin: 0;
		height: 38px;
		line-height: 38px;
		padding-left: 18px;
		border-radius: 3px 3px 0;
		font-weight: bold;
		font-size: 14px;
		color: #fff;
		background-position: 50% 0;
	}
	div.m-layer div.zcnt{
		padding: 0;
		border: 1px solid #878787;
		border-width: 0 1px 1px;
		border-radius: 0 0 4px 4px;
		background: #fff;
	}
	div.m-layer .lyct-1{
		padding: 0;
	}
	.n-log2-2{
		padding: 30px 0 43px;
		width: 220px;
		margin: 0 auto;
	}
	.u-phonewrap{
		position: relative;
		height: 30px;
		margin: 0;
		border: 1px solid #cdcdcd;
		border-radius: 2px;
		z-index: 10;
	}
	.u-phonewrap .current{
		position: relative;
		float: left;
		display: block;
		height: 30px;
		line-height: 30px;
		padding: 0 18px 0 5px;
		border-right: 1px solid #cdcdcd;
	}
	.u-phonewrap .current .icn{
		position: absolute;
		top: 14px;
		right: 7px;
	}
	.u-phonewrap .txtwrap{
		overflow: hidden;
	}
	.u-txt{
		height: 19px;
		margin: 0;
		padding: 5px 6px 6px;
		border: 1px solid #cdcdcd;
		border-radius: 2px;
		line-height: 19px;
		box-sizing: content-box;
	}
	.n-log2 .u-txt{
		width: 206px;
	}
	.n-log2 .u-auto{
		margin: 0 12px 0 0;
	}
	.u-err{
		height: 17px;
		margin-top: 5px;
		line-height: 17px;
		color: #e33232;
	}
	.n-log2 .u-err{
		height: auto;
		line-height: 18px;
	}
	.n-log2 .u-err i{
		margin-top: -2px;
	}
	.u-err i{
		margin-right: 8px;
	}
	.u-phonewrap .txt{
		display: block;
		padding: 5px 8px 5px;
		height: 20px;
		line-height: 20px;
		border: none;
	}
	.f-mgt10{
		margin-top: 10px;
	}
	.f-mgt20{
		margin-top: 20px;
	}
	.n-loglink2{
		padding: 0 19px;
		height: 48px;
		border-top: 1px solid #c6c6c6;
		border-radius: 0 0 4px 4px;
		line-height: 48px;
		background-color: #f7f7f7;
	}
	.n-loglink2 a{
		font-size: 12px;
		color: #999;
	}
	.n-loglink2 a.s-primary{
		color: #0c72c3;
	}
	div.m-layer .zcls{
		position: absolute;
		z-index: 20;
		top: 16px;
		right: 20px;
		width: 10px;
		height: 10px;
		overflow: hidden;
		text-indent: -9999px;
		cursor: pointer;
		background-position: 0 -95px;
		line-height: 20px;
	}
	
</style>
