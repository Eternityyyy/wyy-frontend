<template>
	<div class="n-user-profile">
		<div class="n-myinfo s-bg s-bg-5">
			<div class="f-cb">
				<a href="" class="head f-pr">
					<img :src="userInfo.profile?.avatarUrl+'?param=80y80'" alt="">
				</a>
				<div class="info">
					<h4>
						<a href="" class="nm nm-icn f-fs1 f-ib f-thide">{{userInfo.profile?.nickname}}</a>
						<span></span>
					</h4>
					<p>
						<a href="" class="u-lv u-icn2 u-icn2-lv">
							{{userInfo.level}}
							<i class="right u-icn2 u-icn2-lvright"></i>
						</a>
					</p>
					<div class="btnwrap f-pr">
						<span class="u-btn2 u-btn2-2" :class="userInfo.pcSign ? 'u-btn2-dis' : 'sign'" @click="sign">
							<i>{{signStatus[Number(userInfo.pcSign)]}}</i>
						</span>
					</div>
				</div>
			</div>
			<ul class="dny s-fc3 f-cb">
				<li class="fst">
					<a href="">
						<strong>{{userInfo.profile?.eventCount}}</strong>
						<span>动态</span>
					</a>
				</li>
				<li>
					<a href="">
						<strong>{{userInfo.profile?.follows}}</strong>
						<span>关注</span>
					</a>
				</li>
				<li class="lst">
					<a href="">
						<strong>{{userInfo.profile?.followeds}}</strong>
						<span>粉丝</span>
					</a>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	import { signDay } from 'network/api.js'
	export default {
		name:'userInfoEasy',
		props:['userinfo'],
		data(){
			return {
				signStatus:['签到','已签到'],
				userInfo:this.userinfo
			}
		},
		methods:{
			sign(){
				if(this.userInfo.pcSign){
					return
				}
				signDay().then(()=>{
					// console.log(res.data)
					this.userInfo.pcSign = true
				})
			}
		}
	}
</script>

<style>
	.n-myinfo{
		height: 165px;
		padding-top: 20px;
	}
	.s-bg-5{
		background-position: 0 -270px;
	}
	.n-myinfo .head{
		float: left;
		width: 80px;
		height: 80px;
		margin-left: 20px;
		padding: 2px;
		background: #fff;
		border: 1px solid #dadada;
	}
	.n-myinfo .head img{
		display: block;
		width: 80px;
		height: 80px;
	}
	.n-myinfo .info{
		float: left;
		width: 115px;
		margin-left: 18px;
		padding-top: 3px;
	}
	.n-myinfo .info .nm{
		width: 100%;
	}
	.n-myinfo .info .nm-icn{
		width: auto;
		max-width: 100%;
		vertical-align: middle;
	}
	.n-myinfo .info p{
		width: 100%;
		margin-top: 5px;
	}
	.u-lv{
		display: inline-block;
		height: 17px;
		overflow: hidden;
		padding-left: 25px;
		line-height: 18px;
		color: #999;
		font-weight: bold;
		font-style: italic;
	}
	.u-icn2-lv{
		background-position: -130px -64px;
	}
	.u-lv i{
		float: right;
	}
	.u-icn2-lvright{
		width: 8px;
		height: 17px;
		background-position: -192px -64px;
	}
	.n-myinfo .info .btnwrap{
		margin-top: 15px;
	}
	.n-myinfo .info .btnwrap .sign i{
		width: 60px;
	}
	.n-myinfo .dny{
		margin: 22px 0 0 20px;
	}
	.n-myinfo .dny li.lst{
		padding-right: 0;
		border-right: none;
	}
	.n-myinfo .dny li{
		float: left;
		height: 40px;
		padding: 0 18px;
		border-right: 1px solid #e4e4e4;
	}
	.n-myinfo .dny li a{
		display: block;
		color: #666;
	}
	.n-myinfo .dny strong{
		display: block;
		font-size: 20px;
		font-weight: normal;
	}
	.n-myinfo .dny span{
		margin-left: 2px;
	}
	.n-myinfo .dny li.fst{
		padding-left: 0;
	}
	.u-btn2-dis, .u-btn2-dis:hover, .u-btn2-dis:active{
		color: #bebebe;
		background-position: right -346px;
	}
	.u-btn2-dis i, .u-btn2-dis:hover i, .u-btn2-dis:active i{
		color: #bebebe;
		background-position: 0 -305px;
	}
	
</style>
