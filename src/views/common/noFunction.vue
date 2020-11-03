<template>
	<sub-nav></sub-nav>
	<div class="g-bd4">
		<div class="g-wrap no-function">
			<div class="n-for404">
				<i class="u-errlg u-errlg-404"></i>
				<p class="note s-fc3">此功能暂未开放，敬请期待</p>
			</div>
		</div>
	</div>

</template>

<script>
	import subNav from 'views/Header/subNav.vue'
	export default {
		// name:'',
		components:{
			subNav
		}
	}
</script>

<style>
	.no-function{
		width: 100%;
		background-color: #fff;
	}
	.n-for404{
		padding: 125px 0 0;
		text-align: center;
	}
	.u-errlg-404{
		background-position: 0 -405px;
	}
	.u-errlg{
		width: 270px;
		height: 112px;
	}
	.n-for404 .note{
		margin-top: 35px;
		font-size: 18px;
		font-family: "microsoft yahei";
	}
</style>
