<template>
	<div class="g-ft">
		<div class="m-ft">
			<div class="wrap f-cb">
				<div class="copy">
					<p class="link">
						<a href="https://st.music.163.com/official-terms/service" target="_blank" class="item s-fc4">服务条款</a>
						<span class="line">|</span>
						<a href="https://st.music.163.com/official-terms/service" target="_blank" class="item s-fc4">隐私政策</a>
						<span class="line">|</span>
						<a href="https://st.music.163.com/official-terms/service" target="_blank" class="item s-fc4">儿童隐私政策</a>
						<span class="line">|</span>
						<a href="https://st.music.163.com/official-terms/service" target="_blank" class="item s-fc4">版权投诉指引</a>
						<span class="line">|</span>
						<a href="https://st.music.163.com/official-terms/service" target="_blank" class="item s-fc4">意见反馈</a>
						<span class="line">|</span>
					</p>
					<p class="right s-fc3">
						<span class="sep span">网易公司版权所有©1997-2020</span>
						<span class="span">杭州乐读科技有限公司运营：</span>
						<a href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png" target="_blank" class="alink s-fc3">浙网文[2018]3506-263号</a>
					</p>
					<p class="contact s-fc3">
						<span class="sep span">违法和不良信息举报电话：0571-89853516</span>
						<span class="span">举报邮箱：</span>
						<a class="alink">ncm5990@163.com</a>
					</p>
					<p class="right s-fc3">
						<span class="sep span">粤B2-20090191-18</span>
						<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" class="alink s-fc3">工业和信息化部备案管理系统网站</a>
						<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564" target="_blank" class="alink s-fc3 police-link">
							<span class="police-logo"></span>
							<span class="police-text">浙公网安备 33010902002564号</span>
						</a>
					</p>
				</div>
				<ul class="enter f-fr">
					<li class="unit">
						<a href="https://web-amped.music.163.com/" class="logo logonew logo-amped f-tid" target="_blank"></a>
						<span class="tt tt-amped"></span>
					</li>
					<li class="unit">
						<a href="https://web-amped.music.163.com/" class="logo logonew logo-auth f-tid" target="_blank"></a>
						<span class="tt tt-auth"></span>
					</li>
					<li class="unit">
						<a href="https://web-amped.music.163.com/" class="logo logonew logo-musician f-tid" target="_blank"></a>
						<span class="tt tt-musician"></span>
					</li>
					<li class="unit">
						<a href="https://web-amped.music.163.com/" class="logo logonew logo-reward f-tid" target="_blank"></a>
						<span class="tt tt-reward"></span>
					</li>
					<li class="unit">
						<a href="https://web-amped.music.163.com/" class="logo logonew logo-cash f-tid" target="_blank"></a>
						<span class="tt tt-cash"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<style>
	.g-ft{
		margin-top: -45px;
		box-sizing: border-box;
	}
	.g-ft{
		position: relative;
		height: 172px;
		overflow: hidden;
		border-top: 1px solid #d3d3d3;
		background: #f2f2f2;
	}
	.m-ft{
		width: 980px;
		margin: 0 auto;
	}
	.m-ft .copy{
		float: left;
		width: 520px;
		padding-top: 15px;
		line-height: 24px;
	}
	.m-ft .copy .line{
		margin: 0 8px 0 10px;
		color: #c2c2c2;
	}
	.m-ft .copy .sep{
		margin-right: 14px;
	}
	.m-ft .copy .police-logo{
		width: 14px;
		height: 14px;
		background: url(~assets/img/police.png);
		background-size: cover;
		display: inline-block;
		margin-right: 2px;
		vertical-align: -2px;
	}
	.m-ft .copy .police-text{
		font-size: 12px;
	}
	.m-ft .enter{
		width: 420px;
		margin-top: 33px;
	}
	.m-ft .enter .unit{
		float: left;
		width: 60px;
		height: 70px;
		margin-left: 30px;
		text-align: center;
		color: #666;
	}
	.m-ft .enter .unit:first-child{
		margin-left: 0;
	}
	.m-ft .logonew{
		display: block;
		float: none;
		width: 50px;
		height: 45px;
		margin: 0 auto;
	}
	.m-ft .logo.logonew{
		background: url(~assets/img/foot_enter_new.png) no-repeat;
		background-size: 110px 552px;
	}
	.m-ft .logonew.logo-amped{
		background-position: -63px -456.5px;
	}
	.m-ft .logonew + .tt{
		background: url(~assets/img/foot_enter_tt.png) no-repeat;
		background-size: 180px 139px;
	}
	.m-ft .enter .tt{
		display: inline-block;
		margin: 5px 5px 0;
		width: 52px;
		height: 14px;
	}
	.m-ft .logonew.logo-auth{
		background-position: -63px -101px;
	}
	.m-ft .logonew.logo-musician{
		background-position: 0 0;
	}
	.m-ft .logonew.logo-reward{
		background-position: -60px -50px;
	}
	.m-ft .logonew.logo-cash{
		background-position: 0 -101px;
	}
	.m-ft .enter .tt-auth{
		background-position: -1px -91px;
	}
	.m-ft .enter .tt-amped{
		background-position: 0 -108px;
		margin-left: -6px;
		width: 72px;
	}
	.m-ft .enter .tt-musician{
		background-position: 0 0
	}
	.m-ft .enter .tt-reward{
		background-position: 0 -54px;
	}
	.m-ft .enter .tt-cash{
		background-position: -1px -72px;
	}
	
</style>
