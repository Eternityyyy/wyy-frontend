<template>
	<subNav></subNav>
	<div class="g-bd4 message">
		<div class="g-sd6 message-left">
			<h2 class="n-msgtit f-ff2">我的消息</h2>
			<ul class="n-msgtab f-cb">
				<li class="j-iflag">
					<router-link to="/msg/at">
						<i class="u-icn u-icn-44"></i>
						<span>我的</span>
						<i class="u-bub">
							<b class="f-alpha"></b>
							<em></em>
						</i>
					</router-link>
				</li>
				<li class="j-iflag">
					<router-link to="/msg/private">
						<i class="u-icn u-icn-45"></i>
						<span>私信</span>
						<i class="u-bub">
							<b class="f-alpha"></b>
							<em></em>
						</i>
					</router-link>
				</li>
				<li class="j-iflag">
					<router-link to="/msg/comments">
						<i class="u-icn u-icn-46"></i>
						<span>评论</span>
						<i class="u-bub">
							<b class="f-alpha"></b>
							<em></em>
						</i>
					</router-link>
				</li>
				<li class="j-iflag">
					<router-link to="/msg/notices">
						<i class="u-icn u-icn-47"></i>
						<span>通知</span>
						<i class="u-bub">
							<b class="f-alpha"></b>
							<em></em>
						</i>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="msg-list">
			<router-view></router-view>
		</div>
	</div>

</template>

<script>
	import subNav from 'views/Header/subNav.vue'
	export default {
		name:"Message",
		components:{
			subNav
		}
	}

</script>

<style>
	.message-left{
		border-right: 1px solid #d3d3d3;
	}
	.n-msgtit{
		height: 30px;
		padding: 32px 0 14px 40px;
		font-size: 20px;
		font-weight: normal;
		line-height: 30px;
	}
	.n-msgtab{
		border-top: 1px solid #ddd;
	}
	.n-msgtab li{
		float: left;
		width: 184px;
		border-bottom: 1px solid #ddd;
	}
	.n-msgtab li a{
		display: block;
		width: 144px;
		height: 53px;
		padding-left: 40px;
		background: #f7f7f7;
		border-top: 1px solid #fff;
		line-height: 53px;
	}
	.n-msgtab li i{
		float: left;
		margin-top: 17px;
	}
	.n-msgtab li span{
		float: left;
		margin: 0 8px 0 6px;
	}
	.msg-list{
		width: 795px;
	}
	.n-msgtab li a.router-link-exact-active{
		background: #fff;
		border-right: 1px solid #fff;
	}
	.v-hd3{
		height: 35px;
		border-bottom: 2px solid #d13030;
		margin: 0;
	}
	.v-hd3 .tit{
		font-size: 14px;
		font-weight: bold;
		line-height: 35px;
	}
	.u-btn-2{
		width: 89px;
		height: 31px;
		color: #333;
		background-position: 0 -680px;
		text-indent: 31px;
		line-height: 30px;
	}
	.v-hd3 .mail, .v-hd3 .u-btn2, .v-hd3 .u-btn2{
		float: right;
		font-weight: normal;
	}
	.n-msgnt{
		margin-bottom: 40px;
		margin-top: 1px;
	}
	.n-msgnt-hvr .item, .n-msgnt-hvr .item *{
		cursor: pointer;
	}
	.n-msgnt .item{
		padding: 16px 0;
		border-bottom: 1px dotted #ccc;
	}
	.n-msgnt .ava{
		float: left;
		width: 40px;
		height: 40px;
		margin-right: -100px;
	}
	.n-magnt .ava img{
		width: 40px;
		height: 40px;
	}
	.n-msgnt-1 .ava, .n-msgnt-1 .ava img{
		width: 50px;
		height: 50px;
	}
	.n-msgnt .ava .u-bub{
		position: absolute;
		top: -7px;
		left: -8px;
	}
	.n-msgnt .cont{
		margin-left: 60px;
		line-height: 19px;
	}
	.n-msgnt .cont .time{
		float: right;
		font-family: tahoma;
	}
	.n-msgnt .cont .time i{
		position: relative;
		margin-right: 0;
	}
	.n-msgnt .cont .u-icn{
		margin: -4px 8px 0 2px;
	}
	.n-msgnt .cont .sec2{
		width: 100%;
		margin-top: 3px;
	}
	.n-msgnt .cont .oper{
		float: right;
		text-align: right;
		font-family: tahoma;
	}
	.n-msgnt .item .dlt{
		visibility: hidden;
	}
	.n-msgnt .cont .sec2 p{
		width: 80%;
		word-break: break-word;
	}
	.n-msgnt .cont .sec2-1 p{
		width: 85%;
	}

</style>